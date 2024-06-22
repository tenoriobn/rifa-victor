<?php

namespace App\Services;

use App\Models\V1\Clients;
use Illuminate\Support\Facades\Auth;

class ClientAuthService
{
    // Em ClientAuthService.php
public function attempt($cellphone)
{
    $client = Clients::where('cellphone', $cellphone)->first();

    if (!$client) {
        return false;
    }

    // Verifique se o login está sendo chamado corretamente
    $loginResult = Auth::guard('clients')->login($client);
    dd(Auth::guard('clients'), Auth::guard('clients')->login($client)); // Verifique o resultado do login

    return true;
}


    public function check()
    {
        return Auth::guard('clients')->check();
    }

    public function logout()
    {
        Auth::guard('clients')->logout();
    }
}
