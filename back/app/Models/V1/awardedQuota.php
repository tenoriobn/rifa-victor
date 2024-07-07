<?php

namespace App\Models\V1;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

use App\Models\V1\{Rifas};
class AwardedQuota extends Model
{
    use HasFactory;

    protected $fillable = [ 'qntd_cota', 'award',  'show_site',  'status',  'rifas_id' ];

    public function rifa(): BelongsTo {
        return $this->belongsTo(Rifas::class);
    }

    public static function createAwardedQuota($qntd_cota, $award, $show_site, $status, $rifa_id) {
        $result  = self::updateOrCreate(
            [
                'qntd_cota' => $qntd_cota,
                'award' => $award,
                'show_site' => $show_site,
                'status' => $status,
                'rifas_id' => $rifa_id,

            ]);

            return $result ? true : false;
    }
}
