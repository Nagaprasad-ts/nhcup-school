<?php

namespace App\Mail;

use App\Models\Registration;
use App\Models\Sport;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class RegistrationConfirmed extends Mailable
{
    use Queueable, SerializesModels;

    public int $amountRupees;

    public ?Sport $sport;

    public function __construct(public readonly Registration $registration)
    {
        $this->amountRupees = $registration->amount;
        $this->sport = Sport::firstWhere('sport_id', $registration->sport_id);
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'NHCUP 2026 Registration Confirmed — '.$this->registration->sport_name,
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.registration-confirmed',
        );
    }
}
