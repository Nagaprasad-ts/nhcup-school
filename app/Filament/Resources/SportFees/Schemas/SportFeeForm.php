<?php

namespace App\Filament\Resources\SportFees\Schemas;

use App\Models\Sport;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class SportFeeForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Select::make('sport_id')
                    ->label('Sport')
                    ->required()
                    ->options(
                        Sport::orderBy('sort_order')
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
            ]);
    }
}
