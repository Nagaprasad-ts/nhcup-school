<?php

namespace Database\Seeders;

use App\Models\SportFee;
use Illuminate\Database\Seeder;

class SportFeeSeeder extends Seeder
{
    public function run(): void
    {
        $fees = [
            // ── Team sports — ₹1000 ──────────────────────────────────────────
            ['sport_id' => 'basketball', 'label' => 'Per Team',        'amount' => 1000],
            ['sport_id' => 'volleyball', 'label' => 'Per Team',        'amount' => 1000],
            ['sport_id' => 'football',   'label' => 'Per Team',        'amount' => 1000],
            ['sport_id' => 'throwball',  'label' => 'Per Team',        'amount' => 1000],

            // ── Individual sports — ₹300 ─────────────────────────────────────
            ['sport_id' => 'tabletennis', 'label' => 'Per Participant', 'amount' => 300],
            ['sport_id' => 'badminton',   'label' => 'Per Participant', 'amount' => 300],
            ['sport_id' => 'chess',       'label' => 'Per Participant', 'amount' => 300],
            ['sport_id' => 'pickleball',  'label' => 'Per Participant', 'amount' => 300],

            // ── Athletics — 2 options ────────────────────────────────────────
            ['sport_id' => 'athletics', 'label' => 'Per Event (Individual)', 'amount' => 300],
            ['sport_id' => 'athletics', 'label' => 'Relay Team',             'amount' => 1000],

            // ── Yoga — 3 options ─────────────────────────────────────────────
            ['sport_id' => 'yoga', 'label' => 'Per Participant',      'amount' => 300],
            ['sport_id' => 'yoga', 'label' => 'Per Pair (2 members)', 'amount' => 600],
            ['sport_id' => 'yoga', 'label' => 'Per Team',             'amount' => 1000],
        ];

        foreach ($fees as $fee) {
            SportFee::firstOrCreate(
                ['sport_id' => $fee['sport_id'], 'label' => $fee['label']],
                ['amount' => $fee['amount']]
            );
        }
    }
}
