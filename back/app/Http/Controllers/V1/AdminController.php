<?php

namespace App\Http\Controllers\V1;

use App\Http\Controllers\Controller;
use App\Models\V1\Clients;
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

    public function procurarGanhador(Request $request) {
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
    public function definirGanhador(Request $request) {
        try {
            $ganhador = $this->rifaService->definirGanhador($request->numeroSorteado, $request->novoGanhadorPhone, $request->rifa_id);
            dd($ganhador );
            return response()->json(["success" => true, "data" => $ganhador], 200);
        } catch (Exception $e) {
            return response()->json(["success" => false, "msg" => $e->getMessage()], 500);
        }
    }

    public function me(Request $request) {
        return response()->json($request->user());
    }
}
