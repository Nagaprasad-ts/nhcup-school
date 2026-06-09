<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('sports', function (Blueprint $table) {
            $table->string('pdf_entry')->nullable()->change();
            $table->string('pdf_rules')->nullable()->change();
        });
    }

    public function down(): void
    {
        Schema::table('sports', function (Blueprint $table) {
            $table->string('pdf_entry')->nullable(false)->change();
            $table->string('pdf_rules')->nullable(false)->change();
        });
    }
};
