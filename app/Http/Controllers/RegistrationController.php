<?php

namespace App\Http\Controllers;

use App\Mail\RegistrationConfirmed;
use App\Models\Registration;
use App\Models\Sport;
use App\Models\SportFee;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;
use Razorpay\Api\Api;

class RegistrationController extends Controller
{
    // ─── Shared data loaders ─────────────────────────────────────────────────────

    private function getSports(): Collection
    {
        return Sport::query()->orderBy('sort_order')->get()->map(fn ($s) => [
            'id' => $s->id,
            'sport_id' => $s->sport_id,
            'name' => $s->name,
            'icon' => $s->icon,
            'badge' => $s->badge,
            'teams' => $s->teams,
            'categories' => $s->categories,
            'genders' => $s->genders,
            'player_type' => $s->player_type,
            'max_players' => $s->max_players,
            'pdf_entry' => $s->pdf_entry,
            'pdf_rules' => $s->pdf_rules,
            'is_active' => $s->is_active,
        ]);
    }

    private function getSportFees(): Collection
    {
        return SportFee::all()
            ->groupBy('sport_id')
            ->map(fn ($fees) => $fees->map(fn ($f) => [
                'id' => $f->id,
                'label' => $f->label,
                'amount' => $f->amount,
            ])->values());
    }

    // ─── Pages ───────────────────────────────────────────────────────────────────

    /** Home page — passes sports for the sports grid. */
    public function home()
    {
        return Inertia::render('Home', [
            'sports' => $this->getSports(),
        ]);
    }

    /** Register page — sport selector or pre-selected sport. */
    public function register(?string $sportId = null)
    {
        return Inertia::render('Register', [
            'sports' => $this->getSports(),
            'sportId' => $sportId,
            'sportFees' => $this->getSportFees(),
        ]);
    }

    // ─── Create Razorpay Order & Store Pending Registration ──────────────────────

    public function store(Request $request)
    {
        $validated = $request->validate([
            'school_name' => ['required', 'string', 'max:255'],
            'school_address' => ['required', 'string', 'max:500'],
            'school_mobile' => ['required', 'digits:10'],
            'school_email' => ['required', 'email', 'max:255'],
            'principal_name' => ['required', 'string', 'max:255'],
            'principal_contact' => ['required', 'digits:10'],
            'coach_name' => ['required', 'string', 'max:255'],
            'coach_contact' => ['required', 'digits:10'],
            'coach_email' => ['required', 'email', 'max:255'],
            'sport_id' => ['required', 'string', 'max:50'],
            'sport_name' => ['required', 'string', 'max:100'],
            'sport_fee_id' => ['required', 'integer', 'exists:sport_fees,id'],
        ]);

        $sportFee = SportFee::findOrFail($validated['sport_fee_id']);

        try {
            $api = new Api(
                config('services.razorpay.key_id'),
                config('services.razorpay.key_secret')
            );

            $amountInPaise = $sportFee->amount * 100;

            $order = $api->order->create([
                'amount' => $amountInPaise,
                'currency' => 'INR',
                'receipt' => 'nhcup_'.uniqid(),
                'payment_capture' => 1,
                'notes' => [
                    'school' => $validated['school_name'],
                    'sport' => $validated['sport_name'],
                    'fee_type' => $sportFee->label,
                    'coach' => $validated['coach_name'],
                ],
            ]);

            $registration = Registration::create([
                ...$validated,
                'fee_label' => $sportFee->label,
                'razorpay_order_id' => $order['id'],
                'payment_status' => 'pending',
                'amount' => $sportFee->amount,
            ]);

            Log::info('🛒 Razorpay order created', [
                'registration_id' => $registration->id,
                'school' => $validated['school_name'],
                'sport' => $validated['sport_name'],
                'fee_label' => $sportFee->label,
                'amount' => '₹'.$sportFee->amount,
                'order_id' => $order['id'],
            ]);

            return response()->json([
                'registration_id' => $registration->id,
                'order_id' => $order['id'],
                'amount' => $amountInPaise,
                'currency' => 'INR',
                'key_id' => config('services.razorpay.key_id'),
                'name' => $validated['coach_name'],
                'email' => $validated['coach_email'],
                'contact' => $validated['coach_contact'],
                'description' => 'NHCUP 2026 — '.$validated['sport_name'].' ('.$sportFee->label.')',
            ]);

        } catch (\Exception $e) {
            Log::error('Registration failed', [
                'error' => $e->getMessage(),
                'data' => $validated,
            ]);

            return response()->json([
                'message' => 'Registration failed. Please try again.',
            ], 500);
        }
    }

