<?php

namespace App\Models\V1;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

use App\Models\V1\{Rifas, Clients};
class RifaPay extends Model
{
    use HasFactory;
    protected $fillable = ['status', 'value', 'rifas_id', 'client_id'];

    public function rifa(): BelongsTo {
        return $this->belongsTo(Rifas::class);
    }
    public function client(): BelongsTo {
        return $this->belongsTo(Clients::class);
    }

    public static function applyRifa($date) {
        $payId = self::create([
            'value' => $date->value,
            'rifas_id' => $date->rifas_id,
            'client_id' => $date->client_id,
        ]);

        return $payId->id ?? false;
    }
}
