<?php

namespace App\Http\Controllers\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

use App\Models\User;
use App\Http\Requests\V1\{UserRequest};




class AdminController extends Controller
{
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

    public function me(Request $request) {
        return response()->json($request->user());
    }
}
