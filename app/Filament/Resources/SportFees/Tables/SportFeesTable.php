<?php

namespace App\Filament\Resources\SportFees\Tables;

use App\Models\Sport;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Actions\ViewAction;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;

class SportFeesTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('sport.name')
                    ->label('Sport')
                    ->sortable()
                    ->searchable(),

                TextColumn::make('label')
                    ->searchable()
                    ->description(fn ($record) => $record->sport_id),

                TextColumn::make('amount')
                    ->money('INR')
                    ->sortable(),

                IconColumn::make('quantity_enabled')
                    ->label('Quantity?')
                    ->boolean()
                    ->sortable(),

                TextColumn::make('max_quantity')
                    ->label('Max Limit')
                    ->placeholder('-')
                    ->sortable(),

                TextColumn::make('updated_at')
                    ->dateTime('d M Y')
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->defaultSort('sport_id')
            ->filters([
                SelectFilter::make('sport_id')
                    ->label('Sport')
                    ->options(
                        Sport::query()->orderBy('sort_order')->pluck('name', 'sport_id')
                    ),
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
