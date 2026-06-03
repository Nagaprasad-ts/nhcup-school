<?php

namespace App\Filament\Resources\SportFees\Pages;

use App\Filament\Resources\SportFees\SportFeeResource;
use Filament\Actions\EditAction;
use Filament\Resources\Pages\ViewRecord;

class ViewSportFee extends ViewRecord
{
    protected static string $resource = SportFeeResource::class;

    protected function getHeaderActions(): array
    {
        return [
            EditAction::make(),
        ];
    }
}
