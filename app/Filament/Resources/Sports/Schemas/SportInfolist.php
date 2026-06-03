<?php

namespace App\Filament\Resources\Sports\Schemas;

use Filament\Infolists\Components\IconEntry;
use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class SportInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Basic Info')
                    ->columns(3)
                    ->schema([
                        TextEntry::make('icon')
                            ->label('Icon'),
                        TextEntry::make('name')
                            ->label('Sport Name'),
                        TextEntry::make('sport_id')
                            ->label('Sport ID (slug)'),
                        TextEntry::make('badge')
                            ->label('Hosting Campus')
                            ->badge()
                            ->color('info'),
                        TextEntry::make('teams')
                            ->label('Age Groups')
                            ->columnSpanFull(),
                    ]),

                Section::make('Registration Details')
                    ->columns(3)
                    ->schema([
                        TextEntry::make('categories')
                            ->label('Categories')
                            ->badge()
                            ->separator(','),
                        TextEntry::make('genders')
                            ->label('Genders')
                            ->badge()
                            ->color('success')
                            ->separator(','),
                        TextEntry::make('player_type')
                            ->label('Player Type')
                            ->badge()
                            ->color(fn ($state) => match ($state) {
                                'standard' => 'success',
                                'rank' => 'warning',
                                'athletics' => 'info',
                                'taekwondo' => 'danger',
                                default => 'gray',
                            }),
                        TextEntry::make('max_players')
                            ->label('Max Players'),
                        TextEntry::make('sort_order')
                            ->label('Sort Order'),
                        IconEntry::make('is_active')
                            ->label('Active')
                            ->boolean(),
                    ]),

                Section::make('Documents')
                    ->columns(2)
                    ->schema([
                        TextEntry::make('pdf_entry')
                            ->label('Entry Form PDF')
                            ->url(fn ($state) => $state)
                            ->openUrlInNewTab(),
                        TextEntry::make('pdf_rules')
                            ->label('Rules PDF')
                            ->url(fn ($state) => $state)
                            ->openUrlInNewTab(),
                    ]),

                Section::make('Fee Options')
                    ->schema([
                        TextEntry::make('fees.label')
                            ->label('Fee Labels')
                            ->badge()
                            ->separator(','),
                        TextEntry::make('fees.amount')
                            ->label('Amounts (₹)')
                            ->badge()
                            ->color('warning')
                            ->separator(','),
                    ])
                    ->columns(2),
            ]);
    }
}
