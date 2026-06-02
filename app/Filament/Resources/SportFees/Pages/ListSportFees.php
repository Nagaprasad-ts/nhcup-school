<?php

namespace App\Filament\Resources\SportFees\Pages;

use App\Filament\Resources\SportFees\SportFeeResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListSportFees extends ListRecords
{
    protected static string $resource = SportFeeResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
