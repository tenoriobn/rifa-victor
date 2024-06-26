<?php

namespace App\Models\V1;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

use App\Models\V1\{Rifas};
class RifasAwarded extends Model {
    protected $fillable = [
        'cotas_double',
        'text_cotas_double',
        'title_cotas_awarded',
        'description_cotas_awarded',
        'title_upsell',
        'description_upsell',
        'rifas_id',
    ];

    use HasFactory;

    public function rifa(): BelongsTo {
        return $this->belongsTo(Rifas::class);
    }

    public static function rifasAwardedCreateOrUpdate($cotas_double, $text_cotas_double, $title_cotas_awarded, $description_cotas_awarded, $title_upsell, $description_upsell,$rifa_id, $rifas_awarded_id) {
        $result  = self::updateOrCreate(
            ['id' => $rifas_awarded_id],
            [
                'cotas_double' => $cotas_double,
                'text_cotas_double' => $text_cotas_double,
                'title_cotas_awarded' => $title_cotas_awarded,
                'description_cotas_awarded' => $description_cotas_awarded,
                'title_upsell' => $title_upsell,
                'description_upsell' => $description_upsell,
                'rifas_id' => $rifa_id,

            ]);

            return $result ? true : false;

    }
}
