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

    Route::group(['prefix' => 'client'], function () {
        Route::post("/cadastro", [AuthController::class, "register"])->name('client.register');
        Route::post("/login", [AuthController::class, "login"])->name('client.login');
        Route::get("/login", [AuthController::class, "logar"])->name('login');
        Route::middleware('auth.client')->post("/logout", [AuthController::class, "logout"])->name('client.logout');
        // Route::middleware('auth.client')->get("/protected", [AuthController::class, "someProtectedMethod"])->name('client.protected');

        Route::middleware('auth.client')->get("/checkout/pedido/{id}", [RifasController::class, "getCompra"])->where(['slug' => '[a-zA-Z0-9\-_]+', 'id' => '[0-9]+'])->name('checkout.pedido');

        Route::middleware('auth.client')->get("/pedidos/{id}", [RifasController::class, "getCompra"])->where(['slug' => '[a-zA-Z0-9\-_]+', 'id' => '[0-9]+'])->name('client.pedidos');
    });

    Route::group(['prefix' => 'admin'], function () {
        Route::post("/user/register", [AdminController::class, "storeUser"])->name('admin.create.user');
        Route::post("/user/login", [AdminController::class, "login"])->name('admin.login.user');
        Route::middleware('auth:sanctum')->post("/user/logout", [AdminController::class, "logout"])->name('admin.logout.user');

        Route::middleware(['auth:sanctum', 'checkAdmin:admin,superadmin'])->get("/dashboard/todas-rifas", [RifasController::class, "getAllRifasAdmin"])->name('admin.all.rifas');

        Route::middleware(['auth:sanctum', 'checkAdmin:admin,superadmin'])->post("/dashboard/rifas/cadastrar", [RifasController::class, "storeRifa"])->name('admin.create.rifa');
        Route::middleware(['auth:sanctum', 'checkAdmin:admin,superadmin'])->get("/dashboard/rifa/editar/{id}", [RifasController::class, "getOneRifa"])->name('admin.get.edit.rifa');
        Route::middleware(['auth:sanctum', 'checkAdmin:admin,superadmin'])->put("/dashboard/rifa/editar/{id}", [RifasController::class, "editRifa"])->name('admin.edit.rifa');

        Route::middleware(['auth:sanctum', 'checkAdmin:admin,superadmin'])->post("/dashboard/bilhete-premiado/cadastrar", [RifasController::class, "storeBilhetePremiado"])->name('admin.create.rifa.bilhete-premiado');
        Route::middleware(['auth:sanctum', 'checkAdmin:admin,superadmin'])->get("/dashboard/bilhete-premiado/editar/{id}", [RifasController::class, "getAllBilhetePremiado"])->name('admin.get.rifa.bilhete-premiado');
        Route::middleware(['auth:sanctum', 'checkAdmin:admin,superadmin'])->get("/dashboard/bilhete-premiado/editar/{id}", [RifasController::class, "getOneBilhetePremiado"])->name('admin.get.rifa.bilhete-premiado');
        Route::middleware(['auth:sanctum', 'checkAdmin:admin,superadmin'])->put("/dashboard/bilhete-premiado/editar", [RifasController::class, "editarBilhetePremiado"])->name('admin.get.rifa.bilhete-premiado');
        Route::middleware(['auth:sanctum', 'checkAdmin:admin,superadmin'])->delete("/dashboard/bilhete-premiado/delete/{id}/{rifaId}", [RifasController::class, "destroyBilhetePremiado"])->name('admin.delete.rifa.bilhete-premiado');

        Route::middleware(['auth:sanctum', 'checkAdmin:admin,superadmin'])->get("/dashboard/todos-pacotes/{id}", [RifasController::class, "getAllPacotes"])->name('admin.pacote');
        Route::middleware(['auth:sanctum', 'checkAdmin:admin,superadmin'])->get("/dashboard/pacote/{id}", [RifasController::class, "getOnePacotes"])->name('admin.pacote');
        Route::middleware(['auth:sanctum', 'checkAdmin:admin,superadmin'])->post("/dashboard/pacote/cadastrar", [RifasController::class, "storePacote"])->name('admin.create.rifa.pacote');
        Route::middleware(['auth:sanctum', 'checkAdmin:admin,superadmin'])->put("/dashboard/pacotes/editar", [RifasController::class, "editarPacote"])->name('admin.create.rifa.pacote');

        Route::middleware(['auth:sanctum', 'checkAdmin:admin,superadmin'])->get("/dashboard/imagens/", [RifasController::class, "storeImagem"])->name('admin.create.rifa.imagem');
        Route::middleware(['auth:sanctum', 'checkAdmin:admin,superadmin'])->post("/dashboard/imagens/", [RifasController::class, "storeImagem"])->name('admin.create.rifa.imagem');

        Route::middleware(['auth:sanctum', 'checkAdmin:admin,superadmin'])->post("/dashboard/upsell/cadastrar", [RifasController::class, "storeUpsell"])->name('admin.create.rifa.upsell');

        Route::middleware(['auth:sanctum', 'checkAdmin:admin,superadmin'])->put("/dashboard/rifa/finalizar/{id}", [RifasController::class, "finalizarRifa"])->name('admin.finalizar.rifa');

        Route::middleware(['auth:sanctum', 'checkAdmin:admin,superadmin'])->get("/me", [AdminController::class, "me"])->name('admin.me.user');
    });

    Route::group(['prefix' => 'produtos'], function () {
        Route::get("/", [RifasController::class, "allRifas"])->name('all.rifas');
        Route::get("/{slug}/{id}", [RifasController::class, "show"])->where(['slug' => '[a-zA-Z0-9\-_]+', 'id' => '[0-9]+'])->name('show.one.rifa');

        Route::post("/comprar-rifa", [RifasController::class, "buyRifa"])->name('buy.rifa');

    });

    Route::get("/index", [RifasController::class, "index"])->name('index');
    Route::get("/ganhadores", [RifasController::class, "winners"])->name('all.winners');
    Route::middleware(['auth:sanctum', 'checkAdmin:admin,superadmin'])->post("/define-ganhador", [RifasController::class, "defineWinners"])->name('define.winners');

    Route::group(["prefix" => "public-rifas"], function () {
        Route::get("/latest", [RifasController::class, "latest"]);
        Route::get("/latest-winner", [RifasController::class, "getLatestWinner"]);
    });

    Route::post("/get-numbers", [ClientController::class, "getNumbers"]);

    Route::get("/config", [SiteConfigController::class, "getUserSiteConfig"]);
    Route::post("/pix", [PixController::class, "index"]);
    Route::post("/pay-cota", [MercadoPagoController::class, "getQr"]);
    Route::post("/mercado-pago-payments", [MercadoPagoController::class, 'index']);
