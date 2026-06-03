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
                        'registrations as total_registrations',
                        'registrations as paid_registrations' => fn ($q) => $q->where('payment_status', 'paid'),
                    ])
                    ->withSum(
                        ['registrations as total_revenue' => fn ($q) => $q->where('payment_status', 'paid')],
                        'amount'
                    )
                    ->orderBy('name')
            )
            ->columns([
                TextColumn::make('name')
                    ->label('Sport'),
                TextColumn::make('paid_registrations')
                    ->label('Paid'),
                TextColumn::make('total_registrations')
                    ->label('Total')
                    ->hidden($isPaid),
                TextColumn::make('total_revenue')
                    ->label('Revenue')
                    ->formatStateUsing(fn ($state) => '₹'.number_format((float) ($state ?? 0))),
            ]);
    }
}
