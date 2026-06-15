<?php

namespace App\Filament\Resources\SportFees\Schemas;

use App\Models\Sport;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class SportFeeForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Fee Details')
                    ->columns(2)
                    ->schema([
                        Select::make('sport_id')
                            ->label('Sport')
                            ->required()
                            ->options(
                                Sport::query()->orderBy('sort_order')
                                    ->pluck('name', 'sport_id')
                            )
                            ->searchable(),

                        TextInput::make('label')
                            ->required()
                            ->maxLength(100)
                            ->helperText('e.g. Per Team, Per Participant, Relay Team'),

                        TextInput::make('amount')
                            ->required()
                            ->numeric()
                            ->prefix('₹')
                            ->minValue(1),
                    ]),

                Section::make('Quantity Settings')
                    ->columns(2)
                    ->schema([
                        Toggle::make('quantity_enabled')
                            ->label('Quantity Enabled')
                            ->default(false)
                            ->live(),

                        TextInput::make('max_quantity')
                            ->label('Max Quantity')
                            ->numeric()
                            ->minValue(1)
                            ->visible(fn ($get): bool => (bool) $get('quantity_enabled'))
                            ->required(fn ($get): bool => (bool) $get('quantity_enabled')),
                    ]),
            ]);
    }
}
