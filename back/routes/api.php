<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\V1\AuthController;
use App\Http\Controllers\V1\MercadoPagoController;
use App\Http\Controllers\V1\RifasController;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use App\Http\Controllers\V1\PixController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get(
    '/user',

    function (Request $request) {
        return $request->user();
    }
);

// Route::get("/", function () {
//     User::create([
//         "name" => "admin",
//         "email" => "testing@gmail.com",
//         "password" => Hash::make("testing0000"),
//     ]);
// });

Route::post("/v1/mercado-pago-payments", [MercadoPagoController::class, 'index'])->middleware(['validateMercadoPagoSignature']);

Route::post("/v1/pix", [PixController::class, "index"]);


Route::group(["prefix" => "v1", "middleware" => ["cors"]], function () {
    Route::group(["controller" => AuthController::class], function () {
        Route::post("login", "login");
    });

    Route::group(["prefix" => "rifas", "controller" => RifasController::class, "middleware" => "auth:sanctum"], function () {
        Route::get("/", "index");
        Route::get("/{id}", "show");
        Route::get("/latest", "latest");
        Route::post("/", "store");
        Route::match(["put", "patch", "post"], "/{id}", "update");
        Route::delete("/{id}", "destroy");
    });

    Route::group(["prefix" => "public-rifas", "controller" => RifasController::class,], function () {
        Route::get("/latest", "latest");
    });
});
