<?php

namespace App\Http\Controllers\V1;

use App\Http\Controllers\Controller;
use App\Models\PaymentInfo;
use App\Models\SiteSetting;
use App\Models\V1\{Clients, Rifas, RifaWinner, RifaPay};
use App\Models\V1\RifaNumber;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

use App\Models\User;
use App\Http\Requests\V1\{UserRequest};

use App\Services\RifaService;


class AdminController extends Controller
{

    protected $rifaService;

    public function __construct(RifaService $rifaService)
    {
        $this->rifaService = $rifaService;
    }
    public function storeUser(UserRequest $request) {
        try {
            $user = User::createUser($request->validated());
            return response()->json(['response' => 'Usuário criado com sucesso', 'user' => $user], 201);
        } catch (\Throwable $e) {
            return response()->json(['response' => 'Ocorreu um erro interno', 'error' => $e->getMessage()], 500);
        }
    }
    public function destroyUser($id) {
        $this->authorize('create', User::class);
        try {
            $user = User::find($id);
            if (!$user ) {
                return response()->json(["success" => false, "msg" =>"Usuario não encontrado"], 404);
            }
            $user->delete();
            return response()->json(['response' => 'Usuário deletado com sucesso'], 201);
        } catch (\Throwable $e) {
            return response()->json(['response' => 'Ocorreu um erro interno', 'error' => $e->getMessage()], 500);
        }
    }

    public function login(Request $request) {
        try {
            $credentials = $request->only('email', 'password');

            if (Auth::attempt($credentials)) {
                $user = Auth::user();
                $token = $user->createToken('auth_token')->plainTextToken;
                return response()->json(['response' => 'Login efetuado com sucesso', 'token' => $token, 'user' => $user], 200);
            }

            return response()->json(['response' => 'Login inválido'], 401);
        } catch (\Throwable $e) {
            return response()->json(['response' => 'Ocorreu um erro interno', 'error' => $e->getMessage()], 500);
        }
    }

    public function logout(Request $request) {
        try {
            $request->user()->currentAccessToken()->delete();
            return response()->json(['response' => 'Logout efetuado com sucesso'], 200);
        } catch (\Throwable $e) {
            return response()->json(['response' => 'Ocorreu um erro interno', 'error' => $e->getMessage()], 500);
        }
    }

    public function procurarGanhadorPeloNumero(Request $request) {
        $this->authorize('view', User::class);
        try {
            $ganhador = $this->rifaService->procurarGanhador($request->numeroWinner, $request->rifa_id);

            if (!$ganhador) {
                return response()->json(["success" => false, "msg" => 'Ganhador não encontrado'], 404);
            }

            return response()->json(["success" => true, "data" => $ganhador], 200);
        } catch (Exception $e) {
            return response()->json(["success" => false, "msg" => $e->getMessage()], 500);
        }
    }

