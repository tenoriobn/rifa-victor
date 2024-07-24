<?php

namespace App\Http\Controllers\V1;

use App\Models\V1\RifaNumber;

use \Exception;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

use App\Http\Requests\V1\{StoreRifasRequest, UpdateRifasRequest, PaymentRequest, OrderRifaRequest, WinnerRequest};
use App\Http\Resources\V1\{RifasResource};
use App\Models\V1\{Rifas, RifaWinner, RifaPay, AwardedQuota, DiscountPackage, RifaUpsell, RifaImage};
use App\Services\{RifaService, MercadoPagoService};







class RifasController extends Controller
{

    protected $success = 200;
    protected $postSuccess = 201;
    protected $notFound = 404;
    protected $serverError = 500;

      public function __construct(RifaService $rifaService, MercadoPagoService $mercadoPagoService)
    {
        $this->rifaService = $rifaService;
        $this->mercadoPagoService = $mercadoPagoService;
    }
    public function index() {
        try {
            $rifasData = Rifas::getAllRifasActivas()->where('emphasis', 'sim')->first();

            return response()->json(["success" => true, "data" => $rifasData], $this->success);
        } catch (Exception $e) {
            return response()->json(["success" => false, "msg" => $e->getMessage()], $this->serverError);
        }
    }
    public function getAllRifasAdmin() {
        try {
            $rifasData = Rifas::with(['cota'])->withSum('rifaPayActiva as fat_total', 'value')
            ->withSum('rifaPayToday as fat_hoje', 'value')
            ->withCount(['rifaNumberActive as qntd_numeros' => function ($query) {
                $query->select(DB::raw("SUM(LENGTH(numbers) - LENGTH(REPLACE(numbers, ',', '')) + 1) as number_count"));
            }])
            ->withCount(['rifaNumberReservado as qntd_numeros_reservado' => function ($query) {
                $query->select(DB::raw("SUM(LENGTH(numbers) - LENGTH(REPLACE(numbers, ',', '')) + 1) as number_count"));
            }])
            ->latest()
            ->get();


            if (!$rifasData) {
                return response()->json(["success" => false, "msg" => "rifas não foi encontrada."], $this->notFound);
            }

            return response()->json(["success" => true, "data" => $rifasData], $this->success);
        } catch (Exception $e) {
            return response()->json(["success" => false, "msg" => $e->getMessage()], $this->serverError);
        }
    }

    public function getAllRifasAdminFiltro(Request $request) {
        try {
            // Obtenha os parâmetros da consulta
            $nome = $request->query('nome');
            $status = $request->query('status');

            // Inicie a consulta
            $query = Rifas::with(['cota'])
                ->withSum('rifaPayActiva as fat_total', 'value')
                ->withSum('rifaPayToday as fat_hoje', 'value')
                ->withCount(['rifaNumberActive as qntd_numeros' => function ($query) {
                    $query->select(DB::raw("SUM(LENGTH(numbers) - LENGTH(REPLACE(numbers, ',', '')) + 1) as number_count"));
                }])
                ->withCount(['rifaNumberReservado as qntd_numeros_reservado' => function ($query) {
                    $query->select(DB::raw("SUM(LENGTH(numbers) - LENGTH(REPLACE(numbers, ',', '')) + 1) as number_count"));
                }])
                ->latest();

            // Aplique filtros se os parâmetros estiverem presentes
            if ($nome) {
                $query->where('nome', 'LIKE', "%$nome%");
            }

            if ($status) {
                $query->where('status', $status);
            }

            // Execute a consulta
            $rifasData = $query->get();

            if ($rifasData->isEmpty()) {
                return response()->json(["success" => false, "msg" => "Nenhuma rifa encontrada."], $this->notFound);
            }

            return response()->json(["success" => true, "data" => $rifasData], $this->success);
        } catch (Exception $e) {
            return response()->json(["success" => false, "msg" => $e->getMessage()], $this->serverError);
        }
    }

