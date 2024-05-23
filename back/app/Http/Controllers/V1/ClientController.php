<?php

namespace App\Http\Controllers\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use \Exception;
use App\Models\V1\Clients;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\ItemNotFoundException;

class ClientController extends Controller
{
    public function getNumbers(Request $request)
    {
        try {
            $client = Clients::where('phone', $request->phone)->first();
            if (!isset($client)) {
                throw new ItemNotFoundException('Telefone não cadastrado');
            }
            $clientId = $client->id;
            $info = DB::select("SELECT cotas.*, count(rifa_numbers.number) as numbers FROM rifa_numbers INNER JOIN cotas ON rifa_numbers.cota_id = cotas.id WHERE rifa_numbers.client_id = $clientId GROUP BY cotas.id");
            return response()->json(["success" => true, "data" => $info], 200);
        } catch (ItemNotFoundException $e) {
            return response()->json(["success" => false, "msg" => $e->getMessage()], 404);
        } catch (Exception $e) {
            return response()->json(["success" => false, "msg" => $e->getMessage()], 500);
        }
    }
}
