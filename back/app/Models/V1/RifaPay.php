<?php

namespace App\Models\V1;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\{BelongsTo, hasOne};

use App\Models\V1\{Rifas, Clients, RifaNumber};
class RifaPay extends Model
{
    use HasFactory;
    protected $fillable = ['status', 'verify', 'value', 'qntd_number', 'cod', 'checkout','rifas_id', 'client_id'];

    public function rifaNumber(): hasOne {
        return $this->hasOne(RifaNumber::class, 'pay_id', 'id');
    }
    public function rifa(): BelongsTo {
        return $this->belongsTo(Rifas::class);
    }
    public function client(): BelongsTo {
        return $this->belongsTo(Clients::class);
    }


    public static function applyRifa($date) {
        $cod = self::generateUniqueNumericCode();
        $checkout = self::generateUniqueAlphanumericCode(12);

        $payId = self::create([
            'value' => $date->value,
            'qntd_number' => $date->qntd_number,
            'cod' => $cod,
            'checkout' => $checkout,
            'rifas_id' => $date->rifas_id,
            'client_id' => $date->client_id,
        ]);

        return $payId ?? false;
    }

    public static function getOneCompra($id) {
        return self::with(['rifaNumber'])->where('id', $id)->first();
    }
    public static function getAllCompraClient($id) {
        return self::where('client_id', $id)->get();
    }

    private static function generateUniqueNumericCode() {
        do {
            $code = rand(100000, 999999);
        } while (self::where('cod', $code)->exists());

        return $code;
    }

    private static function generateUniqueAlphanumericCode($length) {
        do {
            $code = substr(str_shuffle(str_repeat('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', ceil($length / 62))), 1, $length);
        } while (self::where('checkout', $code)->exists());

        return $code;
    }
}
