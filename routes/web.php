<?php

use App\Http\Controllers\RazorpayWebhookController;
use App\Http\Controllers\RegistrationController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| NH Cup Registration Routes
|--------------------------------------------------------------------------
*/

// ── Public Registration ────────────────────────────────────────────────────────
Route::get('/', [RegistrationController::class, 'home'])->name('home');
Route::get('/brochure/view', [RegistrationController::class, 'viewBrochure'])->name('brochure.view');
Route::get('/register/{sportId}', [RegistrationController::class, 'register'])->name('register');
Route::redirect('/register', '/#sports');
Route::post('/register', [RegistrationController::class, 'store'])->name('registration.store');
Route::post('/register/verify-payment', [RegistrationController::class, 'verifyPayment'])->name('registration.verify');
Route::get('/thank-you/{id}', [RegistrationController::class, 'thankYou'])->name('registration.thankyou');

// ── Razorpay Webhook ───────────────────────────────────────────────────────────
// This route is excluded from CSRF verification (see App\Http\Middleware\VerifyCsrfToken)
Route::post('/razorpay/webhook', [RazorpayWebhookController::class, 'handle'])
    ->name('razorpay.webhook');
