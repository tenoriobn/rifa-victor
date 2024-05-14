<?php

namespace App\Http\Controllers\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use MercadoPago\Client\Payment\PaymentClient;
use MercadoPago\MercadoPagoConfig;

class PixController extends Controller
{
    public function index()
    {
        MercadoPagoConfig::setAccessToken("APP_USR-6114685948865910-080322-86c789f0c01d3df5815eb5c73d252405-1190968127");
        $client = new PaymentClient();

        $createRequest = [
            "transaction_amount" => 10,
            "description" => "This is a test",
            "external_reference" => uniqid(),
            "notification_url" => "https://www.google.com/",
            "payment_method_id" => "pix",
            "payer" => [
                "email" => "crissmykel10@gmail.com",
            ]
        ];

        $payment = $client->create($createRequest);

        return response()->json(["success" => true, "data" => $payment], 200);
    }
}
