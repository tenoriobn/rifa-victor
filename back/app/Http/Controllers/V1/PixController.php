<?php

namespace App\Http\Controllers\V1;

use App\Exceptions\ForbiddenRequestException;
use App\Http\Controllers\Controller;
use App\Models\V1\RifaNumbers;
use App\Models\V1\Clients;
use App\Models\V1\Cotas;
use App\Models\V1\Rifas;
use App\Services\PaymentStatusService;
use Carbon\Carbon;
use Error;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\ItemNotFoundException;
use MercadoPago\Client\Common\RequestOptions;
use MercadoPago\Client\Payment\PaymentClient;
use MercadoPago\MercadoPagoConfig;
use MercadoPago\Exceptions\MPApiException;
use Symfony\Component\HttpFoundation\Exception\BadRequestException;

class PixController extends Controller
{
    private string $accessToken;
    private PaymentStatusService $paymentStatusService;

    public function __construct() {
        $this->accessToken = env('MERCADO_PAGO_ACCESS_TOKEN');
        $this->paymentStatusService = new PaymentStatusService();
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

    private function createPayment($price) {
        MercadoPagoConfig::setAccessToken($this->accessToken);
        MercadoPagoConfig::setRuntimeEnviroment(MercadoPagoConfig::LOCAL);
        $request_options = new RequestOptions();
        $request_options->setCustomHeaders(["X-Idempotency-Key: ". uniqid()]);
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
        return $payment;
    }

    private function getClient($phone) {
        if (!isset($phone)) {
            throw new BadRequestException("Phone is required");
        }
        return Clients::firstOrCreate(['phone' => $phone], ['phone' => $phone]);
    }

    private function rifaTotalNumbers($rifaId) {
        return RifaNumbers::where(['rifa_id' => $rifaId])->count();
    }

    private function validateRifaLeftNumbers($rifa, $numbersQuant) {
        $rifaId = $rifa->id;
        $rifaMaxNumbers = $rifa->rifa_numbers;
        $totalNumbers = $this->rifaTotalNumbers($rifaId);
        if ($totalNumbers + $numbersQuant > $rifaMaxNumbers) {
            $rifaLeftNumbersQuant = $rifaMaxNumbers - $totalNumbers;
            throw new ForbiddenRequestException("Left numbers quantity: $rifaLeftNumbersQuant");
        }
    }

    private function generateNumbersForRifa($numbersQuant) {
        $nums = DB::select(
            "SELECT @row := @row + 1 AS nums FROM 
            (select 0 union all select 1 union all select 2 union all select 3 union all select 4 union all select 5 union all select 6 union all select 7 union all select 8 union all select 9) t,
            (select 0 union all select 1 union all select 2 union all select 3 union all select 4 union all select 5 union all select 6 union all select 7 union all select 8 union all select 9) t2, 
            (select 0 union all select 1 union all select 2 union all select 3 union all select 4 union all select 5 union all select 6 union all select 7 union all select 8 union all select 9) t3, 
            (select 0 union all select 1 union all select 2 union all select 3 union all select 4 union all select 5 union all select 6 union all select 7 union all select 8 union all select 9) t4, 
            (SELECT @row:=0) numbers
            HAVING nums NOT IN (SELECT number FROM rifa_numbers)
            ORDER BY nums ASC
            LIMIT $numbersQuant"
        );
        return $nums;
    }

    private function insertNums($nums, $rifaId, $clientId, $paymentId) {
        $now = Carbon::now('utc')->toDateTimeString();
        $data = [];
        $cota = Cotas::create(['payment_id' => $paymentId, 'payment_status' => Cotas::PENDING]);
        for($index = 0; $index < count($nums); $index += 1) {
            $currentNumber = $nums[$index]->nums;
            array_push($data, ['client_id' => $clientId, 'number' => $currentNumber, 'rifa_id' => $rifaId, 'cota_id' => $cota->id, 'created_at'=> $now,
            'updated_at'=> $now
            ]);
        }
        RifaNumbers::insert($data);
    }

    private function getNumbersQuant($rifa, $packageId, $numbers) {
        if (isset($packageId)) {
            $packageName = $this->getPackageName($packageId);
            $packageNumbers = $packageName . '_pacote_numbers';
            return $rifa[$packageNumbers];
        }
        if (isset($numbers)) {
            return $numbers;
        }
    }

    public function index(Request $request)
    {
        try {
            $res = Cache::lock('criar-rifas')->block(10, function () use ($request) {
                $rifa = Rifas::find($request->id);
                if (!isset($rifa)) {
                    throw new ItemNotFoundException('Rifa not found!');
                }
                $numbersQuant = $this->getNumbersQuant($rifa, $request->packageId, $request->rifaNumbers);
                $this->validateRifaLeftNumbers($rifa, $numbersQuant);
                $price = $this->getPrice($rifa, $request->packageId, $request->rifaNumbers);
                $client = $this->getClient($request->phone);
                $payment = $this->createPayment($price);
                $nums = $this->generateNumbersForRifa($numbersQuant);
                $this->insertNums($nums, $rifa->id, $client->id, $payment->id);
                return response()->json(["success" => true, "data" => [ "qrCode" => $payment->point_of_interaction->transaction_data->qr_code_base64, "hash" => $payment->point_of_interaction->transaction_data->qr_code ]], 200);
            });
            if (!$res instanceof JsonResponse) {
                Log::error('Not a JSON response. Actual response: '.$res);
                throw new Exception("Internal error");
            }
            return $res;
        } catch (MPApiException $e) {
            return response()->json(["success" => true, "data" => [
                "statusCode" => $e->getApiResponse()->getStatusCode(),
                "content" => $e->getApiResponse()->getContent()
            ]], 200);
        } catch (BadRequestException $e) {
            return response()->json(["success" => false, "data" => [
                "message" => $e->getMessage(),
            ]], 400);
        } catch (ForbiddenRequestException $e) {
            return response()->json(["success" => false, "data" => [
                "message" => $e->getMessage(),
            ]], 403);
        } catch (ItemNotFoundException $e) {
            return response()->json(["success" => false, "data" => [
                "message" => $e->getMessage(),
            ]], 404);
        } catch (\Exception $e) {
            Log::error($e);
            return response()->json(["success" => false, "data" => [
                "message" => "Internal Error",
            ]], 500);
        }
    }
}
