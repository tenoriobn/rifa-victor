<?php

namespace App\Services;

use MercadoPago\Client\Common\RequestOptions;
use MercadoPago\Client\Payment\PaymentClient;
use MercadoPago\Exceptions\MPApiException;
use MercadoPago\MercadoPagoConfig;

class MercadoPagoService
{
    public function __construct()
    {
        MercadoPagoConfig::setAccessToken(env('MERCADOPAGO_ACCESS_TOKEN'));
        MercadoPagoConfig::setRuntimeEnviroment(MercadoPagoConfig::LOCAL);


    }

    public function createPayment($price, $description, $token)
{
    $client = new PaymentClient();

    $request = [
        "transaction_amount" => $price,
        "token" => $token,
        "description" => $description,
        "installments" => 1,
        "payment_method_id" => 'pix',
        "payer" => [
            "email" => 'bianca@teste.com',
        ]
    ];

    $requestOptions = new RequestOptions();
    $requestOptions->setCustomHeaders(["X-Idempotency-Key: " . uniqid()]);


    try {
        $payment = $client->create($request, $requestOptions);

        return $payment;

    } catch (MPApiException $e) {

        return [
            'status_code' => $e->getApiResponse()->getStatusCode(),
            'content' => $e->getApiResponse()->getContent(),
            'message' => $e->getMessage(),
        ];
    } catch (\Exception $e) {
        return ['error' => $e->getMessage()];
    }
}

}
