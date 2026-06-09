<?php

namespace App\Filament\Resources\SportFees;

use App\Filament\Resources\SportFees\Pages\CreateSportFee;
use App\Filament\Resources\SportFees\Pages\EditSportFee;
use App\Filament\Resources\SportFees\Pages\ListSportFees;
use App\Filament\Resources\SportFees\Pages\ViewSportFee;
use App\Filament\Resources\SportFees\Schemas\SportFeeForm;
use App\Filament\Resources\SportFees\Schemas\SportFeeInfolist;
use App\Filament\Resources\SportFees\Tables\SportFeesTable;
use App\Models\SportFee;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;
class SportFeeResource extends Resource
{
    protected static ?string $model = SportFee::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedCurrencyRupee;

    protected static string|\UnitEnum|null $navigationGroup = 'Sports Management';

    protected static ?int $navigationSort = 2;

    protected static ?string $navigationLabel = 'Sport Fees';

    protected static ?string $recordTitleAttribute = 'label';

    public static function form(Schema $schema): Schema
    {
        return SportFeeForm::configure($schema);
    }

    public static function infolist(Schema $schema): Schema
    {
        return SportFeeInfolist::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return SportFeesTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListSportFees::route('/'),
            'create' => CreateSportFee::route('/create'),
            'view' => ViewSportFee::route('/{record}'),
            'edit' => EditSportFee::route('/{record}/edit'),
        ];
    }
}
