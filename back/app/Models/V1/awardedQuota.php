<?php

namespace App\Models\V1;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

use App\Models\V1\{Rifas};
class awardedQuota extends Model
{
    use HasFactory;

    protected $fillable = [ 'package_awarded_number', 'rifas_id' ];

    public function rifa(): BelongsTo {
        return $this->belongsTo(Rifas::class);
    }

    public static function createAwardedQuota($package_awarded_number, $rifa_id) {
        $package_awarded_number_json = json_encode($package_awarded_number);
        $result  = self::updateOrCreate(
            [
                'package_awarded_number' => $package_awarded_number_json,
                'rifas_id' => $rifa_id,

            ]);

            return $result ? true : false;
    }
}
