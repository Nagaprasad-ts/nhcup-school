<?php

namespace App\Filament\Resources\SportFees\Schemas;

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
                    ->columns(3)
                    ->schema([
                        TextEntry::make('sport.name')
                            ->label('Sport'),
                        TextEntry::make('label')
                            ->label('Fee Type'),
                        TextEntry::make('amount')
                            ->label('Amount')
                            ->formatStateUsing(fn ($state) => '₹'.number_format($state)),
                    ]),
            ]);
    }
}
