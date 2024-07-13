<?php

namespace App\Models\V1;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\DB;

use App\Models\V1\{Rifas, Clients, RifaPay};
class RifaNumber extends Model {
    use HasFactory;

    protected $fillable = ['numbers', 'status', 'rifas_id', 'pay_id', 'client_id'];

    public function rifa(): BelongsTo {
        return $this->belongsTo(Rifas::class, 'rifas_id', 'id');
    }
    public function client(): BelongsTo {
        return $this->belongsTo(Clients::class);
    }
    public function rifaPay(): BelongsTo {
        return $this->belongsTo(RifaPay::class, 'pay_id', 'id');
    }


    public static function applyRifa($date, $rifaPayId) {
        $numbers = json_encode($date->numbers);
        self::create([
            'pay_id' => $rifaPayId->id,
            'rifas_id' => $date->rifas_id,
            'numbers' =>  $numbers ,
            'client_id' => $date->client_id,
        ]);
    }

    public static function getRanking() {
        $result = self::where('status', 1)
            ->select('client_id')
            ->selectRaw('SUM(JSON_LENGTH(numbers)) as total_numbers')
            ->with('client')
            ->groupBy('client_id')
            ->limit(6)
            ->get();

        return $result ?? false;
    }

    public static function cancelRifaNumber($ids) {
        return self::with(['rifa'])->whereIn('pay_id', $ids)
        ->update(['status' => 2]);
    }
    public static function makeRifaNumber($ids) {
        return self::with(['rifa'])->whereIn('pay_id', $ids)
        ->update(['status' => 1]);
    }


    public static function generateUniqueNumbers($payments) {
        foreach ($payments as $key => $payment) {

            $maxNumbers = $payment->rifa->cota->qntd_cota;
            $numToGenerate = $payment->rifaPay->qntd_number;

            $existingNumbers = self::where('rifas_id', ($payment->rifas_id))
            ->where('status', 1)
            ->pluck('numbers')
            ->toArray();

            $existingNumbers = array_merge(...array_map('json_decode', $existingNumbers));

            $generatedNumbers = [];

            while (count($generatedNumbers) < $numToGenerate) {
                $randomNumber = rand(1, $maxNumbers);
                if (!in_array($randomNumber, $existingNumbers) && !in_array($randomNumber, $generatedNumbers)) {
                    $generatedNumbers[] = $randomNumber;
                }
            }

            $payment->where('pay_id', $payment->pay_id)->update([
                'numbers' => json_encode($generatedNumbers),
                'status' => 1,
            ]);
        }


    }


}