    // ─── Verify Payment & Mark as Paid ───────────────────────────────────────────

    public function verifyPayment(Request $request)
    {
        $validated = $request->validate([
            'razorpay_payment_id' => ['required', 'string'],
            'razorpay_order_id' => ['required', 'string'],
            'razorpay_signature' => ['required', 'string'],
        ]);

        // Verify signature
        $expectedSignature = hash_hmac(
            'sha256',
            $validated['razorpay_order_id'].'|'.$validated['razorpay_payment_id'],
            config('services.razorpay.key_secret')
        );

        if (! hash_equals($expectedSignature, $validated['razorpay_signature'])) {
            Log::warning('Payment verification failed — invalid signature', [
                'order_id' => $validated['razorpay_order_id'],
                'payment_id' => $validated['razorpay_payment_id'],
            ]);

            return response()->json(['message' => 'Invalid payment signature.'], 400);
        }

        $registration = Registration::firstWhere('razorpay_order_id', $validated['razorpay_order_id']);

        if (! $registration) {
            Log::error('Payment verification — registration not found', [
                'order_id' => $validated['razorpay_order_id'],
            ]);

            return response()->json(['message' => 'Registration not found.'], 404);
        }

        // Idempotency — skip if already paid
        if ($registration->payment_status === 'paid') {
            Log::info('Payment already captured, skipping', [
                'registration_id' => $registration->id,
                'order_id' => $validated['razorpay_order_id'],
            ]);

            return response()->json(['status' => 'already_paid']);
        }

        $registration->update([
            'razorpay_payment_id' => $validated['razorpay_payment_id'],
            'payment_status' => 'paid',
        ]);

        Log::info('✅ Payment successful', [
            'registration_id' => $registration->id,
            'school' => $registration->school_name,
            'sport' => $registration->sport_name,
            'fee_label' => $registration->fee_label,
            'amount' => '₹'.$registration->amount,
            'payment_id' => $validated['razorpay_payment_id'],
            'order_id' => $validated['razorpay_order_id'],
        ]);

        // Send confirmation email
        if (! $registration->email_sent) {
            try {
                Mail::to($registration->coach_email)
                    ->send(new RegistrationConfirmed($registration));

                $registration->update(['email_sent' => true]);

                Log::info('📧 Confirmation email queued', [
                    'registration_id' => $registration->id,
                    'to' => $registration->coach_email,
                    'sport' => $registration->sport_name,
                ]);
            } catch (\Exception $e) {
                Log::error('❌ Failed to queue confirmation email', [
                    'registration_id' => $registration->id,
                    'to' => $registration->coach_email,
                    'error' => $e->getMessage(),
                ]);
            }
        }

        return response()->json(['status' => 'paid']);
    }

    public function thankYou(int $id)
    {
        $registration = Registration::findOrFail($id);

        return Inertia::render('ThankYou', [
            'registration' => [
                'id' => $registration->id,
                'school_name' => $registration->school_name,
                'school_email' => $registration->school_email,
                'school_mobile' => $registration->school_mobile,
                'sport_name' => $registration->sport_name,
                'fee_label' => $registration->fee_label,
                'amount' => $registration->amount,
                'coach_name' => $registration->coach_name,
                'coach_email' => $registration->coach_email,
                'razorpay_payment_id' => $registration->razorpay_payment_id,
                'razorpay_order_id' => $registration->razorpay_order_id,
            ],
        ]);
    }

    public function viewBrochure()
    {
        $path = public_path('brochure-file/NHCUP-2026-BROCHURE.pdf');

        return response()->file($path, ['Content-Type' => 'application/pdf']);
    }
}
