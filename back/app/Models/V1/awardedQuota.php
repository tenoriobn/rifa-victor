<?php

namespace App\Models\V1;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Collection;

class AwardedQuota extends Model
{
    use HasFactory;

    protected $fillable = ['number_cota', 'award', 'show_site', 'status', 'rifas_id'];

    public function rifa(): BelongsTo {
        return $this->belongsTo(Rifas::class);
    }

    public static function createAwardedQuota($qntdCota, $award, $show_site, $status, $rifaId) {

        $rifa = Rifas::with(['cota'])->find($rifaId);
        $randomNumbers = self::makeRandomNumberBilhetePremiado($qntdCota, $rifa);

        $quotas = [];

        foreach ($randomNumbers as $number) {
            $quotas[] = [
                'number_cota' => $number,
                'award' => $award,
                'show_site' => $show_site,
                'status' => $status,
                'rifas_id' => $rifaId,
                'created_at' => now(),
                'updated_at' => now()
            ];
        }

        $result = self::insert($quotas);

        return $result ? true : false;
    }
    public static function updateAwardedQuota($date) {

        $result = self::where('id', $date->id)->update([
            'award' => $date->award,
            'show_site' => $date->show_site,
            'status' => $date->status,
        ]);

        return $result ? true : false;
    }

    public static function getAllBilhetePremiado($rifaId) {
        return self::where('rifas_id', $rifaId)->get();
    }
    public static function getOneBilhetePremiado($rifaId) {
        return self::where('rifas_id', $rifaId)->first();
    }

    public static function winnerBilhetePremiado($numbers, $clientId, $rifaId) {
        $ganhador = self::whereIn('number_cota', $numbers)->where('rifas_id', $rifaId)->update([
            'status' => 'resgatada',
            'client_id' => $clientId
        ]);
        // dd($numbers, $clientId);
    }

    private static function makeRandomNumberBilhetePremiado($qntdCota, $rifa) {
        $maxNumbers = $rifa->cota->qntd_cota;

        $generatedNumbers = [];

        while (count($generatedNumbers) < $qntdCota) {
            $randomNumber = rand(1, $maxNumbers);
            if (!self::numberExists($randomNumber, $rifa->id) && !in_array($randomNumber, $generatedNumbers)) {
                $generatedNumbers[] = $randomNumber;
            }
        }

        return $generatedNumbers;
    }

    private static function numberExists($number, $rifaId) {
        return self::where('number_cota', $number)->where('rifas_id', $rifaId)->exists();
    }


}
