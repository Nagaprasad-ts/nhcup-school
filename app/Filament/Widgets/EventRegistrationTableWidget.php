<?php

namespace App\Filament\Widgets;

use App\Models\Registration;
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
        return is_array($record) ? ($record['sport_name'] ?? '') : ($record->sport_name ?? '');
    }

    public function table(Table $table): Table
    {
        $isPaid = Auth::user()?->hasRole('core-team');

        return $table
            ->query(
                Registration::query()
                    ->selectRaw('sport_name,
                        COUNT(*) as total_registrations,
                        SUM(CASE WHEN payment_status = ? THEN 1 ELSE 0 END) as paid_registrations,
                        SUM(CASE WHEN payment_status = ? THEN amount ELSE 0 END) as total_revenue',
                        ['paid', 'paid']
                    )
                    ->groupBy('sport_name')
                    ->orderBy('sport_name')
            )
            ->columns([
                TextColumn::make('sport_name')
                    ->label('Sport')
                    ->sortable(),
                TextColumn::make('paid_registrations')
                    ->label('Paid')
                    ->sortable(),
                TextColumn::make('total_registrations')
                    ->label('Total')
                    ->sortable()
                    ->hidden($isPaid),
                TextColumn::make('total_revenue')
                    ->label('Revenue')
                    ->formatStateUsing(fn ($state) => '₹'.number_format((float) ($state ?? 0)))
                    ->sortable(),
            ]);
    }
}
