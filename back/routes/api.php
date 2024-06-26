<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\V1\{AuthController, AdminController, ClientController, MercadoPagoController, RifasController, PixController, SiteConfigController};


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

// Route::group(["prefix" => "v1", "middleware" => ["cors"]], function () {
    Route::post("/cadastro", [AuthController::class, "register"])->name('client.register');
    Route::post("/login", [AuthController::class, "login"])->name('client.login');
    Route::middleware('auth.client')->post("/logout", [AuthController::class, "logout"])->name('client.logout');
    Route::middleware('auth.client')->get("/protected", [AuthController::class, "someProtectedMethod"])->name('client.protected');

    Route::group(['prefix' => 'admin'], function () {
        Route::post("/cadastrar/rifas", [RifasController::class, "storeRifa"])->name('admin.create.rifa');
        Route::post("/cadastrar/usuario", [AdminController::class, "storeUser"])->name('admin.create.user');
        Route::post("/login", [AdminController::class, "login"])->name('admin.login.user');
        Route::middleware('auth:sanctum')->post("/logout", [AdminController::class, "logout"])->name('admin.logout.user');
        Route::middleware(['auth:sanctum', 'checkAdmin:admin,superadmin'])->get("/me", [AdminController::class, "me"])->name('admin.me.user');
    });
    Route::group(['prefix' => 'produtos'], function () {
        Route::get("/", [RifasController::class, "index"])->name('all.rifas');
        Route::get("/{slug}/{id}", [RifasController::class, "show"])->where(['slug' => '[a-zA-Z0-9\-_]+', 'id' => '[0-9]+'])->name('show.one.rifa');
        Route::middleware('auth.client')->post("/comprar-rifa", [RifasController::class, "buyRifa"])->name('buy.rifa');
    });

    Route::get("/ganhadores", [RifasController::class, "winners"])->name('all.winners');











    // Route::group(["prefix" => "rifas", "controller" => RifasController::class, "middleware" => "auth:sanctum"], function () {
    //     Route::post('/define-winner', 'defineWinner');
    //     Route::post('/search-order', 'searchOrder');
    //     Route::get("/", "index")->name('login');
    //     Route::get("/{id}", "show");
    //     Route::get("/latest", "latest");
    //     Route::post("/", "store");
    //     Route::match(["put", "patch", "post"], "/{id}", "update");
    //     Route::delete("/{id}", "destroy");
    //     Route::get('/orders/{id}', 'orders');
    // });

    Route::group(["prefix" => "public-rifas", "controller" => RifasController::class,], function () {
        Route::get("/latest", "latest");
        Route::get("/latest-winner", "getLatestWinner");
    });


    Route::post("/get-numbers", [ClientController::class, "getNumbers"]);

    Route::get("/config", [SiteConfigController::class, "getUserSiteConfig"]);
    Route::post("/pix", [PixController::class, "index"]);
    Route::post("/pay-cota", [MercadoPagoController::class, "getQr"]);
    Route::post("/mercado-pago-payments", [MercadoPagoController::class, 'index']);
// });