    public function allRifas() {
        try {
            $rifasData = Rifas::getAllRifas();

            if (!$rifasData) {
                return response()->json(["success" => false, "msg" => "rifas have not been found."], $this->notFound);
            }

            return response()->json(["success" => true, "data" => $rifasData], $this->success);
        } catch (Exception $e) {
            return response()->json(["success" => false, "msg" => $e->getMessage()], $this->serverError);
        }
    }


    public function storeRifa(StoreRifasRequest $request) {

        try {
            // $isMakeRifa = Rifas::RifaActiva();

            // if($isMakeRifa) {
            //     return response()->json(["success" => true, "msg" => "Para cadastrar um nova rifa, você precisa finalizar a rifa: $isMakeRifa->title"], 422);
            // }
            $rifa = $this->rifaService->createRifas($request);

            if(!$rifa) {
                return response()->json(["success" => true, "msg" => "Ocorreu um erro ao cadastrar" ], 422 );
            }
            return response()->json(["success" => true, "msg" => "Rifa criada com sucesso" ], $this->success);
        } catch (Exception $e) {
            return response()->json(["response" => false, "msg" => "Ocorreu um erro interno ao cadastrar a rifa", "error" => $e->getMessage()], $this->serverError);
        }
    }

    public function getOneRifa($id) {
        try {
            $rifasData = Rifas::getOneRifa($id);
            if (!$rifasData) {
                return response()->json(["success" => false, "msg" => "rifas have not been found."], $this->notFound);
            }

            return response()->json(["success" => true, "data" => $rifasData], $this->success);
        } catch (Exception $e) {
            return response()->json(["success" => false, "msg" => $e->getMessage()], $this->serverError);
        }
    }
    public function editRifa($id, Request $request) {
        try {
            $rifasData = Rifas::getOneRifa( $id);
            if (!$rifasData) {
                return response()->json(["success" => false, "msg" => "Rifa não encontrada" ], 404);
            }

            $rifa = $this->rifaService->createRifas($request);
            return response()->json(["success" => true, "msg" => "Rifa editada com sucesso" ], $this->success);


        } catch (Exception $e) {
            return response()->json(["response" => false, "msg" => "Ocorreu um erro interno ao cadastrar a rifa", "error" => $e->getMessage()], $this->serverError);
        }
    }

