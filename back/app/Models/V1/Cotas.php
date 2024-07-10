<?php

namespace App\Models\V1;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

use App\Models\V1\{Rifas};
class Cotas extends Model {
    use HasFactory;

    protected $table = 'cotas';

    protected $fillable = [
        'qntd_cota',
        'qntd_cota_min_order',
        'qntd_cota_max_order',
        'qntd_cota_max_client',
        'rifas_id',
    ];

    public function rifa(): BelongsTo {
        return $this->belongsTo(Rifas::class);
    }

    public static function cotaCreateOrUpdate($qntd_cota, $qntd_cota_digit, $qntd_cota_min_order, $qntd_cota_max_order, $qntd_cota_max_client, $rifaId, $cotaId) {
        $result  = self::updateOrCreate(
            ['id' => $cotaId],
            [
                'qntd_cota' => $qntd_cota,
                'qntd_cota_digit' => $qntd_cota_digit,
                'qntd_cota_min_order' => $qntd_cota_min_order,
                'qntd_cota_max_order' => $qntd_cota_max_order,
                'qntd_cota_max_client' => $qntd_cota_max_client,
                'rifas_id' => $rifaId,

            ]);

            return $result ? true : false;
    }
}
