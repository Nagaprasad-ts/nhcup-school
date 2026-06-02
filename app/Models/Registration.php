<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Registration extends Model
{
    protected $fillable = [
        'school_name',
        'school_address',
        'school_mobile',
        'school_email',
        'principal_name',
        'principal_contact',
        'coach_name',
        'coach_contact',
        'coach_email',
        'sport_id',
        'sport_name',
        'sport_fee_id',
        'fee_label',
        'razorpay_order_id',
        'razorpay_payment_id',
        'payment_status',
        'amount',
        'email_sent',
        'notes',
    ];

    protected $casts = [
        'email_sent' => 'boolean',
        'amount' => 'integer',
    ];

    // ─── Scopes ────────────────────────────────────────────────────────────────

    public function scopePaid($query)
    {
        return $query->where('payment_status', 'paid');
    }

    public function scopePending($query)
    {
        return $query->where('payment_status', 'pending');
    }

    // ─── Helpers ────────────────────────────────────────────────────────────────

    /** Returns the registration fee in rupees (display-friendly). */
    public function amountInRupees(): float
    {
        return $this->amount;
    }
}
