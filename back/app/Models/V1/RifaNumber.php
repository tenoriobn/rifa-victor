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


    public static function lookingForNumber($number, $rifasId) {
        $ganhador = self::with(['client', 'rifa'])->where('status', 1)->whereJsonContains('numbers', $number)->where('rifas_id', $rifasId)->first();
        // dd($ganhador, $number, $rifasId);
        return $ganhador ?? false;
    }

    public static function getAllNumbersClient($id) {
        return self::where('client_id', $id)->where('status', 1)->get();
    }
    public static function countTotalNumber($id) {
       return  self::where('rifas_id', $id)->where('status', 1)->selectRaw('SUM(JSON_LENGTH(numbers)) as total')->first();
    }

    public static function applyRifa($rifaPay) {
        return DB::transaction(function() use ($rifaPay) {
            $numbers = self::generateUniqueNumbers($rifaPay);

            if (!$numbers) {
                // Retornar a mensagem de erro ao usuário
                return false;
            }

            AwardedQuota::winnerBilhetePremiado($numbers, $rifaPay->client_id, $rifaPay->rifas_id);

            self::create([
                'pay_id' => $rifaPay->id,
                'rifas_id' => $rifaPay->rifas_id,
                'numbers' => json_encode($numbers),
                'client_id' => $rifaPay->client_id,
            ]);

            return true;
        }, 5); // 5 tentativas para resolver deadlocks
    }

    public static function generateUniqueNumbers($payment) {
    $maxNumbers = $payment->rifa->cota->qntd_cota;
    $numToGenerate = $payment->qntd_number;

    // Obter números existentes de forma eficiente
    $existingNumbers = self::where('rifas_id', $payment->rifas_id)
        ->whereIn('status', [0, 1])
        ->lockForUpdate()
        ->pluck('numbers')
        ->flatMap(function ($item) {
            return json_decode($item, true) ?: [];
        })->toArray();

    $blockedNumbers = $payment->rifa->awardedQuota()
        ->where('status', 'bloqueada')
        ->lockForUpdate()
        ->pluck('number_cota')
        ->toArray();

    $immediateNumbers = $payment->rifa->awardedQuota()
        ->where('status', 'imediato')
        ->lockForUpdate()
        ->pluck('number_cota')
        ->toArray();
    // Filtrar números existentes
    $existingSet = array_flip($existingNumbers);
    $blockedSet = array_flip($blockedNumbers);

    // Números válidos imediatos
    $validImmediateNumbers = array_diff($immediateNumbers, $existingNumbers);
    $validImmediateNumbers = array_slice($validImmediateNumbers, 0, $numToGenerate); // Limitar ao número de compras
    $generatedSet = array_flip($validImmediateNumbers);

    // Gerar números disponíveis
    $availableNumbers = range(1, $maxNumbers);
    $availableNumbers = array_diff($availableNumbers, array_keys($existingSet), array_keys($blockedSet));

    // Verificar se há números suficientes
    if (count($availableNumbers) < ($numToGenerate - count($validImmediateNumbers))) {
        return false;
    }

    // Gerar números aleatórios
    $remainingToGenerate = $numToGenerate - count($validImmediateNumbers);
    $randomNumbers = [];

    if ($remainingToGenerate > 0) {
        // Remover números válidos imediatos dos disponíveis para evitar repetição
        $availableNumbers = array_diff($availableNumbers, $validImmediateNumbers);

        $randomKeys = (array) array_rand($availableNumbers, $remainingToGenerate);
        $randomNumbers = array_intersect_key($availableNumbers, array_flip($randomKeys));
    }

    // Combinar os números gerados
    $generatedNumbers = array_merge(array_keys($generatedSet), $randomNumbers);

    return $generatedNumbers;
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
        ->update(['status' => 2, 'numbers' => null]);
    }
    public static function approvedRifaNumber($ids) {
        return self::with(['rifa'])->whereIn('pay_id', $ids)
        ->update(['status' => 1]);
    }












}
