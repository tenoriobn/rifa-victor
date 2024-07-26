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
    public function createPayment($rifa, $description) {
        $client = new PaymentClient();
        $timeLimit = $rifa->rifa->rifaPayment->time_pay ?? 30;
        $expirationDate = now()->addMinutes($timeLimit)->setTimezone('UTC')->format('Y-m-d\TH:i:sP');
        $value =  floatval($rifa->value);
        $username = $rifa->client->name.'@gmail.com'; // Obter apenas o nome do usuário
        $request = [
            "transaction_amount" => $value,
            "description" => $description,
            // "date_of_expiration" =>  $expirationDate,
            "installments" => 1,
            "payment_method_id" => 'pix',
            "payer" => [
                "email" => $username, // Enviar apenas o nome do usuário
            ]
        ];
    
        $requestOptions = new RequestOptions();
        $requestOptions->setCustomHeaders(["X-Idempotency-Key: " . uniqid()]);
    
        try {
            $payment = $client->create($request, $requestOptions);
            
            return $payment;
    
        } catch (MPApiException $e) {
    
            return [
                'status' => false,
                'status_code' => $e->getApiResponse()->getStatusCode(),
                'content' => $e->getApiResponse()->getContent(),
                'message' => $e->getMessage(),
            ];
        } catch (\Exception $e) {
            return ['status' => false, 'message' => $e->getMessage()];
        }
    }
    

    public function checkPaymentStatus($paymentId)
    {
        $client = new PaymentClient();

        try {
            $payment = $client->get($paymentId);

            return [
                'status' => true,
                'payment' => $payment,
            ];

        } catch (MPApiException $e) {
            return [
                'status' => false,
                'status_code' => $e->getApiResponse()->getStatusCode(),
                'content' => $e->getApiResponse()->getContent(),
                'message' => $e->getMessage(),
            ];
        } catch (\Exception $e) {
            return ['status' => false, 'message' => $e->getMessage()];
        }
    }


}
