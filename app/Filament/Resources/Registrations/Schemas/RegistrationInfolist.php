<?php

namespace App\Filament\Resources\Registrations\Schemas;

use Filament\Infolists\Components\IconEntry;
use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class RegistrationInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('School Details')
                    ->columns(2)
                    ->schema([
                        TextEntry::make('school_name'),
                        TextEntry::make('school_mobile'),
                        TextEntry::make('school_email')
                            ->label('School Email'),
                        TextEntry::make('school_address')
                            ->columnSpanFull(),
                    ]),

                Section::make('Principal Details')
                    ->columns(2)
                    ->schema([
                        TextEntry::make('principal_name'),
                        TextEntry::make('principal_contact'),
                    ]),

                Section::make('Coach / In-charge Details')
                    ->columns(2)
                    ->schema([
                        TextEntry::make('coach_name'),
                        TextEntry::make('coach_contact'),
                        TextEntry::make('coach_email')
                            ->columnSpanFull(),
                    ]),

                Section::make('Internal Notes')
                    ->visible(fn ($record) => $record?->payment_status === 'paid')
                    ->schema([
                        TextEntry::make('notes')
                            ->label('')
                            ->placeholder('No notes added.')
                            ->columnSpanFull(),
                    ]),

                Section::make('Sport')
                    ->columns(2)
                    ->schema([
                        TextEntry::make('sport_name'),
                        TextEntry::make('sport_id')
                            ->label('Sport ID'),
                    ]),

                Section::make('Payment Details')
                    ->columns(4)
                    ->columnSpanFull()
                    ->schema([
                        TextEntry::make('amount')
                            ->money('INR'),
                        TextEntry::make('payment_status'),
                        TextEntry::make('razorpay_order_id')
                            ->placeholder('-'),
                        TextEntry::make('razorpay_payment_id')
                            ->placeholder('-'),
                        IconEntry::make('email_sent')
                            ->boolean(),
                        TextEntry::make('created_at')
                            ->dateTime()
                            ->timezone('Asia/Kolkata')
                            ->placeholder('-'),
                        TextEntry::make('updated_at')
                            ->dateTime()
                            ->timezone('Asia/Kolkata')
                            ->placeholder('-'),
                    ]),
            ]);
    }
}
