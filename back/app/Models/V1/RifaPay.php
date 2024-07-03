<?php

namespace App\Models\V1;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

use App\Models\V1\{Rifas, Clients};
class RifaPay extends Model
{
    use HasFactory;
    protected $fillable = ['status', 'verify', 'value', 'qntd_number', 'rifas_id', 'client_id'];

    public function rifa(): BelongsTo {
        return $this->belongsTo(Rifas::class);
    }
    public function client(): BelongsTo {
        return $this->belongsTo(Clients::class);
    }

    public static function applyRifa($date) {
        $payId = self::create([
            'value' => $date->value,
            'qntd_number' => $date->qntd_number,
            'rifas_id' => $date->rifas_id,
            'client_id' => $date->client_id,
        ]);

        return $payId->id ?? false;
    }

    public static function cancelPayment() {
        $updatedIds = self::where('status', 0)
        ->where('verify', 0)->where('created_at', '<=', now()->subMinutes(30))
        ->pluck('id');

        if ($updatedIds->isNotEmpty()) {
        self::whereIn('id', $updatedIds)
        ->update(['status' => 2, 'verify' => 1]);
        }

        return $updatedIds;
    }
    public static function MadePayment() {

        $updatedIds = self::where('status', 1)->where('verify', 0)->pluck('id');

        if ($updatedIds->isNotEmpty()) {
            self::whereIn('id', $updatedIds)
            ->update(['status' => 1, 'verify' => 1]);
        }

        return $updatedIds;
    }
}
