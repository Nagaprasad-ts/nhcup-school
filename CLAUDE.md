# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

NHCUP School is an event registration system for a basketball tournament. It has a public-facing Inertia/React frontend for registrations and a Filament v5 admin panel for managing events, registrations, users, and viewing revenue stats.

## Commands

```bash
# Development
composer run dev          # starts PHP server, queue listener, and Vite concurrently

# Testing
php artisan test --compact                        # run all tests
php artisan test --compact --filter=TestName      # run specific test

# Code quality
vendor/bin/pint --dirty --format agent            # format changed PHP files (run after every PHP change)
npm run lint                                      # fix ESLint issues
npm run format                                    # format JS/TS/CSS with Prettier
npm run types:check                               # TypeScript type check

# CI check (runs lint, format check, type check, and tests)
composer run ci:check
```

## Architecture

### Domain Models
- **Event** — tournament events with registration periods, capacity, pricing, and Razorpay order details
- **Registration** — a user's registration for an event; tracks payment status and Razorpay payment ID
- **User** — standard Laravel user with Filament Shield roles/permissions (spatie/laravel-permission)

### Public Frontend (`resources/js/pages/`)
Inertia/React pages. Routes defined in `routes/web.php`. Currently active flows:
- `Home.tsx` / `welcome.tsx` — landing pages
- `Registration/Create.tsx` + `Success.tsx` — event registration with Razorpay payment
- `Basketball/Create.tsx` + `Success.tsx` — basketball-specific registration flow

### Admin Panel (`app/Filament/`)
Filament v5 resources follow a split-schema pattern:
- `Resources/{Model}/Schemas/` — form (`{Model}Form.php`) and infolist (`{Model}Infolist.php`) schemas
- `Resources/{Model}/Tables/` — table definition (`{Model}sTable.php`)
- `Resources/{Model}/Pages/` — standard CRUD pages

Admin widgets in `app/Filament/Widgets/`: `RegistrationStatsWidget`, `EventRevenueChart`, `EventRegistrationTableWidget`.

### Payments
Razorpay is integrated for registration payments. Webhook handler: `app/Http/Controllers/RazorpayWebhookController.php`. Route: `POST /razorpay/webhook`.

### Authorization
Filament Shield (`bezhansalleh/filament-shield`) manages admin roles and permissions via spatie/laravel-permission. Policies live in `app/Policies/`.

### Exports
`app/Exports/RegistrationsExport.php` uses Maatwebsite Excel for downloading registration data from the admin panel.

### Mail
`app/Mail/RegistrationConfirmed.php` — confirmation email sent after successful registration.

## Key Conventions

- Filament resource schemas, tables, and infolists are extracted into dedicated classes under `Schemas/` and `Tables/` subdirectories — not inlined in the resource class.
- Queue driver is `database`; always dispatch jobs and mail via queue.
- Session and cache drivers are also `database`.
