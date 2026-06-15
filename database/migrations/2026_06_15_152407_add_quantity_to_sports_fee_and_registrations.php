<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('sport_fees', function (Blueprint $table) {
            $table->boolean('quantity_enabled')->default(false)->after('amount');
            $table->unsignedSmallInteger('max_quantity')->nullable()->after('quantity_enabled');
        });

        Schema::table('registrations', function (Blueprint $table) {
            $table->unsignedSmallInteger('quantity')->default(1)->after('sport_name');
        });
    }

    public function down(): void
    {
        Schema::table('sport_fees', function (Blueprint $table) {
            $table->dropColumn(['quantity_enabled', 'max_quantity']);
        });

        Schema::table('registrations', function (Blueprint $table) {
            $table->dropColumn('quantity');
        });
    }
};