    public function procurarClientCellphone(Request $request) {
        $this->authorize('view', User::class);
        try {

            $client = Clients::findClient($request->cellphone);

            if (!$client) {
                return response()->json(["success" => false, "msg" => 'Usuário não encontrado'], 404);
            }

            return response()->json(["success" => true, "data" => $client], 200);
        } catch (Exception $e) {
            return response()->json(["success" => false, "msg" => $e->getMessage()], 500);
        }
    }
    public function definirGanhador(Request $request) {
         $this->authorize('create', User::class);
        try {
            $ganhador = $this->rifaService->definirGanhador($request->numeroSorteado, $request->novoGanhadorPhone, $request->rifa_id);

            return response()->json(["success" => true, "data" => $ganhador], 200);
        } catch (Exception $e) {
            return response()->json(["success" => false, "msg" => $e->getMessage()], 500);
        }
    }
    public function cadastrarGanhador(Request $request) {
        $this->authorize('create', User::class);
        try {
            $image = $this->rifaService->saveImage($request->img, $request->rifas_id);
            $client = Clients::findClient( $request->cellphone);
            if (!$client ) {
                return response()->json(["success" => false, "msg" =>"Cliente não encontrado"], 404);
            }
            $winnerId = RifaWinner::defineWinner($request, $client->id, $image['imgName']);
            $winner = RifaWinner::findWinner($winnerId->id);

            return response()->json(["success" => true, "data" => $winner], 200);
        } catch (Exception $e) {
            return response()->json(["success" => false, "msg" => $e->getMessage()], 500);
        }
    }
    public function getOneGanhador($id) {
        $this->authorize('view', User::class);
        try {
            $winner = RifaWinner::findWinner($id);
            if (!$winner ) {
                return response()->json(["success" => false, "msg" =>"Vencedor não encontrado"], 404);
            }

            return response()->json(["success" => true, "data" => $winner], 200);
        } catch (Exception $e) {
            return response()->json(["success" => false, "msg" => $e->getMessage()], 500);
        }
    }
    public function editarGanhador(Request $request) {
        $this->authorize('update', User::class);
        try {
            $winner = RifaWinner::findWinner($request->id);
            if (!$winner ) {
                return response()->json(["success" => false, "msg" =>"Vencedor não encontrado"], 404);
            }

            // $tel = $request->cellphone ?? $request->client->cellphone;
            $client = Clients::findClient($request->cellphone);
            if (!$client ) {
                return response()->json(["success" => false, "msg" =>"Cliente não encontrado"], 404);
            }

            $isImg = preg_match('#^data:image/(?<type>.+);base64,#', $request->img);
            if($isImg) {
                $image = $this->rifaService->saveImage($request->img, $request->rifas_id);
                RifaWinner::editarWinner($request, $client->id, $image['imgName']);
            } else {
                RifaWinner::editarWinner($request, $client->id, $request->img);
            }


            $winners = RifaWinner::getAllWinners();
            return response()->json(["success" => true, "data" => $winners], 200);
        } catch (Exception $e) {
            return response()->json(["success" => false, "msg" => $e->getMessage()], 500);
        }
    }

    public function destroyGanhador($id) {
        $this->authorize('delete', User::class);
        try {
            $winner = RifaWinner::findWinner($id);
            if (!$winner ) {
                return response()->json(["success" => false, "msg" =>"Vencedor não encontrado"], 404);
            }
            $winner->delete();
            $winners = RifaWinner::getAllWinners();
            return response()->json(["success" => true, "msg" => "Ganhador excluído com sucesso!", "data" =>$winners], 201);
        } catch (Exception $e) {
            return response()->json(["success" => false, "msg" => $e->getMessage()], 500);
        }
    }
    public function adicionarNumerosRifas(Request $request) {
        $this->authorize('create', User::class);
        try {
            $client = $this->rifaService->adicionarNumerosRifasClient($request->cellphone, $request->qntd_number, $request->rifa_id);

            if(!$client['success']) {
                return response()->json(["success" => true, "msg" => $client['msg']], 404);
            }

            return response()->json(["success" => true, "msg" => "Número Adicionado com sucesso"], 201);
        } catch (Exception $e) {
            return response()->json(["success" => false, "msg" => $e->getMessage()], 500);
        }
    }
    public function adicionarBilhetePremiado(Request $request) {
        $this->authorize('create', User::class);
        try {
            $client = $this->rifaService->addBilhetePremiado($request->cellphone, $request->numero_premiado, $request->rifa_id);

            if(!$client['success']) {
                return response()->json(["success" => true, "msg" => $client['msg']], 404);
            }

            return response()->json(["success" => true, "msg" => "Bilhete premiado adicionado com sucesso"], 201);
        } catch (Exception $e) {
            return response()->json(["success" => false, "msg" => $e->getMessage()], 500);
        }
    }
    public function rifaAtivas() {
        try {
            $rifas = Rifas::getAllRifasActivas();

            if(!$rifas) {
                return response()->json(["success" => true, "msg" => 'rifas não encontradas'], 404);
            }

            return response()->json(["success" => true, "data" => $rifas], 200);
        } catch (Exception $e) {
            return response()->json(["success" => false, "msg" => $e->getMessage()], 500);
        }
    }

