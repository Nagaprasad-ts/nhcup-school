<?php

namespace App\Providers;

use App\Mail\Transport\MicrosoftGraphTransport;
use Carbon\CarbonImmutable;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\ServiceProvider;
use Illuminate\Validation\Rules\Password;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Force HTTPS in production (Fix Railway Mixed Content)
        if (app()->isProduction()) {
            URL::forceScheme('https');
        }

        $this->configureDefaults();
        $this->registerMicrosoftGraphMailer();
    }

    private function registerMicrosoftGraphMailer(): void
    {
        Mail::extend('microsoft-graph', function () {
            return new MicrosoftGraphTransport(
                tenantId: config('services.microsoft_graph.tenant_id'),
                clientId: config('services.microsoft_graph.client_id'),
                clientSecret: config('services.microsoft_graph.client_secret'),
                fromAddress: config('services.microsoft_graph.from_address'),
            );
        });
    }

    /**
     * Configure default behaviors for production-ready applications.
     */
    protected function configureDefaults(): void
    {
        Date::use(CarbonImmutable::class);

        DB::prohibitDestructiveCommands(
            app()->isProduction(),
        );

        Password::defaults(fn (): ?Password => app()->isProduction()
            ? Password::min(12)
                ->mixedCase()
                ->letters()
                ->numbers()
                ->symbols()
                ->uncompromised()
            : null,
        );
    }
}
