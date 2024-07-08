<?php

namespace App\Models\V1;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

use App\Models\V1\{Rifas};

class DiscountPackage extends Model
{
    use HasFactory;


    protected $fillable = [ 'qntd_cota', 'value_cota', 'valor_total', 'popular', 'status', 'cod_promo', 'rifas_id' ];

    public function rifa(): BelongsTo {
        return $this->belongsTo(Rifas::class);
    }

    public static function createDiscountPackage($qntdCota, $valueCota, $valorTotal, $popular, $codPromo, $rifaId) {
        $result  = self::updateOrCreate(
            [
                'qntd_cota' => $qntdCota,
                'value_cota' => $valueCota,
                'valor_total' => $valorTotal,
                'popular' => $popular,
                'status' => 'ativo',
                'cod_promo' => $codPromo,
                'rifas_id' => $rifaId,

            ]);

            return $result ? true : false;
    }
}
