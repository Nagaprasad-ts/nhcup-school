<?php

namespace App\Filament\Resources\Registrations\Schemas;

use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class RegistrationForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('School Details')
                    ->columns(2)
                    ->schema([
                        TextInput::make('school_name')
                            ->required()
                            ->maxLength(255),
                        TextInput::make('school_mobile')
                            ->required()
                            ->tel(),
                        TextInput::make('school_email')
                            ->required()
                            ->email()
                            ->maxLength(255),
                        TextInput::make('school_address')
                            ->required()
                            ->columnSpanFull(),
                    ]),

                Section::make('Principal Details')
                    ->columns(2)
                    ->schema([
                        TextInput::make('principal_name')
                            ->required()
                            ->maxLength(255),
                        TextInput::make('principal_contact')
                            ->required()
                            ->tel(),
                    ]),

                Section::make('Coach / In-charge Details')
                    ->columns(2)
                    ->schema([
                        TextInput::make('coach_name')
                            ->required()
                            ->maxLength(255),
                        TextInput::make('coach_contact')
                            ->required()
                            ->tel(),
                        TextInput::make('coach_email')
                            ->required()
                            ->email()
                            ->maxLength(255)
                            ->columnSpanFull(),
                    ]),

                Section::make('Sport')
                    ->columns(2)
                    ->schema([
                        TextInput::make('sport_name')
                            ->required()
                            ->maxLength(100),
                        TextInput::make('sport_id')
                            ->label('Sport ID')
                            ->required()
                            ->maxLength(50),
                    ]),

                Section::make('Payment Details')
                    ->columns(2)
                    ->schema([
                        TextInput::make('razorpay_order_id')
                            ->label('Order ID')
                            ->nullable(),
                        TextInput::make('razorpay_payment_id')
                            ->label('Payment ID')
                            ->nullable(),
                        Select::make('payment_status')
                            ->required()
                            ->options([
                                'pending' => 'Pending',
                                'paid' => 'Paid',
                                'failed' => 'Failed',
                            ])
                            ->default('pending'),
                        TextInput::make('amount')
                            ->required()
                            ->numeric()
                            ->prefix('₹')
                            ->default(0),
                        Toggle::make('email_sent')
                            ->label('Confirmation Email Sent')
                            ->inline(false),
                    ]),

                Section::make('Internal Notes')
                    ->visible(fn ($record) => $record?->payment_status === 'paid')
                    ->schema([
                        Textarea::make('notes')
                            ->label('')
                            ->nullable()
                            ->rows(3)
                            ->columnSpanFull()
                            ->placeholder('Add any internal notes about this registration…'),
                    ]),
            ]);
    }
}
