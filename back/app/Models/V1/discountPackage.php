<?php

namespace App\Models\V1;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

use App\Models\V1\{Rifas};

class DiscountPackage extends Model
{
    use HasFactory;


    protected $fillable = [ 'qntd_number', 'price_packet', 'rifas_id' ];

    public function rifa(): BelongsTo {
        return $this->belongsTo(Rifas::class);
    }

    public static function createDiscountPackage($qntd_number, $price, $rifa_id) {
        $result  = self::updateOrCreate(
            [
                'qntd_number' => $qntd_number,
                'price_packet' => $price,
                'rifas_id' => $rifa_id,

            ]);

            return $result ? true : false;
    }
}
