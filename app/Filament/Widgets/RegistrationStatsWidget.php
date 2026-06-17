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

        $all     = Registration::all();
        $paid    = $all->where('payment_status', 'paid');
        $pending = $all->where('payment_status', '!=', 'paid');

        // Participant counts = sum of quantity (defaults to 1 for non-quantity sports)
        $totalParticipants = $all->sum('quantity');
        $paidParticipants  = $paid->sum('quantity');
        $totalRevenue      = $paid->sum('amount');

        $stats = [
            Stat::make(
                'Total Registrations',
                $isPaid ? $paid->count() : $all->count()
            )
                ->icon('heroicon-o-clipboard-document-list')
                ->description(
                    $isPaid
                        ? "{$paidParticipants} participants"
                        : "{$totalParticipants} participants across all sports"
                )
                ->descriptionIcon('heroicon-m-user-group')
                ->color('info'),

            Stat::make('Paid Registrations', $paid->count())
                ->icon('heroicon-o-check-circle')
                ->description("{$paidParticipants} participants confirmed")
                ->descriptionIcon('heroicon-m-check')
                ->color('success'),

            Stat::make('Total Revenue', '₹' . number_format($totalRevenue))
                ->icon('heroicon-o-currency-rupee')
                ->description('From paid registrations')
                ->descriptionIcon('heroicon-m-banknotes')
                ->color('warning'),
        ];

        if (! $isPaid) {
            $stats[] = Stat::make('Pending Registrations', $pending->count())
                ->icon('heroicon-o-clock')
                ->description($pending->sum('quantity') . ' participants awaiting payment')
                ->descriptionIcon('heroicon-m-clock')
                ->color('danger');
        }

        return $stats;
    }
}