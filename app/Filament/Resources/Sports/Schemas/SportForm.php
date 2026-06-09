<?php

namespace App\Filament\Resources\Sports\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Select;
use Illuminate\Support\Facades\Auth;
use Filament\Forms\Components\TagsInput;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
class SportForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Basic Info')
                    ->columns(2)
                    ->hidden(fn () => Auth::user()?->hasRole('pdf-manager'))
                    ->schema([
                        TextInput::make('name')
                            ->required()
                            ->maxLength(100),

                        TextInput::make('sport_id')
                            ->label('Sport ID (slug)')
                            ->required()
                            ->unique(ignoreRecord: true)
                            ->maxLength(50)
                            ->helperText('Lowercase slug e.g. basketball'),

                        TextInput::make('icon')
                            ->required()
                            ->helperText('Paste an emoji e.g. 🏀'),

                        TextInput::make('badge')
                            ->required()
                            ->helperText('Hosting campus e.g. NHPS'),

                        TextInput::make('teams')
                            ->required()
                            ->columnSpanFull()
                            ->helperText('Display string e.g. U14 / U16 Boys & Girls'),
                    ]),

                Section::make('Registration Details')
                    ->columns(2)
                    ->hidden(fn () => Auth::user()?->hasRole('pdf-manager'))
                    ->schema([
                        TagsInput::make('categories')
                            ->required()
                            ->helperText('Press Enter after each category e.g. U14, U16'),

                        TagsInput::make('genders')
                            ->required()
                            ->helperText('Press Enter after each gender e.g. Boys, Girls'),

                        Select::make('player_type')
                            ->required()
                            ->options([
                                'standard' => 'Standard',
                                'rank' => 'Rank (Chess / TT / Pickleball)',
                                'athletics' => 'Athletics',
                                'taekwondo' => 'Taekwondo',
                            ])
                            ->default('standard'),

                        TextInput::make('max_players')
                            ->required()
                            ->numeric()
                            ->minValue(1),
                    ]),

                Section::make('Documents & Settings')
                    ->columns(2)
                    ->schema([
                        FileUpload::make('pdf_entry')
                            ->label('Entry Form PDF')
                            ->disk('pdfs')
                            ->directory('')
                            ->acceptedFileTypes(['application/pdf'])
                            ->maxSize(10240)
                            ->getUploadedFileNameForStorageUsing(
                                fn (\Livewire\Features\SupportFileUploads\TemporaryUploadedFile $file) => $file->getClientOriginalName()
                            )
                            ->afterStateHydrated(function (FileUpload $component, $state) {
                                // Store only the filename so FileUpload can find it on the pdfs disk
                                $component->state($state ? basename($state) : null);
                            })
                            ->dehydrateStateUsing(fn ($state) => $state ? '/pdf/'.basename($state) : null),

                        FileUpload::make('pdf_rules')
                            ->label('Rules & Regulations PDF')
                            ->disk('pdfs')
                            ->directory('')
                            ->acceptedFileTypes(['application/pdf'])
                            ->maxSize(10240)
                            ->getUploadedFileNameForStorageUsing(
                                fn (\Livewire\Features\SupportFileUploads\TemporaryUploadedFile $file) => $file->getClientOriginalName()
                            )
                            ->afterStateHydrated(function (FileUpload $component, $state) {
                                $component->state($state ? basename($state) : null);
                            })
                            ->dehydrateStateUsing(fn ($state) => $state ? '/pdf/'.basename($state) : null),

                        TextInput::make('sort_order')
                            ->required()
                            ->numeric()
                            ->default(0)
                            ->hidden(fn () => Auth::user()?->hasRole('pdf-manager'))
                            ->helperText('Lower number appears first'),

                        Toggle::make('is_active')
                            ->label('Active (visible on website)')
                            ->hidden(fn () => Auth::user()?->hasRole('pdf-manager'))
                            ->default(true)
                            ->inline(false),
                    ]),
            ]);
    }
}
