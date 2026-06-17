<?php

namespace App\Filament\Resources\Registrations\Tables;

use App\Exports\RegistrationsExport;
use App\Mail\RegistrationConfirmed;
use Filament\Actions\Action;
use Filament\Actions\ActionGroup;
use Filament\Actions\EditAction;
use Filament\Actions\ViewAction;
use Filament\Forms\Components\Textarea;
use Filament\Notifications\Notification;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Maatwebsite\Excel\Facades\Excel;

class RegistrationsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('school_name')
                    ->searchable(),
                TextColumn::make('sport_name')
                    ->sortable()
                    ->searchable(),
                TextColumn::make('quantity')
                    ->numeric()
                    ->sortable(),
                TextColumn::make('school_email')
                    ->label('School Email')
                    ->searchable()
                    ->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('coach_name')
                    ->searchable(),
                TextColumn::make('coach_email')
                    ->searchable()
                    ->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('amount')
                    ->money('INR')
                    ->sortable(),
                TextColumn::make('payment_status')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'paid' => 'success',
                        'pending' => 'warning',
                        'failed' => 'danger',
                    }),
                IconColumn::make('notes')
                    ->label('Note')
                    ->boolean()
                    ->getStateUsing(fn ($record) => filled($record->notes))
                    ->trueIcon('heroicon-o-chat-bubble-left-ellipsis')
                    ->falseIcon('heroicon-o-minus')
                    ->trueColor('warning')
                    ->falseColor('gray')
                    ->tooltip(fn ($record) => $record->notes ?? 'No notes'),

                TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),

                TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                //
            ])
            ->modifyQueryUsing(function (Builder $query) {
                if (Auth::user()?->hasRole('core-team')) {
                    $query->where('payment_status', 'paid');
                }
            })
            ->recordActions([
                ActionGroup::make([
                    ViewAction::make(),
                    EditAction::make(),
                    Action::make('add_note')
                        ->label('Add Note')
                        ->icon('heroicon-o-chat-bubble-left-ellipsis')
                        ->color('gray')
                        ->visible(fn ($record) => $record->payment_status === 'paid')
                        ->form([
                            Textarea::make('notes')
                                ->label('Note')
                                ->rows(3)
                                ->placeholder('Add an internal note…'),
                        ])
                        ->fillForm(fn ($record) => ['notes' => $record->notes])
                        ->action(fn ($record, array $data) => $record->update(['notes' => $data['notes']])),

                    Action::make('resend_email')
                        ->label('Resend Email')
                        ->icon('heroicon-o-envelope')
                        ->color('gray')
                        ->visible(fn ($record) => $record->payment_status === 'paid' && Auth::user()?->hasRole('super_admin'))
                        ->requiresConfirmation()
                        ->modalHeading('Resend Confirmation Email')
                        ->modalDescription(fn ($record) => "This will send the registration confirmation email to {$record->coach_email}. If the email address was wrong, edit the registration first to correct it before resending.")
                        ->modalSubmitActionLabel('Send Email')
                        ->action(function ($record) {
                            try {
                                Mail::to($record->coach_email)
                                    ->send(new RegistrationConfirmed($record));

                                $record->update(['email_sent' => true]);

                                Notification::make()
                                    ->title('Email resent')
                                    ->body("Confirmation email resent to {$record->coach_email}.")
                                    ->success()
                                    ->send();
                            } catch (\Exception $e) {
                                Notification::make()
                                    ->title('Failed to send email')
                                    ->body($e->getMessage())
                                    ->danger()
                                    ->send();
                            }
                        }),
                ])
                    ->label('Actions')
                    ->icon('heroicon-m-ellipsis-vertical')
                    ->color('gray')
                    ->button()
                    ->hiddenLabel(),
            ])
            ->toolbarActions([
                Action::make('export_all')
                    ->label('Export All')
                    ->icon('heroicon-o-arrow-down-tray')
                    ->color('info')
                    ->visible(fn () => Auth::user()?->hasRole('super_admin'))
                    ->action(fn () => Excel::download(new RegistrationsExport(false), 'registrations-all.xlsx')),

                Action::make('export_paid')
                    ->label('Export Paid')
                    ->icon('heroicon-o-arrow-down-tray')
                    ->color('success')
                    ->visible(fn () => Auth::user()?->hasRole('super_admin') || Auth::user()?->hasRole('core-team'))
                    ->action(fn () => Excel::download(new RegistrationsExport(true), 'registrations-paid.xlsx')),
            ]);
    }
}