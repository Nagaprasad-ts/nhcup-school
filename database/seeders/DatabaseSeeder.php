<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::firstOrCreate(
            ['email' => 'admin@nhcup.in'],
            ['name' => 'Admin', 'password' => bcrypt('Nhcup@2026')]
        );

        $this->call([
            SportSeeder::class,
            SportFeeSeeder::class,
        ]);
    }
}