    public function getPedidos() {
        try {
            $buy = RifaPay::getAllCompra();
            if (!$buy) {
                return response()->json(["success" => false, "msg" => "Pedido não encontrado"], 404);
            }
            return response()->json(["success" => true, "data"=> $buy], 200);
        } catch (Exception $e) {
            return response()->json(["success" => false, "msg" => $e->getMessage()], 500);
        }
    }
    public function getOnePedidos($idRifa, $idClient) {
        try {
            $buy = RifaPay::getOneCompraClientByRifa($idRifa, $idClient);
            if (!$buy) {
                return response()->json(["success" => false, "msg" => "Pedido não encontrado"], 404);
            }
            return response()->json(["success" => true, "data"=> $buy], 200);
        } catch (Exception $e) {
            return response()->json(["success" => false, "msg" => $e->getMessage()], 500);
        }
    }
    public function cancelarPedidos($id) {
        try {
            $buy = RifaPay::cancelarCompra($id);
            RifaNumber::cancelarCompra($id);
            if (!$buy) {
                return response()->json(["success" => false, "msg" => "Pedido não encontrado"], 404);
            }
            return response()->json(["success" => true, "data"=> "Compra cancelada"], 200);
        } catch (Exception $e) {
            return response()->json(["success" => false, "msg" => $e->getMessage()], 500);
        }
    }

    public function allClients() {
        try {
            $clientes = Clients::getAllClient();
            if (!$clientes) {
                return response()->json(["success" => false, "msg" => "Pedido não encontrado"], 404);
            }
            return response()->json(["success" => true, "data"=> $clientes], 200);
        } catch (Exception $e) {
            return response()->json(["success" => false, "msg" => $e->getMessage()], 500);
        }
    }
    public function getOneClient($id) {
        try {
            $clientes = Clients::findClientById($id);
            if (!$clientes) {
                return response()->json(["success" => false, "msg" => "Pedido não encontrado"], 404);
            }
            return response()->json(["success" => true, "data"=> $clientes], 200);
        } catch (Exception $e) {
            return response()->json(["success" => false, "msg" => $e->getMessage()], 500);
        }
    }
    public function editarClients(Request $request) {
        try {
            $cliente = Clients::editarClient($request);
            if (!$cliente) {
                return response()->json(["success" => false, "msg" => "Cliente não atualizado"], 404);
            }
            return response()->json(["success" => true, "data"=> $cliente], 200);
        } catch (Exception $e) {
            return response()->json(["success" => false, "msg" => $e->getMessage()], 500);
        }
    }
    public function rankingGeral() {
        try {
            $ranking = RifaNumber::getRankingRifaGeral();
            if (!$ranking) {
                return response()->json(["success" => false, "msg" => "Ranking não atualizado"], 404);
            }

            return response()->json(["success" => true, "data"=> $ranking], 200);
        } catch (Exception $e) {
            return response()->json(["success" => false, "msg" => $e->getMessage()], 500);
        }
    }
    public function getAllUsers() {
        try {
            $users = User::allUsers();
            if (!$users) {
                return response()->json(["success" => false, "msg" => "Usarios não encontrados"], 404);
            }

            return response()->json(["success" => true, "data"=> $users], 200);
        } catch (Exception $e) {
            return response()->json(["success" => false, "msg" => $e->getMessage()], 500);
        }
    }
    public function getOneUser($id) {
        try {
            $user = User::getOneUser($id);
            if (!$user) {
                return response()->json(["success" => false, "msg" => "Usarios não encontrados"], 404);
            }

            return response()->json(["success" => true, "data"=> $user], 200);
        } catch (Exception $e) {
            return response()->json(["success" => false, "msg" => $e->getMessage()], 500);
        }
    }
    public function editarUsers(Request $request) {
        try {
            $validatedData = $request->validate([
                'id' => 'required|integer|exists:users,id',
                'name' => 'sometimes|string|max:191',
                'cpf' => 'sometimes|nullable|max:191',
                'cellphone' => 'sometimes|nullable|max:191',
                'role' => 'sometimes|nullable|string|max:191',
                'email' => 'sometimes|email|max:191',
            ]);

            $user = User::getOneUser($request->id);
            if (!$user) {
                return response()->json(["success" => false, "msg" => "Usuário não encontrado"], 404);
            }

            $user->update($validatedData);

            return response()->json(["success" => true, "data"=> "Usuário editado com sucesso"], 200);
        } catch (Exception $e) {
            return response()->json(["success" => false, "msg" => $e->getMessage()], 500);
        }
    }

