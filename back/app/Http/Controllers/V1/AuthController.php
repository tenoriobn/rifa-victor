<?php

namespace App\Http\Controllers\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\V1\LoginRequest;
use \Exception;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\V1\UserResource;

class AuthController extends Controller
{

    protected $postSuccess = 201;
    protected $serverError = 500;


    public function login(LoginRequest $request)
    {
        try {

            $userPassword = $request->get("password");
            $userEmail = $request->get("email");

            if (!Auth::attempt(["email" => $userEmail, "password" => $userPassword])) {
                throw new Exception("Invalid User");
            }

            $adminUser = Auth::user();

            $token = $adminUser->createToken("admin", ["view", "create", "update", "delete"])->plainTextToken;

            return response()->json(["success" => true, "data" => ["adminUser" => new UserResource($adminUser), "token" => $token]], $this->postSuccess);
        } catch (Exception $e) {
            return response()->json(["success" => false, "msg" => $e->getMessage()], $this->serverError);
        }
    }
}
