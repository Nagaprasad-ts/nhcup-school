<?php

namespace App\Mail\Transport;

use Illuminate\Support\Facades\Http;
use Symfony\Component\Mailer\SentMessage;
use Symfony\Component\Mailer\Transport\AbstractTransport;
use Symfony\Component\Mime\Address;
use Symfony\Component\Mime\Email;
use Symfony\Component\Mime\MessageConverter;

class MicrosoftGraphTransport extends AbstractTransport
{
    public function __construct(
        private readonly string $tenantId,
        private readonly string $clientId,
        private readonly string $clientSecret,
        private readonly string $fromAddress,
    ) {
        parent::__construct();
    }

    // ─── Get OAuth2 access token via client credentials ──────────────────────

    private function getAccessToken(): string
    {
        $response = Http::asForm()->post(
            "https://login.microsoftonline.com/{$this->tenantId}/oauth2/v2.0/token",
            [
                'grant_type' => 'client_credentials',
                'client_id' => $this->clientId,
                'client_secret' => $this->clientSecret,
                'scope' => 'https://graph.microsoft.com/.default',
            ]
        );

        if ($response->failed()) {
            throw new \RuntimeException(
                'Microsoft Graph: failed to get access token — '.$response->body()
            );
        }

        return $response->json('access_token');
    }

    // ─── Build Graph API payload ──────────────────────────────────────────────

    private function buildPayload(Email $email): array
    {
        $toRecipients = array_map(
            fn (Address $a) => [
                'emailAddress' => ['address' => $a->getAddress(), 'name' => $a->getName()],
            ],
            $email->getTo()
        );

        $payload = [
            'message' => [
                'subject' => $email->getSubject(),
                'toRecipients' => $toRecipients,
                'body' => [
                    'contentType' => $email->getHtmlBody() ? 'HTML' : 'Text',
                    'content' => $email->getHtmlBody() ?? $email->getTextBody() ?? '',
                ],
                'from' => [
                    'emailAddress' => ['address' => $this->fromAddress],
                ],
            ],
            'saveToSentItems' => false,
        ];

        return $payload;
    }

    // ─── Send ─────────────────────────────────────────────────────────────────

    protected function doSend(SentMessage $message): void
    {
        $email = MessageConverter::toEmail($message->getOriginalMessage());
        $token = $this->getAccessToken();
        $payload = $this->buildPayload($email);

        $response = Http::withToken($token)
            ->post(
                "https://graph.microsoft.com/v1.0/users/{$this->fromAddress}/sendMail",
                $payload
            );

        if ($response->failed()) {
            throw new \RuntimeException(
                'Microsoft Graph: failed to send email — '.$response->body()
            );
        }
    }

    public function __toString(): string
    {
        return 'microsoft-graph';
    }
}
