<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('sports', function (Blueprint $table) {
            $table->id();
            $table->string('sport_id')->unique();
            $table->string('name');
            $table->string('icon');
            $table->string('badge');
            $table->string('teams');
            $table->json('categories');
            $table->json('genders');
            $table->string('player_type')->default('standard');
            $table->unsignedInteger('max_players');
            $table->string('pdf_entry');
            $table->string('pdf_rules');
            $table->unsignedSmallInteger('sort_order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('sports');
    }
};
