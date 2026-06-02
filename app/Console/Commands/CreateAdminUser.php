<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Attributes\Description;
use Illuminate\Console\Attributes\Signature;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Hash;

#[Signature('app:create-admin-user')]
#[Description('Create the super-admin user')]
class CreateAdminUser extends Command
{
    public function handle(): void
    {
        $user = User::updateOrCreate(
            ['email' => 'admin@nhcup.in'],
            [
                'name' => 'Admin',
                'password' => Hash::make('Nhcup@2026'),
            ]
        );

        $this->info("Admin user ready: {$user->email}");
    }
}
