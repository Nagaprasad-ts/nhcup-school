<?php

namespace App\Filament\Widgets;

use App\Models\Registration;
use Filament\Widgets\ChartWidget;

class EventRevenueChart extends ChartWidget
{
    protected ?string $heading = 'Sport-wise Revenue & Participants';

    protected static ?int $sort = 2;

    protected int | string | array $columnSpan = 'full';

    protected ?string $maxHeight = '300px';

    // Allow toggling between revenue and participant view
    public ?string $filter = 'revenue';

    protected function getFilters(): ?array
    {
        return [
            'revenue'      => 'Revenue (₹)',
            'participants' => 'Participants',
        ];
    }

    protected function getData(): array
    {
        $byRevenue = $this->filter === 'revenue';

        $data = Registration::query()
            ->where('payment_status', 'paid')
            ->selectRaw(
                $byRevenue
                    ? 'sport_name, SUM(amount) as total'
                    : 'sport_name, SUM(quantity) as total'
            )
            ->groupBy('sport_name')
            ->orderByDesc('total')
            ->get();

        $colors = [
            'rgba(59,130,246,0.8)',  'rgba(16,185,129,0.8)',
            'rgba(245,158,11,0.8)', 'rgba(239,68,68,0.8)',
            'rgba(139,92,246,0.8)', 'rgba(236,72,153,0.8)',
            'rgba(20,184,166,0.8)', 'rgba(234,179,8,0.8)',
            'rgba(249,115,22,0.8)', 'rgba(99,102,241,0.8)',
            'rgba(168,85,247,0.8)',
        ];

        return [
            'datasets' => [[
                'label'           => $byRevenue ? 'Revenue (₹)' : 'Participants',
                'data'            => $data->pluck('total')->toArray(),
                'backgroundColor' => array_slice($colors, 0, $data->count()),
                'borderWidth'     => 1,
            ]],
            'labels' => $data->pluck('sport_name')->toArray(),
        ];
    }

    protected function getType(): string
    {
        return 'bar';
    }
}