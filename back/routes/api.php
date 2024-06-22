<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\V1\AuthController;
use App\Http\Controllers\V1\ClientController;
use App\Http\Controllers\V1\MercadoPagoController;
use App\Http\Controllers\V1\RifasController;
use App\Http\Controllers\V1\PixController;
use App\Http\Controllers\V1\SiteConfigController;

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
// Route::group(["prefix" => "v1", "middleware" => ["cors"]], function () {
    Route::group(["controller" => AuthController::class], function () {
        Route::post("/cadastro", "register");
        Route::post("/login", "login");
        Route::middleware('auth.client')->post('logout', 'logout');
        Route::middleware('auth.client')->get('protected-route', 'someProtectedMethod');
    });


    Route::group(["prefix" => "rifas", "controller" => RifasController::class, "middleware" => "auth:sanctum"], function () {
        Route::post('/define-winner', 'defineWinner');
        Route::post('/search-order', 'searchOrder');
        Route::get("/", "index")->name('login');
        Route::get("/{id}", "show");
        Route::get("/latest", "latest");
        Route::post("/", "store");
        Route::match(["put", "patch", "post"], "/{id}", "update");
        Route::delete("/{id}", "destroy");
        Route::get('/orders/{id}', 'orders');
    });

    Route::group(["prefix" => "public-rifas", "controller" => RifasController::class,], function () {
        Route::get("/latest", "latest");
        Route::get("/latest-winner", "getLatestWinner");
    });

    Route::group(["prefix" => "site-config", "controller" => SiteConfigController::class, "middleware" => "auth:sanctum"], function () {
        Route::get("/", "index");
        Route::post("/", "store");
    });
    Route::post("/get-numbers", [ClientController::class, "getNumbers"]);

    Route::get("/config", [SiteConfigController::class, "getUserSiteConfig"]);
    Route::post("/pix", [PixController::class, "index"]);
    Route::post("/pay-cota", [MercadoPagoController::class, "getQr"]);
    Route::post("/mercado-pago-payments", [MercadoPagoController::class, 'index']);
// });

