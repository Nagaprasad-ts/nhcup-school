<?php

namespace App\Filament\Widgets;

use App\Models\Registration;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;
use Illuminate\Support\Facades\Auth;

class RegistrationStatsWidget extends BaseWidget
{
    protected function getStats(): array
    {
        $isPaid = Auth::user()?->hasRole('core-team');

        $all = Registration::all();
        $paid = $all->where('payment_status', 'paid');
        $pending = $all->where('payment_status', '!=', 'paid');

        $stats = [
            Stat::make('Total Registrations', $isPaid ? $paid->count() : $all->count())
                ->icon('heroicon-o-users')
                ->description('All registrations')
                ->descriptionIcon('heroicon-m-arrow-trending-up')
                ->color('info'),

            Stat::make('Paid Registrations', $paid->count())
                ->icon('heroicon-o-check-circle')
                ->description('Completed payments')
                ->descriptionIcon('heroicon-m-check')
                ->color('success'),

            Stat::make('Total Revenue', '₹'.number_format($paid->sum('amount')))
                ->icon('heroicon-o-currency-rupee')
                ->description('From paid registrations')
                ->descriptionIcon('heroicon-m-banknotes')
                ->color('warning'),
        ];

        if (! $isPaid) {
            $stats[] = Stat::make('Pending Registrations', $pending->count())
                ->icon('heroicon-o-clock')
                ->description('Awaiting payment')
                ->descriptionIcon('heroicon-m-clock')
                ->color('danger');
        }

        return $stats;
    }
}