    public function storeBilhetePremiado(Request $request) {
        try {
            $qntdCota = $request->qntd_cota;
            $rifaId = $request->rifas_id;

            $rifa = Rifas::with('cota')->find($rifaId);
            if (!$rifa) {
                return response()->json(['response' => false, 'msg' => 'Bilhete não encontrada'], 404);
            }

            $qntdCotaExist = AwardedQuota::where('rifas_id', $rifaId)->count();
            $isMake = $rifa->cota->qntd_cota - $qntdCotaExist;

            if (($qntdCota <= $isMake) || ($request->qntd_cota < 21)) {
                $bilhetePremiado = AwardedQuota::createAwardedQuota($qntdCota, $request->award, $request->show_site, $request->status, $rifaId);

                if ($bilhetePremiado) {

                    $bilhetePremiado = AwardedQuota::getAllBilhetePremiado($rifaId);
                    return response()->json(["success" => true, "msg" => "Bilhete criada com sucesso", 'data' => $bilhetePremiado], 200);

                }

                return response()->json(['response' => false, 'msg' => 'Erro ao criar a cota'], 500);
            }

            return response()->json(['response' => false, 'msg' => 'Quantidade de Cotas inválida'], 400);
        } catch (Exception $e) {
            return response()->json(["response" => false, "msg" => "Ocorreu um erro interno ao cadastrar a rifa", "error" => $e->getMessage()], 500);
        }
    }
    public function editarBilhetePremiado(Request $request) {
        try {
            $bilheteId = $request->id;
            $rifaId = $request->rifas_id;

            $bilhete = AwardedQuota::find($bilheteId);

            if (!$bilhete) {
                return response()->json(['response' => false, 'msg' => 'Bilhete não encontrada'], 404);
            }

            $bilhetePremiado = AwardedQuota::updateAwardedQuota($request);
            if ($bilhetePremiado) {
                $bilhetePremiadoAll = AwardedQuota::getAllBilhetePremiado($rifaId);
                return response()->json(["success" => true, "msg" => "Bilhete Premiado criada com sucesso", 'data' => $bilhetePremiadoAll], 200);
            }


        } catch (Exception $e) {
            return response()->json(["response" => false, "msg" => "Ocorreu um erro interno ao editar a bilhete", "error" => $e->getMessage()], 500);
        }
    }
    public function destroyBilhetePremiado(Request $request) {
        try {
            $bilheteId = $request->id;
            $rifaId = $request->rifaId;

            $bilhete = AwardedQuota::find($bilheteId);

            if (!$bilhete) {
                return response()->json(['response' => false, 'msg' => 'Bilhete não encontrada'], 404);
            }

            $isDelete = $bilhete->delete();
            if ($isDelete) {
                $bilhetePremiadoAll = AwardedQuota::getAllBilhetePremiado($rifaId);
                return response()->json(["success" => true, "msg" => "Bilhete Premiado criada com sucesso", 'data' => $bilhetePremiadoAll], 200);
            }


        } catch (Exception $e) {
            return response()->json(["response" => false, "msg" => "Ocorreu um erro interno ao editar a bilhete", "error" => $e->getMessage()], 500);
        }
    }
    public function getAllBilhetePremiado($id) {
        try {
            $rifa = Rifas::find($id);
            if ($rifa == []) {
                return response()->json(['response' => false, 'msg' => 'Bilhete não encontrada'], 404);
            }

            $qntdCotaExist = AwardedQuota::getAllBilhetePremiado($id);
            if ($qntdCotaExist->isEmpty()) {
                return response()->json(['response' => false, 'msg' => 'Bilhete não encontrada'], 404);
            }
            return  response()->json(["success" => true, "data" => $qntdCotaExist], 200);




        } catch (Exception $e) {
            return response()->json(["response" => false, "msg" => "Ocorreu um erro interno ao cadastrar a rifa", "error" => $e->getMessage()], 500);
        }
    }
    public function getOneBilhetePremiado($id) {
        try {
            $bilhete = AwardedQuota::getOneBilhetePremiado($id);
            if (!$bilhete) {
                return response()->json(['response' => false, 'msg' => 'bilhete não encontrada'], 404);
            }

            return  response()->json(["success" => true, "data" => $bilhete], 200);

        } catch (Exception $e) {
            return response()->json(["response" => false, "msg" => "Ocorreu um erro interno", "error" => $e->getMessage()], 500);
        }
    }
    public function storePacote(Request $request) {
        try {
            $rifaId = $request->rifas_id;

            $rifa = Rifas::withCount('cota')->find($rifaId);
            if (!$rifa) {
                return response()->json(['response' => false, 'msg' => 'Rifa não encontrada'], 404);
            }

            $pacote = DiscountPackage::createDiscountPackage($request);

            if ($pacote) {
                $pacote =  DiscountPackage::getAllPacotes($rifaId);
                return response()->json(["success" => true, "msg" => "Pacote criado com sucesso", 'data' =>  $pacote], 200);
            }

            return response()->json(['response' => false, 'msg' => 'Erro ao criar o pacote'], 500);

        } catch (Exception $e) {
            return response()->json(["response" => false, "msg" => "Ocorreu um erro interno ao cadastrar a rifa", "error" => $e->getMessage()], 500);
        }
    }
    public function editarPacote(Request $request) {
        try {
            $rifaId = $request->rifas_id;

            $rifa = Rifas::withCount('cota')->find($rifaId);
            if (!$rifa) {
                return response()->json(['response' => false, 'msg' => 'Rifa não encontrada'], 404);
            }

            $pacote = DiscountPackage::createDiscountPackage($request);

            if ($pacote) {
                $pacote = DiscountPackage::getAllPacotes($rifaId);
                return response()->json(["success" => true, "msg" => "Pacote editado com sucesso", 'data' => $pacote], 200);
            }

            return response()->json(['response' => false, 'msg' => 'Erro ao editar o pacote'], 500);

        } catch (Exception $e) {
            return response()->json(["response" => false, "msg" => "Ocorreu um erro", "error" => $e->getMessage()], 500);
        }
    }

