<?php

namespace App\Http\Controllers\V1;

use App\Models\V1\RifaNumber;
use \Exception;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

use App\Http\Requests\V1\{StoreRifasRequest, UpdateRifasRequest, PaymentRequest, OrderRifaRequest, WinnerRequest};
use App\Http\Resources\V1\{RifasResource};
use App\Models\V1\{Rifas, RifaWinner, RifaPay};
use App\Services\RifaService;




class RifasController extends Controller
{

    protected $success = 200;
    protected $postSuccess = 201;
    protected $notFound = 404;
    protected $serverError = 500;

      public function __construct(RifaService $rifaService)
    {
        $this->rifaService = $rifaService;
    }
    public function index() {
        try {
            $rifasData = Rifas::getAllRifasActivas()->where('emphasis', 'sim')->first();
            // $winners = Rifas::getAllWinners();

            return response()->json(["success" => true, "data" => $rifasData], $this->success);
        } catch (Exception $e) {
            return response()->json(["success" => false, "msg" => $e->getMessage()], $this->serverError);
        }
    }
    public function allRifas() {
        try {
            $rifasData = Rifas::getAllRifas();

            if ($rifasData->isEmpty()) {
                return response()->json(["success" => false, "msg" => "rifas have not been found."], $this->notFound);
            }

            return response()->json(["success" => true, "data" => $rifasData], $this->success);
        } catch (Exception $e) {
            return response()->json(["success" => false, "msg" => $e->getMessage()], $this->serverError);
        }
    }

    public function storeRifa(StoreRifasRequest $request) {

        try {
            $this->rifaService->createRifas($request);
            return response()->json(["success" => true, "msg" => "Rifa criada com sucesso" ], $this->success);
        } catch (Exception $e) {
            return response()->json(["response" => false, "msg" => "Ocorreu um erro interno ao cadastrar a rifa", "error" => $e->getMessage()], $this->serverError);
        }
    }

    public function show($slug, $id) {
        try {
            $rifaData = Rifas::getOneRifas($id);

            if (!$rifaData) {
                return response()->json(["success" => false, "msg" => "Rifa has not been found."], $this->notFound);
            }
            $ranking = RifaNumber::getRanking();
            $data = [
                'rifa' => $rifaData,
                'ranking' => $ranking,
            ];

            return response()->json(["success" => true, "data" => $data], $this->success);
        } catch (Exception $e) {
            return response()->json(["success" => false, "msg" => $e->getMessage()], $this->serverError);
        }
    }
    public function buyRifa(OrderRifaRequest $request) {
        try {
            $rifaPay = RifaPay::applyRifa($request);
            RifaNumber::applyRifa($request, $rifaPay);
            return response()->json(["success" => true, "msg"=> "Rifa Comprada com sucesso"], $this->success);
        } catch (Exception $e) {
            return response()->json(["success" => false, "msg" => $e->getMessage()], $this->serverError);
        }
    }

    public function winners() {
        try {

            $winners = RifaWinner::getAllWinners();
            return response()->json(["success" => true, "data" => $winners], $this->success);

        } catch (Exception $e) {
            return response()->json(["success" => false, "msg" => $e->getMessage()], $this->serverError);
        }
    }

    public function defineWinners(WinnerRequest $request) {
        try {

            $winners = RifaWinner::defineWinner($request);

            return response()->json(["success" => true, "data" => $winners], $this->success);

        } catch (Exception $e) {
            return response()->json(["success" => false, "msg" => $e->getMessage()], $this->serverError);
        }
    }
    public function makeQuotaAwarded(WinnerRequest $request) {
        try {

            $winners = RifaWinner::defineWinner($request);

            return response()->json(["success" => true, "data" => $winners], $this->success);

        } catch (Exception $e) {
            return response()->json(["success" => false, "msg" => $e->getMessage()], $this->serverError);
        }
    }














