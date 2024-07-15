<?php

namespace App\Services;

use Carbon\Carbon;
use Illuminate\Support\Str;
use Auth;
class FuncaoService
{
    function convertToDecimal($price) {


        $price = preg_replace('/[^\d,]/', '', $price);
        $price = str_replace(',', '.', $price);

        return floatval($price);
    }




}
