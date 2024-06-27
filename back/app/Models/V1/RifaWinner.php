<?php

namespace App\Models\V1;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

use App\Models\V1\{Rifas, Clients};

class RifaWinner extends Model
{
    use HasFactory;

    protected $fillable = [
        'ticket',
        'draw_day',
        'img',
        'rifas_id',
        'client_id',
    ];

    public function rifa(): BelongsTo {
        return $this->belongsTo(Rifas::class, 'rifas_id', 'id');
    }

    public function client(): BelongsTo {
        return $this->belongsTo(Clients::class);
    }

    public static function getAllWinners() {
        return self::with(['rifa', 'client'])->latest()->get() ?? false;
    }

    public static function defineWinner($data) {
        return self::create([
            'ticket' => $data->ticket,
            'draw_day' => $data->draw_day,
            'img' => $data->img,
            'rifas_id' => $data->rifas_id,
            'client_id' => $data->client_id,
        ]);
    }
}
