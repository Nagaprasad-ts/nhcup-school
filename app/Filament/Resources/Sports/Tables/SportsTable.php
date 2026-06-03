<?php

namespace App\Filament\Resources\Sports\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Actions\ViewAction;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\TernaryFilter;
use Filament\Tables\Table;

class SportsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('sort_order')
                    ->label('#')
                    ->sortable()
                    ->width('50px'),

                TextColumn::make('icon')
                    ->label('')
                    ->width('40px'),

                TextColumn::make('name')
                    ->searchable()
                    ->sortable()
                    ->weight('bold'),

                TextColumn::make('badge')
                    ->badge()
                    ->color('info'),

                TextColumn::make('player_type')
                    ->badge()
                    ->color(fn ($state) => match ($state) {
                        'standard' => 'success',
                        'rank' => 'warning',
                        'athletics' => 'info',
                        'taekwondo' => 'danger',
                        default => 'gray',
                    }),

                TextColumn::make('max_players')
                    ->label('Max Players')
                    ->numeric()
                    ->sortable(),

                TextColumn::make('fees_count')
                    ->label('Fee Options')
                    ->counts('fees')
                    ->badge()
                    ->color('gray'),

                IconColumn::make('is_active')
                    ->label('Active')
                    ->boolean()
                    ->sortable(),

                TextColumn::make('updated_at')
                    ->dateTime('d M Y')
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->defaultSort('sort_order')
            ->filters([
                TernaryFilter::make('is_active')
                    ->label('Active'),
            ])
            ->recordActions([
                ViewAction::make(),
                EditAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
