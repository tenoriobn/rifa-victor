<?php
namespace App\Services;

use GuzzleHttp\Client;

class MercadoPagoService
{
    protected $client;
    protected $accessToken;

    public function __construct()
    {
        $this->client = new Client();
        $this->accessToken = config('services.mercadopago.access_token');
    }

    public function createPayment($amount, $description)
    {
        $response = $this->client->post('https://api.mercadopago.com/v1/payments', [
            'headers' => [
                'Authorization' => 'Bearer ' . $this->accessToken,
                'Content-Type' => 'application/json',
            ],
            'json' => [
                'transaction_amount' => (float)$amount,
                'description' => $description,
                'payment_method_id' => 'pix',
                'payer' => [
                    'email' => 'test_user_123456@testuser.com'
                ]
            ]
        ]);

        return json_decode($response->getBody(), true);
    }

    public function getPaymentStatus($payment_id)
    {
        $response = $this->client->get("https://api.mercadopago.com/v1/payments/{$payment_id}", [
            'headers' => [
                'Authorization' => 'Bearer ' . $this->accessToken,
                'Content-Type' => 'application/json',
            ]
        ]);

        return json_decode($response->getBody(), true);
    }
}