    public function getAllGateway() {
        try {
            $paymentInfos = PaymentInfo::all();
            return response()->json(["success" => true, "data" => $paymentInfos], 200);
        } catch (Exception $e) {
            return response()->json(["success" => false, "msg" => $e->getMessage()], 500);
        }
    }
    public function showGateway($id) {
        try {
            $paymentInfo = PaymentInfo::findOrFail($id);
            return response()->json(["success" => true, "data" => $paymentInfo], 200);
        } catch (Exception $e) {
            return response()->json(["success" => false, "msg" => $e->getMessage()], 500);
        }
    }
    public function storeGateway(Request $request) {
        try {
            $data = $request->validate([
                'name' => 'sometimes|required|max:255',
                'gateway' => 'sometimes|required|max:255',
                'token' => 'sometimes|required|max:255',
                'public_key' => 'sometimes|required|max:255',
                'billing_name' => 'sometimes|required|max:255',
            ]);

            $paymentInfo = PaymentInfo::create($data);

            return response()->json(["success" => true, "data" => $paymentInfo], 201);
        } catch (Exception $e) {
            return response()->json(["success" => false, "msg" => $e->getMessage()], 500);
        }

    }
    public function updateGateway(Request $request) {
        try {
            $paymentInfo = PaymentInfo::findOrFail($request->id);

            $data = $request->validate([
                'name' => 'sometimes|required|max:255',
                'gateway' => 'sometimes|required|max:255',
                'token' => 'sometimes|required|max:255',
                'public_key' => 'sometimes|required|max:255',
                'billing_name' => 'sometimes|required|max:255',
            ]);

            $paymentInfo->update($data);

            return response()->json(["success" => true, "data" => $paymentInfo], 200);
        } catch (Exception $e) {
            return response()->json(["success" => false, "msg" => $e->getMessage()], 500);
        }

    }
    public function destroyGateway($id) {
        try {
            $paymentInfo = PaymentInfo::findOrFail($id);
            $paymentInfo->delete();

            return response()->json(["success" => true, "msg" => "Registro deletado com sucesso"], 200);
        } catch (Exception $e) {
            return response()->json(["success" => false, "msg" => $e->getMessage()], 500);
        }

    }

    public function getConfigSite() {
        try {
            $settings = SiteSetting::first();
            return response()->json(["success" => true, "data" => $settings], 200);
        } catch (Exception $e) {
            return response()->json(["success" => false, "msg" => $e->getMessage()], 500);
        }

    }

    public function storeConfigSite(Request $request)
    {
        try {
            $data = $request->all();

            if (isset($request->id)) {
                $config = SiteSetting::find($request->id);

                if (!$config) {
                    return response()->json(["success" => false, "msg" => "Configuração não encontrada"], 404);
                }

                $config->update($data);
                $setting = $config;
            } else {
                $setting = SiteSetting::create($data);
            }

            return response()->json(["success" => true, "data" => $setting], 201);
        } catch (Exception $e) {
            return response()->json(["success" => false, "msg" => $e->getMessage()], 500);
        }
    }




    public function me(Request $request) {
        return response()->json($request->user());
    }
}
