<?php

namespace App\Filament\Resources\SportFees\Schemas;

use Filament\Infolists\Components\IconEntry;
use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class SportFeeInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Fee Details')
                    ->columns(5)
                    ->schema([
                        TextEntry::make('sport.name')
                            ->label('Sport'),
                        TextEntry::make('label')
                            ->label('Fee Type'),
                        TextEntry::make('amount')
                            ->label('Amount')
                            ->formatStateUsing(fn ($state) => '₹'.number_format($state)),
                        IconEntry::make('quantity_enabled')
                            ->label('Quantity Enabled')
                            ->boolean(),
                        TextEntry::make('max_quantity')
                            ->label('Max Quantity')
                            ->placeholder('-'),
                    ]),
            ]);
    }
}
