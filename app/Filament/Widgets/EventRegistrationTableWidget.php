<?php

namespace App\Filament\Widgets;

use App\Models\Sport;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Filament\Widgets\TableWidget as BaseWidget;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class EventRegistrationTableWidget extends BaseWidget
{
    protected static ?string $heading = 'Sport-wise Registrations';

    protected static ?int $sort = 3;

    protected int | string | array $columnSpan = 'full';

    public function getTableRecordKey(Model|array $record): string
    {
        return is_array($record) ? ($record['sport_id'] ?? '') : ($record->sport_id ?? '');
    }

    public function table(Table $table): Table
    {
        $isPaid = Auth::user()?->hasRole('core-team');

        return $table
            ->query(
                Sport::query()
                    ->withCount([
                        // Number of registration entries (one per school per fee tier)
                        'registrations as total_registrations',
                        'registrations as paid_registrations' => fn ($q) => $q->where('payment_status', 'paid'),
                    ])
                    ->withSum(
                        // Total participants = sum of quantity on paid registrations
                        ['registrations as paid_participants' => fn ($q) => $q->where('payment_status', 'paid')],
                        'quantity'
                    )
                    ->withSum(
                        // Total participants across all registrations (including pending)
                        'registrations as total_participants',
                        'quantity'
                    )
                    ->withSum(
                        // Revenue is already stored as fee × quantity
                        ['registrations as total_revenue' => fn ($q) => $q->where('payment_status', 'paid')],
                        'amount'
                    )
                    ->orderBy('name')
            )
            ->columns([
                TextColumn::make('name')
                    ->label('Sport')
                    ->sortable(),

                TextColumn::make('paid_registrations')
                    ->label('Paid Reg.')
                    ->sortable()
                    ->tooltip('Number of paid registration entries'),

                TextColumn::make('paid_participants')
                    ->label('Paid Participants')
                    ->sortable()
                    ->formatStateUsing(fn ($state) => number_format((int) ($state ?? 0)))
                    ->tooltip('Total participants (sum of quantity) from paid registrations'),

                TextColumn::make('total_registrations')
                    ->label('Total Reg.')
                    ->sortable()
                    ->hidden($isPaid)
                    ->tooltip('All registration entries including pending'),

                TextColumn::make('total_participants')
                    ->label('Total Participants')
                    ->sortable()
                    ->hidden($isPaid)
                    ->formatStateUsing(fn ($state) => number_format((int) ($state ?? 0)))
                    ->tooltip('All participants including pending registrations'),

                TextColumn::make('total_revenue')
                    ->label('Revenue')
                    ->sortable()
                    ->formatStateUsing(fn ($state) => '₹' . number_format((float) ($state ?? 0)))
                    ->tooltip('Total revenue from paid registrations'),
            ]);
    }
}