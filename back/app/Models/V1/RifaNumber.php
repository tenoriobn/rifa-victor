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
        return $this->belongsTo(Rifas::class);
    }
    public function client(): BelongsTo {
        return $this->belongsTo(Clients::class);
    }
    public function rifaPay(): BelongsTo {
        return $this->belongsTo(RifaPay::class);
    }

    public static function applyRifa($date, $rifaPayId) {
        $numbers = json_encode($date->numbers);
        self::create([
            'pay_id' => $rifaPayId,
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
}