    public function getAllPacotes($id) {
        try {

            $pacotes = DiscountPackage::getAllPacotes($id);
            if (!$pacotes) {
                return response()->json(['response' => false, 'msg' => 'Pacote não encontrada'], 404);
            }

            return response()->json(["success" => true, "data" => $pacotes ], 200);


        } catch (Exception $e) {
            return response()->json(["response" => false, "msg" => "Ocorreu um erro interno ao cadastrar a rifa", "error" => $e->getMessage()], 500);
        }
    }
    public function getOnePacotes($id) {
        try {

            $pacote = DiscountPackage::getOnePacote($id);
            if (!$pacote) {
                return response()->json(['response' => false, 'msg' => 'Pacote não encontrada'], 404);
            }

            return response()->json(["success" => true, "data" => $pacote ], 200);


        } catch (Exception $e) {
            return response()->json(["response" => false, "msg" => "Ocorreu um erro interno ao cadastrar a rifa", "error" => $e->getMessage()], 500);
        }
    }

    public function getUpsellRifa($id) {
        try {
            $upsell = RifaUpsell::getAllUpsellRifa( $id);

            if (!$upsell) {
                return response()->json(["success" => false, "msg" => "Upsell não encontrado"], 404);
            }

            return response()->json(['response' => true, 'data' => $upsell], 200);

        } catch (Exception $e) {
            return response()->json(["response" => false, "msg" => "Ocorreu um erro interno ao cadastrar a rifa", "error" => $e->getMessage()], 500);
        }

    }

    public function storeUpsell(Request $request) {
        try {
            $rifaId = $request->rifas_id;

            $rifa = Rifas::withCount('cota')->find($rifaId);
            if (!$rifa) {
                return response()->json(['response' => false, 'msg' => 'Rifa não encontrada'], 404);
            }

            $upsell = RifaUpsell::createUpsell( $request->id ?? null, $request->qntd_cota, $request->price_cota, $request->price_total, $request->qntd_min, $request->qntd_max, $request->localizacao, $request->status ?? 'ativo', $rifaId);

            if (!$upsell) {
                return response()->json(['response' => false, 'msg' => 'Erro ao criar o pacote'], 500);

            }
            return response()->json(["success" => true, "msg" => "Pacote criado com sucesso"], 200);

        } catch (Exception $e) {
            return response()->json(["response" => false, "msg" => "Ocorreu um erro interno ao cadastrar a rifa", "error" => $e->getMessage()], 500);
        }
    }

    public function storeImagem(Request $request) {
        try {
            // Validar a entrada
            $request->validate([
                'imagem' => 'required|string',
                'rifa_id' => 'required|integer',
            ]);

            $imgBase64 = $request->input('imagem');
            $rifaId = $request->input('rifa_id');

            // Usar o serviço para armazenar a imagem
            $resp = $this->rifaService->saveImage($imgBase64, $rifaId);
            $result = RifaImage::createImage($resp['imgName'], $resp['rifaId']);
            return response()->json(["response" => $result, "msg" => $result ? "Imagem salva com sucesso." : "Erro ao salvar imagem."], $result ? 201 : 500);
        } catch (\Exception $e) {
            return response()->json(["response" => false, "msg" => "Erro ao processar a imagem.", "error" => $e->getMessage()], 500);
        }
    }

    public function getImagens($id) {
        try {

            $imagens = RifaImage::getRifaImagens($id);
            if (!count($imagens)) {
                return response()->json(['response' => false, 'msg' => 'Imagem não encontrada'], 404);
            }

            return response()->json(["success" => true, "data" => $imagens ], 200);


        } catch (Exception $e) {
            return response()->json(["response" => false, "msg" => "Ocorreu um erro interno", "error" => $e->getMessage()], 500);
        }
    }
    public function destroyImagem($id) {
        try {

            $img = RifaImage::getOneRifaImagens($id);
            if (!$img) {
                return response()->json(['response' => false, 'msg' => 'Imagem não encontrada'], 404);
            }
            $img->delete();
            return response()->json(["success" => true, "msg" => 'Imagem deletada com sucesso' ], 200);


        } catch (Exception $e) {
            return response()->json(["response" => false, "msg" => "Ocorreu um erro interno", "error" => $e->getMessage()], 500);
        }
    }

