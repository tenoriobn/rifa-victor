<?php

namespace App\Http\Controllers\V1;

use App\Http\Controllers\Controller;
use App\Models\V1\Rifas;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use MercadoPago\Client\Common\RequestOptions;
use MercadoPago\Client\Payment\PaymentClient;
use MercadoPago\MercadoPagoConfig;
use Illuminate\Support\Str;
use MercadoPago\Exceptions\MPApiException;
use Symfony\Component\HttpFoundation\Exception\BadRequestException;

class PixController extends Controller
{
    private string $accessToken;

    public function __construct() {
        $this->accessToken = env('MERCADO_PAGO_ACCESS_TOKEN');
    }
    private function getPackageName($packageId) {
        switch ($packageId) {
            case 1:
                return 'first';
            case 2:
                return 'second';
            case 3:
                return 'third';
            case 4:
                return 'fourth';
            case 5:
                return 'fifth';
            case 6:
                return 'sixth';
            default:
                throw new BadRequestException("Invalid packageId");
        }
    }

    private function getPrice($rifa, $packageId, $numbers) {
        if (isset($packageId)) {
            $packageName = $this->getPackageName($packageId);
            $packageNumbers = $packageName . '_pacote_numbers';
            $packageDiscount = $packageName . '_pacote_discount';
            $value = $rifa[$packageNumbers] * $rifa->price -
            $rifa[$packageNumbers] *
                $rifa->price *
              ($rifa[$packageDiscount] / 100);
            return (float) number_format((float)$value, 2, '.', '');
        }
        if (isset($numbers)) {
            return (float) number_format((float)$rifa->price * $numbers, 2, '.', '');
        }
    }

    public function index(Request $request)
    {
        try{
            MercadoPagoConfig::setAccessToken($this->accessToken);
            MercadoPagoConfig::setRuntimeEnviroment(MercadoPagoConfig::LOCAL);
            $request_options = new RequestOptions();
            $request_options->setCustomHeaders(["X-Idempotency-Key: ". uniqid()]);
            $rifa = Rifas::find($request->id);
            if (!isset($rifa)) {
                return response()->json(["success" => false, "data" => [ "message" => "Rifa not found!" ]], 404);
            }
            $price = $this->getPrice($rifa, $request->packageId, $request->rifaNumbers);
            
            $createRequest = [
                "transaction_amount" => $price,
                "description" => "Comprando rifas",
                "payment_method_id" => "pix",
                "payer" => [
                    "email" => "crissmykel10@gmail.com",
                ]
            ];
            $mercadoPagoClient = new PaymentClient();
            $payment = $mercadoPagoClient->create($createRequest, $request_options);
            return response()->json(["success" => true, "data" => [ "qrCode" => $payment->point_of_interaction->transaction_data->qr_code_base64, "hash" => $payment->point_of_interaction->transaction_data->qr_code ]], 200);
        } catch (MPApiException $e) {
            return response()->json(["success" => true, "data" => [
                "statusCode" => $e->getApiResponse()->getStatusCode(),
                "content" => $e->getApiResponse()->getContent()
            ]], 200);
        } catch (BadRequestException $e) {
            return response()->json(["success" => false, "data" => [
                "statusCode" => $e->getMessage(),
            ]], 400);
        }
        catch (\Exception $e) {
            return response()->json(["success" => false, "data" => [
                "message" => "Internal Error",
            ]], 500);
        }
    }
}
