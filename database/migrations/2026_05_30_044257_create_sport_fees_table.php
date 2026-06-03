<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('sport_fees', function (Blueprint $table) {
            $table->id();
            $table->string('sport_id');
            $table->string('label');
            $table->unsignedInteger('amount');
            $table->timestamps();

            $table->index('sport_id');
            $table->foreign('sport_id')
                ->references('sport_id')
                ->on('sports')
                ->onDelete('cascade');
        });

        // Add FK from registrations.sport_fee_id → sport_fees.id
        // Done here because sport_fees is created after registrations
        Schema::table('registrations', function (Blueprint $table) {
            $table->foreign('sport_fee_id')
                ->references('id')
                ->on('sport_fees')
                ->nullOnDelete();
        });
    }

    public function down(): void
    {
        Schema::table('registrations', function (Blueprint $table) {
            $table->dropForeign(['sport_fee_id']);
        });

        Schema::dropIfExists('sport_fees');
    }
};
