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
        $participantes = self::with(['rifa', 'client'])->where('status', 1)->where('rifas_id', $rifasId)->get();
        $ganhador = null; // Inicializa a variável

        foreach ($participantes as $participante) {
            $numbersParticipante = json_decode($participante->numbers, true);

            // Verifica se $numbersParticipante é um array e realiza a busca
            if (is_array($numbersParticipante)) {
                $find = array_search($number, $numbersParticipante);

                if ($find !== false) { // array_search retorna false se não encontrar
                    $ganhador = $participante;
                    break;
                }
            }
        }

        return $ganhador; // Retorna o participante encontrado ou null
    }


    public static function getAllNumbersClient($id) {
        return self::where('client_id', $id)->where('status', 1)->get();
    }
    public static function countTotalNumber($id) {
       return  self::where('rifas_id', $id)->where('status', 1) ->whereRaw('JSON_VALID(numbers)')
       ->selectRaw('SUM(JSON_LENGTH(numbers)) as total')->first();
    }

    public static function cancelarCompra($id) {
        return self::where('pay_id', $id)->update(['status' => 2]);
    }
    public static function aprovarCompra($id) {
        return self::where('pay_id', $id)->update(['status' => 1]);
    }

    public static function applyRifa($rifaPay) {
        return DB::transaction(function() use ($rifaPay) {
            $numbers = self::generateUniqueNumbers($rifaPay);

            if (!$numbers) {
                // Retornar a mensagem de erro ao usuário
                return false;
            }

            AwardedQuota::winnerBilhetePremiado($numbers, $rifaPay->client_id, $rifaPay->rifas_id, $rifaPay->id);

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
            ->whereIn('status', ['bloqueada', 'resgatada'])
            ->lockForUpdate()
            ->pluck('number_cota')
            ->toArray();

        $immediateNumbers = $payment->rifa->awardedQuota()
            ->where('status', 'imediato')
            ->lockForUpdate()
            ->pluck('number_cota')
            ->toArray();

        $existingNumbers = array_filter($existingNumbers, function($value) {
            return !is_null($value);
        });

        $blockedNumbers = array_filter($blockedNumbers, function($value) {
            return !is_null($value);
        });


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

    public static function getRankingRifa($id) {
        $result = self::where('status', 1)
            ->where('rifas_id', $id)
            ->select('client_id')
            ->selectRaw('SUM(CASE WHEN JSON_VALID(numbers) THEN JSON_LENGTH(numbers) ELSE 0 END) as total_numbers')
            ->with('client')
            ->groupBy('client_id')
            ->orderByRaw('SUM(CASE WHEN JSON_VALID(numbers) THEN JSON_LENGTH(numbers) ELSE 0 END) DESC')
            ->limit(3)
            ->get();


        return $result ?? false;
    }
    public static function getRankingRifaGeral() {
        $result = self::where('status', 1)->select('client_id', 'rifas_id', 'pay_id')
            ->selectRaw('SUM(CASE WHEN JSON_VALID(numbers) THEN JSON_LENGTH(numbers) ELSE 0 END) as total_numbers')
            ->with(['client', 'rifa', 'rifaPay'])
            ->groupBy(['client_id', 'rifas_id'])
            ->orderByRaw('SUM(CASE WHEN JSON_VALID(numbers) THEN JSON_LENGTH(numbers) ELSE 0 END) DESC')
            ->paginate(20);
        return $result ?? false;
    }

    public static function getRankingRifaGeralFiltro($totalNumbers = null , $rifasId = null) {
        $query = self::where('status', 1)
            ->select('client_id', 'rifas_id', 'pay_id')
            ->selectRaw('SUM(CASE WHEN JSON_VALID(numbers) THEN JSON_LENGTH(numbers) ELSE 0 END) as total_numbers')
            ->with(['client', 'rifa', 'rifaPay'])
            ->groupBy(['client_id', 'rifas_id'])
            ->orderByRaw('SUM(CASE WHEN JSON_VALID(numbers) THEN JSON_LENGTH(numbers) ELSE 0 END) DESC');

        if ($rifasId !== null) {
            $query->where('rifas_id', $rifasId);
        }

        if ($totalNumbers !== null) {
            $query->havingRaw('total_numbers >= ?', [$totalNumbers]);
        }

        $result = $query->get();

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
