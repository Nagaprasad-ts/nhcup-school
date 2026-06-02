<?php

namespace App\Filament\Resources\SportFees\Pages;

use App\Filament\Resources\SportFees\SportFeeResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditSportFee extends EditRecord
{
    protected static string $resource = SportFeeResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
