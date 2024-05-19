<?php

namespace App\Http\Controllers\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use MercadoPago\Client\Common\RequestOptions;
use MercadoPago\Client\Payment\PaymentClient;
use MercadoPago\MercadoPagoConfig;
use Illuminate\Support\Str;
use MercadoPago\Exceptions\MPApiException;

class PixController extends Controller
{
    private string $accessToken;

    public function __construct() {
        $this->accessToken = env('MERCADO_PAGO_ACCESS_TOKEN');
    }

    public function index()
    {
        try{
            MercadoPagoConfig::setAccessToken($this->accessToken);
            MercadoPagoConfig::setRuntimeEnviroment(MercadoPagoConfig::LOCAL);
            $request_options = new RequestOptions();
            $request_options->setCustomHeaders(["X-Idempotency-Key: ". uniqid()]);
            
            $createRequest = [
                "transaction_amount" => 10,
                "description" => "This is a test",
                "payment_method_id" => "pix",
                "payer" => [
                    "email" => "crissmykel10@gmail.com",
                ]
            ];
    
            $mercadoPagoClient = new PaymentClient();
            $payment = $mercadoPagoClient->create($createRequest, $request_options);
            return response()->json(["success" => true, "data" => [ "qrCode" => $payment->point_of_interaction->transaction_data->qr_code_base64, "hash" => $payment->point_of_interaction->transaction_data->qr_code ]], 200);
        } 
        // catch (MPApiException $e) {
        //     return response()->json(["success" => true, "data" => [
        //         "statusCode" => $e->getApiResponse()->getStatusCode(),
        //         "content" => $e->getApiResponse()->getContent()
        //     ]], 200);
        // }
        catch (\Exception $e) {
            return response()->json(["success" => false, "data" => [
                "message" => "Internal Error",
            ]], 500);
        }
    }
}
