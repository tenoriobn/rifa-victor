<?php

namespace App\Http\Controllers\V1;

use App\Http\Controllers\Controller;
use App\Models\V1\Cotas;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class MercadoPagoController extends Controller
{
    private string $accessToken;

    public function __construct() {
        $this->accessToken = env('MERCADO_PAGO_ACCESS_TOKEN');
    }

    public function index(Request $request)
    {
        $id = $request->data['id'];
        $response = Http::withoutVerifying()->withHeaders(['Authorization' => 'Bearer '.$this->accessToken, 'Accept' => 'application/json'])->get('https://api.mercadopago.com/v1/payments/'.$id);
        $payment = json_decode($response);
        if (isset($payment->status)) {
            switch ($payment->status) {
                case 'pending':
                    Cotas::where('payment_id', $id)->update(['payment_status' => Cotas::PENDING]);
                    break;
                case 'approved':
                    Cotas::where('payment_id', $id)->update(['payment_status' => Cotas::APPROVED]);
                    break;
                case 'authorized':
                    Cotas::where('payment_id', $id)->update(['payment_status' => Cotas::AUTHORIZED]);
                    break;
                case 'in_process':
                    Cotas::where('payment_id', $id)->update(['payment_status' => Cotas::IN_PROCESS]);
                    break;
                case 'in_mediation':
                    Cotas::where('payment_id', $id)->update(['payment_status' => Cotas::IN_MEDIATION]);
                    break;
                case 'rejected':
                    Cotas::where('payment_id', $id)->update(['payment_status' => Cotas::REJECTED]);
                    break;
                case 'cancelled':
                    Cotas::where('payment_id', $id)->update(['payment_status' => Cotas::CANCELLED]);
                    break;
                case 'refunded':
                    Cotas::where('payment_id', $id)->update(['payment_status' => Cotas::REFUNDED]);
                    break;
                default:
                    break;
            }
        }
        return response()->json(["success" => true], 200);
    }
}