    public function update(UpdateRifasRequest $request, $id)
    {
        try {
            // $thumbnail = $request->file("thumbnail");

            $rifaData = Rifas::find($id);

            // if ($thumbnail) {

            //     $postImage =  $rifaData->thumbnail;

            //     $imagePath = parse_url($postImage, PHP_URL_PATH);

            //     if (file_exists(public_path($imagePath))) {
            //         unlink(public_path($imagePath));
            //     }

            //     $uniqueFileName = uniqid() . '.' . $thumbnail->getClientOriginalExtension();
            //     $thumbnail->move(public_path("assets/images/post-images"), $uniqueFileName);
            //     $relativePath = "assets/images/post-images/" . $uniqueFileName;

            //     $thumbnailUrl = asset($relativePath);
            // }
            $thumbnailUrl = [];
            $thumbs = $request->file("thumbnail");
            if ($thumbs) {
                for ($index = 0; $index < count($thumbs); $index += 1) {
                    $thumbnail = $thumbs[$index];
                    $uniqueFileName = uniqid() . '.' . $thumbnail->getClientOriginalExtension();
                    $thumbnail->move(public_path("assets/images/post-images"), $uniqueFileName);
                    $relativePath = "assets/images/post-images/" . $uniqueFileName;
                    array_push($thumbnailUrl, asset($relativePath));
                }
            }
            $data = [
                "title" =>  strip_tags($request->get("title")),
                "description" => $request->get("description"),
                "rifa_status" => $request->get("rifaStatus"),
                "rifa_date" => $request->get("rifaDate"),
                "price" => $request->get("price"),
                "first_pacote_numbers" => $request->get("firstPacoteNumbers"),
                "first_pacote_discount" => $request->get("firstPacoteDiscount"),
                "second_pacote_numbers" => $request->get("secondPacoteNumbers"),
                "second_pacote_discount" => $request->get("secondPacoteDiscount"),
                "third_pacote_numbers" => $request->get("thirdPacoteNumbers"),
                "third_pacote_discount" => $request->get("thirdPacoteDiscount"),
                "fourth_pacote_numbers" => $request->get("fourthPacoteNumbers"),
                "fourth_pacote_discount" => $request->get("fourthPacoteDiscount"),
                "fifth_pacote_numbers" => $request->get("fifthPacoteNumbers"),
                "fifth_pacote_discount" => $request->get("fifthPacoteDiscount"),
                "sixth_pacote_numbers" => $request->get("sixthPacoteNumbers"),
                "sixth_pacote_discount" => $request->get("sixthPacoteDiscount"),
                "min_numbers" => $request->get("minNumbers"),
                "max_numbers" => $request->get("maxNumbers"),
                "rifa_numbers" => $request->get("rifaNumbers"),
            ];
            if (count($thumbnailUrl) > 0) {
                $data['thumbnail'] = implode(',', $thumbnailUrl);
            }
            $newRifaData = $rifaData->update($data);

            return response()->json(["success" => true, "data" => new RifasResource($rifaData)], $this->postSuccess);
        } catch (Exception $e) {
            return response()->json(["success" => false, "msg" => $e->getMessage()], $this->serverError);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        try {
            $rifaData = Rifas::find($id);
            if ($rifaData) {
                $postImage =  $rifaData->thumbnail;

                $imagePath = parse_url($postImage, PHP_URL_PATH);

                if (file_exists(public_path($imagePath))) {
                    unlink(public_path($imagePath));
                }

                $rifaData->delete();
                return response()->json(["success" => true, "msg" => "Rifa has been deleted"], $this->success);
            } else {
                throw new Exception("Rifa has not been found.");
            };
        } catch (Exception $e) {
            return response()->json(["success" => false, "msg" => $e->getMessage()], $this->serverError);
        }
    }

    public function latest()
    {
        try {
            $rifaData = Rifas::orderBy("updated_at", "desc")->first();

            if (!$rifaData) {
                return response()->json(["success" => false, "msg" => "Rifa has not been found."], $this->notFound);
            }
            $buyer = DB::select("SELECT clients.phone, clients.name, count(rifa_numbers.client_id) numbers FROM rifa_numbers INNER JOIN clients ON rifa_numbers.client_id = clients.id INNER JOIN cotas ON cotas.id = rifa_numbers.cota_id WHERE rifa_numbers.rifa_id = $rifaData->id AND cotas.payment_status IN (1, 2, 10) AND DATE_FORMAT(cotas.created_at, '%Y-%m-%d') = CURDATE() GROUP BY client_id ORDER BY numbers DESC LIMIT 1");
            $rifaData->biggestBuyer = isset($buyer[0]) ? $buyer[0] : null;
            if (isset($rifaData->biggestBuyer->phone)) {
                $re = '*******';
                $rifaData->biggestBuyer->phone = $re . substr($rifaData->biggestBuyer->phone, 7);
            }

            return response()->json(["success" => true, "data" => new RifasResource($rifaData)], $this->success);
        } catch (Exception $e) {
            return response()->json(["success" => false, "msg" => $e->getMessage()], $this->serverError);
        }
    }

    public function orders($id) {
        try {
            $rifaData = Rifas::find($id);

            if (!$rifaData) {
                return response()->json(["success" => false, "msg" => "Rifa has not been found."], $this->notFound);
            }
            $buyers = DB::select("SELECT cotas.payment_status, cotas.id, cotas.price, clients.phone, clients.name, count(rifa_numbers.client_id) numbers, cotas.created_at, cotas.updated_at, GROUP_CONCAT(rifa_numbers.number) nums FROM rifa_numbers INNER JOIN clients ON rifa_numbers.client_id = clients.id INNER JOIN cotas ON cotas.id = rifa_numbers.cota_id WHERE rifa_id = $rifaData->id AND cotas.payment_status IN (0, 1, 2, 10) GROUP BY client_id;");

            return response()->json(["success" => true, "data" => ["rifa" => $rifaData, "buyers" => $buyers]], $this->success);
        } catch (Exception $e) {
            return response()->json(["success" => false, "msg" => $e->getMessage()], $this->serverError);
        }
    }

    public function searchOrder(Request $request) {
        try {
            $rifaData = Rifas::find($request->id);

            if (!$rifaData) {
                return response()->json(["success" => false, "msg" => "Rifa has not been found."], $this->notFound);
            }
            $getWhere = "";
            $conditions = [];
            if ($request->cota) {
                $cota = "rifa_numbers.number = $request->cota";
                array_push($conditions, $cota);
            }
            if ($request->buyId) {
                $buyId = "cotas.id = $request->buyId";
                array_push($conditions, $buyId);
            }
            if ($request->phone) {
                $phone = $getWhere." clients.phone = $request->phone ";
                array_push($conditions, $phone);
            }
            if (count($conditions) > 0) {
                $con = implode(" OR ", $conditions);
                $getWhere = "AND ($con)";
            }
            $buyers = DB::select("SELECT cotas.payment_status, cotas.id, cotas.price, clients.phone, clients.name, count(rifa_numbers.client_id) numbers, cotas.created_at, cotas.updated_at, GROUP_CONCAT(rifa_numbers.number) nums FROM rifa_numbers INNER JOIN clients ON rifa_numbers.client_id = clients.id INNER JOIN cotas ON cotas.id = rifa_numbers.cota_id WHERE rifa_id = $rifaData->id AND cotas.payment_status IN (0, 1, 2, 10) $getWhere GROUP BY client_id LIMIT 1");
            $buyer = isset($buyers[0]) ? $buyers[0] : null;

            return response()->json(["success" => true, "data" => ["buyer" => $buyer]], $this->success);
        } catch (Exception $e) {
            return response()->json(["success" => false, "msg" => $e->getMessage()], $this->serverError);
        }
    }

    // public function getLatestWinner() {
    //     try {
    //         $rifaData = Rifas::orderBy("updated_at", "desc")->first();

    //         if (!$rifaData) {
    //             return response()->json(["success" => false, "msg" => "Rifa has not been found."], $this->notFound);
    //         }
    //         if ($rifaData->winner_id === null) {
    //             return response()->json(["success" => false, "data" => ['winner' => null]], 200);
    //         }
    //         Log::info($rifaData);
    //         $winner = DB::select("SELECT rifas.winner_number, rifas.thumbnail,rifas.title, cotas.payment_status, cotas.price, clients.id client_id, clients.phone, clients.name, count(rifa_numbers.client_id) numbers, cotas.created_at, cotas.updated_at FROM rifa_numbers INNER JOIN clients ON rifa_numbers.client_id = clients.id INNER JOIN cotas ON cotas.id = rifa_numbers.cota_id INNER JOIN rifas ON rifa_numbers.rifa_id = rifas.id WHERE client_id = $rifaData->winner_id GROUP BY client_id LIMIT 1")[0];
    //         $rifaData->biggestBuyer = isset($buyer[0]) ? $buyer[0] : null;
    //         if (isset($winner->phone)) {
    //             $winner->phone = preg_replace("/\d{4,5}/", '****' ,$winner->phone);
    //         }

    //         return response()->json(["success" => true, "data" => ['winner' => $winner]], $this->success);
    //     } catch (Exception $e) {
    //         return response()->json(["success" => false, "msg" => $e->getMessage()], $this->serverError);
    //     }
    // }

    public function defineWinner(Request $request) {
        try {
            $rifaData = Rifas::find($request->id);

            if (!$rifaData) {
                return response()->json(["success" => false, "message" => "Rifa não encontrada."], 404);
            }

            $buyers = DB::select("SELECT cotas.payment_status, cotas.id, cotas.price, clients.id client_id, clients.phone, clients.name, count(rifa_numbers.client_id) numbers, cotas.created_at, cotas.updated_at, GROUP_CONCAT(rifa_numbers.number) nums FROM rifa_numbers INNER JOIN clients ON rifa_numbers.client_id = clients.id INNER JOIN cotas ON cotas.id = rifa_numbers.cota_id WHERE rifa_id = $rifaData->id AND cotas.payment_status IN (1, 2, 10) AND rifa_numbers.number = $request->cotaId GROUP BY client_id LIMIT 1");
            if (isset($buyers[0])) {
                $rifaData->update(['winner_id' => $buyers[0]->client_id, 'winner_number' => $request->cotaId]);
                return response()->json(["success" => true, "data" => ["buyer" => $buyers[0]]], $this->success);
            } else {
                return response()->json(["success" => false, "message" => "Cota não encontrada"], 404);
            }
        } catch (Exception $e) {
            return response()->json(["success" => false, "message" => $e->getMessage()], $this->serverError);
        }
    }

    public function payment(PaymentRequest $request)
    {
        // try {
        //     $userPhone = $request->input("phone");
        //     $rifaNumbers = $request->input("rifaNumbers");

        //     $rifaData = Rifas::orderBy("updated_at", "desc")->first();

        //     if (!$rifaData) {
        //         return response()->json(["success" => false, "msg" => "Rifa has not been found."], $this->notFound);
        //     }

        //     $numbersRemaining = $rifaData->rifa_numbers_remaining;

        //     $rifaData->update([
        //         "rifa_numbers_remaining" => $numbersRemaining - $rifaNumbers,
        //     ]);

        //     return response()->json(["success" => true, "data" => new RifasResource($rifaData)], $this->success);
        // } catch (Exception $e) {
        //     return response()->json(["success" => false, "msg" => $e->getMessage()], $this->serverError);
        // }
    }
}
