<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('registrations', function (Blueprint $table) {
            $table->id();

            // School details
            $table->string('school_name');
            $table->string('school_address');
            $table->string('school_mobile', 15);
            $table->string('school_email');

            // Principal details
            $table->string('principal_name');
            $table->string('principal_contact', 15);

            // Coach / in-charge details
            $table->string('coach_name');
            $table->string('coach_contact', 15);
            $table->string('coach_email');

            // Sport
            $table->string('sport_id');
            $table->string('sport_name');
            $table->unsignedBigInteger('sport_fee_id')->nullable();
            $table->string('fee_label')->nullable();

            // Payment
            $table->string('razorpay_order_id')->unique()->nullable();
            $table->string('razorpay_payment_id')->unique()->nullable();
            $table->enum('payment_status', ['pending', 'paid', 'failed'])->default('pending');
            $table->unsignedInteger('amount')->default(0);

            // Internal
            $table->boolean('email_sent')->default(false);
            $table->text('notes')->nullable();

            $table->timestamps();

            $table->index('payment_status');
            $table->index('coach_email');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('registrations');
    }
};
