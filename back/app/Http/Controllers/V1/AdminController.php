<?php

namespace App\Http\Controllers\V1;

use App\Http\Controllers\Controller;
use App\Models\V1\{Clients, Rifas};
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
            $ganhador = $this->rifaService->definirGanhador($request->numeroSorteado, $request->novoGanhadorPhone, $request->rifa_id);

            return response()->json(["success" => true, "data" => $ganhador], 200);
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

    public function me(Request $request) {
        return response()->json($request->user());
    }
}
