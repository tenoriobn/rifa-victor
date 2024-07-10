<?php

namespace App\Models\V1;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

use App\Models\V1\{Rifas};
class RifasPayment extends Model {
    use HasFactory;

    protected $fillable = [
        'time_pay',
        'gateway',
        'service_charge',
        'text_service_charge',
        'rifas_id',
    ];

    public function rifa(): BelongsTo {
        return $this->belongsTo(Rifas::class);
    }

    public static function rifasPaymentCreateOrUpdate($time_pay, $gateway, $service_charge, $text_service_charge, $rifaId, $rifaPaymentId) {
        $result  = self::updateOrCreate(
            ['id' => $rifaPaymentId],
            [
                'time_pay' => $time_pay,
                'gateway' => $gateway,
                'service_charge' => $service_charge,
                'text_service_charge' => $text_service_charge,
                'rifas_id' => $rifaId,

            ]);

            return $result ? true : false;
    }
}