    public function finalizarRifa($id)
    {
        $rifa = Rifas::where('id',$id);
        if (!$rifa ) {
            return response()->json(["response" => true, "msg" => "Nenhuma rifa encontrada."], 404);
        }

        $rifa->update(['status' => 'finalizadas']);
        return response()->json(["response" => true, "msg" => "Rifa finalizada com sucesso."]);
    }


    public function show($slug, $id) {
        try {
            $rifaData = Rifas::getOneRifa($id);

            if (!$rifaData) {
                return response()->json(["success" => false, "msg" => "Rifa has not been found."], $this->notFound);
            }
            $ranking = RifaNumber::getRankingRifa($id);
            $data = [ 'rifa' => $rifaData, 'ranking' => $ranking];

            return response()->json(["success" => true, "data" => $data], $this->success);
        } catch (Exception $e) {
            return response()->json(["success" => false, "msg" => $e->getMessage()], $this->serverError);
        }
    }
    public function buyRifa(OrderRifaRequest $request) {
        try {

            $isBuyRifa =  $this->rifaService->isBuy($request);

            if(!$isBuyRifa['success']) {
                return response()->json(["success" => false, "msg" => $isBuyRifa['msg']], 409 );
            }

            $rifaPay = RifaPay::applyRifa($request);
            if (!$rifaPay) {
                return response()->json(["success" => false, "msg" => "Ocorreu um erro ao comprar"], 500);
            }

            $rifaPayDetails = RifaPay::with(['rifa.cota', 'rifa.awardedQuota'])
                ->find($rifaPay->id);

            $result = RifaNumber::applyRifa($rifaPayDetails);

            if(!$result) {
                $rifaPayDetails->delete();
                return response()->json(["success" => false, "msg" => "Quantidade de número invalido"], 409 );
            }

            $payment = $this->mercadoPagoService->createPayment($rifaPay, 'Rei do Pix, [Compra da rifa '.$rifaPayDetails->rifa->title. ']');

            if(!$payment) {
                return response()->json(["success" => false, "msg" => [$payment['status_code'], $payment['content'], $payment['message']]], 500);
            }

            $rifaPayDetails->pixId = $payment->id;
            $rifaPayDetails->qrCode = $payment->point_of_interaction->transaction_data->qr_code;
            $rifaPayDetails->qrCodeBase64 = $payment->point_of_interaction->transaction_data->qr_code_base64;

            RifaPay::addPix($rifaPay->id, $rifaPayDetails->pixId, $rifaPayDetails->qrCode,$rifaPayDetails->qrCodeBase64);

             return response()->json(["success" => true, "data" => $rifaPayDetails], 200);
        } catch (Exception $e) {
            return response()->json(["success" => false, "msg" => $e->getMessage()], 500);
        }
    }





        public function getCompra($id) {
            try {
                $buy = RifaPay::getOneCompra($id);
                if (!$buy) {
                    return response()->json(["success" => false, "msg" => "Pedido não encontrado"], $this->notFound);
                }
                return response()->json(["success" => true, "data"=> $buy], $this->success);
            } catch (Exception $e) {
                return response()->json(["success" => false, "msg" => $e->getMessage()], $this->serverError);
            }
        }
    public function getCompraClient($id) {
        try {
            $buy = RifaPay::getAllCompraClient($id);
            // if (!$buy) {
            //     return response()->json(["success" => false, "msg" => "Pedidos não encontrado"], $this->notFound);
            // }
            return response()->json(["success" => true, "data"=> $buy], $this->success);
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

    public function getAllWinners() {
        try {
            $winners = RifaWinner::getAllWinners();

            if(!$winners) {
                return response()->json(["success" => false, "msg" => "Ganhadores não encontrado"], 404);
            }
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
