<?php

namespace App\Models\V1;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\{BelongsTo, hasOne};

use App\Models\V1\{Rifas, Clients, RifaNumber};
class RifaPay extends Model
{
    use HasFactory;
    protected $fillable = ['status', 'verify', 'value', 'qntd_number', 'pix_id', 'qr_code', 'qr_code_base64', 'cod', 'checkout','rifas_id', 'client_id'];

    public function rifaNumber(): hasOne {
        return $this->hasOne(RifaNumber::class, 'pay_id', 'id');
    }
    public function rifa(): BelongsTo {
        return $this->belongsTo(Rifas::class, 'rifas_id', 'id');
    }
    public function client(): BelongsTo {
        return $this->belongsTo(Clients::class);
    }


    public static function addNumeroClient($qntdNumero, $client , $rifasId) {
        $cod = self::generateUniqueNumericCode();
        $checkout = self::generateUniqueAlphanumericCode(12);

        $payId = self::create([
            'value' => 0,
            'qntd_number' => $qntdNumero,
            'status' => 1,
            'verify' => 0,
            'cod' => $cod,
            'checkout' => $checkout,
            'rifas_id' => $rifasId,
            'client_id' => $client,
        ]);

        return $payId ?? false;
    }
    public static function addPix($paymentId, $pixId, $qrCode, $qrCodeBase64) {
        $payId = self::where('id', $paymentId)->update([
            'pix_id' => $pixId,
            'qr_code' => $qrCode,
            'qr_code_base64' => $qrCodeBase64
        ]);

        return $payId ?? false;
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
        return self::with(['rifaNumber', 'rifa.rifaPayment', 'rifa.rifaImage', 'rifa.rifaOthers'])->where('id', $id)->first();
    }
    public static function getAllCompraClient($id) {
        return self::with(['rifaNumber', 'rifa.rifaPayment', 'rifa.rifaImage'])->where('client_id', $id)->orderByDesc('id')->paginate(20);
    }
    public static function getAllCompraActiveClientByRifa($idRifa, $idClient) {
        return self::with(['rifaNumber', 'rifa.rifaPayment', 'rifa.cota', 'client'])->where('rifas_id', $idRifa)->where('client_id', $idClient)->where('status', 1)->get();
    }
    public static function getOneCompraClientByRifa($idRifa, $idClient) {
        return self::with(['rifaNumber', 'rifa.rifaPayment', 'rifa.cota'])->where('rifas_id', $idRifa)->where('client_id', $idClient)->first();
    }
    public static function getAllCompra() {
        return self::with(['rifaNumber', 'rifa.rifaPayment', 'rifa.cota', 'client'])->latest()->paginate(20);
    }
    public static function getPedidosFiltro($filters = []) {
        $query = self::with(['rifaNumber', 'rifa.rifaPayment', 'rifa.cota', 'client']);

        if (isset($filters['startDate']) && isset($filters['endDate'])) {
            $query->whereBetween('created_at', [$filters['startDate'], $filters['endDate']]);
        }

        if (isset($filters['id'])) {
            $query->where('id', $filters['id']);
        }

        if (isset($filters['client_id'])) {
            $query->where('client_id', $filters['client_id']);
        }

        if (isset($filters['status'])) {
            $query->where('status', $filters['status']);
        }

        if (isset($filters['rifas_id'])) {
            $query->where('rifas_id', $filters['rifas_id']);
        }

        if (isset($filters['qntd_number'])) {
            $query->where('qntd_number',  $filters['qntd_number']);
        }

        // Filtro para qntd_number com valores opcionais
        if (isset($filters['qntd_number_start'])) {
            $query->where('qntd_number', '>=', $filters['qntd_number_start']);
        }
        if (isset($filters['qntd_number_end'])) {
            $query->where('qntd_number', '<=', $filters['qntd_number_end']);
        }

        if (isset($filters['name'])) {
            $name = $filters['name'];
            $nameParts = explode(' ', $name);

            $query->whereHas('client', function ($q) use ($nameParts) {
                if (count($nameParts) > 1) {
                    $q->where('name', 'like', '%' . $nameParts[0] . '%')
                      ->where('surname', 'like', '%' . $nameParts[1] . '%');
                } else {
                    $q->where('name', 'like', '%' . $nameParts[0] . '%')
                      ->orWhere('surname', 'like', '%' . $nameParts[0] . '%');
                }
            });
        }


        // Filtro para value com valores opcionais
        if (isset($filters['value_start'])) {
            $query->where('value', '>=', $filters['value_start']);
        }
        if (isset($filters['value_end'])) {
            $query->where('value', '<=', $filters['value_end']);
        }

        if (isset($filters['pix_id'])) {
            $query->where('pix_id', $filters['pix_id']);
        }


        if (isset($filters['ordem']) && $filters['ordem'] == 'valor_menor') {
            $query->orderBy('value', 'asc'); // Ordena de forma crescente
        }

        if (isset($filters['ordem']) && $filters['ordem'] == 'valor_maior') {
            $query->orderBy('value', 'desc'); // Ordena de forma decrescente
        }

        if (isset($filters['ordem']) && $filters['ordem'] == 'qntd_menor') {
            $query->orderBy('qntd_number', 'asc'); // Ordena de forma crescente
        }

        if (isset($filters['ordem']) && $filters['ordem'] == 'qntd_maior') {
            $query->orderBy('qntd_number', 'desc'); // Ordena de forma decrescente
        }


        return $query->get();
    }


    public static function getAllCompraAtivo() {
        return self::with(['rifaNumber', 'rifa.rifaPayment', 'rifa.cota', 'client'])->where('status', 1)->latest()->get();
    }
    public static function getAllCompraAguardando() {
        return self::with(['rifaNumber', 'rifa.rifaPayment', 'rifa.cota', 'client'])->where('status', 0)->latest()->get();
    }
    public static function cancelarCompra($id) {
        return self::where('id', $id)->update(['status' => 2]);
    }
    public static function aprovarCompra($id) {
        return self::where('id', $id)->update(['status' => 1]);
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
