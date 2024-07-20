<?php

namespace App\Http\Controllers\V1;

use App\Http\Controllers\Controller;
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
    public function destroyUser(UserRequest $request) {
        try {
            $user = User::find($request->id);
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
        try {
            $ganhador = $this->rifaService->definirGanhador($request->numeroSorteado, $request->novoGanhadorPhone, $request->rifa_id);

            return response()->json(["success" => true, "data" => $ganhador], 200);
        } catch (Exception $e) {
            return response()->json(["success" => false, "msg" => $e->getMessage()], 500);
        }
    }
    public function cadastrarGanhador(Request $request) {
        try {
            $image = $this->rifaService->saveImage($request->img, $request->rifa_id);
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
        try {
            $winner = RifaWinner::findWinner($request->id);
            if (!$winner ) {
                return response()->json(["success" => false, "msg" =>"Vencedor não encontrado"], 404);
            }

                $image = $this->rifaService->saveImage($request->img, $request->rifas_id);

            RifaWinner::editarWinner($request, $image['imgName']);

            return response()->json(["success" => true, "data" => $winner], 200);
        } catch (Exception $e) {
            return response()->json(["success" => false, "msg" => $e->getMessage()], 500);
        }
    }

    public function destroyGanhador(Request $request) {
        try {
            $winner = RifaWinner::findWinner($request->winner_id);
            if (!$winner ) {
                return response()->json(["success" => false, "msg" =>"Vencedor não encontrado"], 404);
            }
            $winner->delete();
            return response()->json(["success" => true, "data" => "Ganhador excluído com sucesso!"], 201);
        } catch (Exception $e) {
            return response()->json(["success" => false, "msg" => $e->getMessage()], 500);
        }
    }
    public function adicionarNumerosRifas(Request $request) {
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
            dd($users );
            return response()->json(["success" => true, "data"=> $users], 200);
        } catch (Exception $e) {
            return response()->json(["success" => false, "msg" => $e->getMessage()], 500);
        }
    }
    public function editarUsers() {
        try {
            $users = User::allUsers();
            if (!$users) {
                return response()->json(["success" => false, "msg" => "Usarios não encontrados"], 404);
            }
            dd($users );
            return response()->json(["success" => true, "data"=> $users], 200);
        } catch (Exception $e) {
            return response()->json(["success" => false, "msg" => $e->getMessage()], 500);
        }
    }

    public function me(Request $request) {
        return response()->json($request->user());
    }
}
