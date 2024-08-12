<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\V1\Clients;
class Afiliado extends Model
{
    use HasFactory;
    protected $fillable = [
        'cellphone',
        'link',
        'porcent',
        'type',
        'client_id',
    ];

    public function client()
    {
        return $this->belongsTo(Clients::class);
    }
    public function ganhoAfiliado()
    {
        return $this->belongsTo(GanhoAfiliado::class, 'id', 'afiliado_id');
    }

    public static function findAfiliado($cellphone) {
        $client = self::where('cellphone', $cellphone)->first();
        return $client;
    }
    public static function findAllAfiliado($id) {
        $client = self::with(['ganhoAfiliado', 'client'])->get();
        return $client;
    }
    public static function findOneAfiliadoById($id) {
        $client = self::where('id', $id)->first();
        return $client;
    }

    public static function createAfiliado($data, $client){
        $link = self::createLinkAfiliado($data, $client);

        return self::create([
            'cellphone' => $data->cellphone,
            'link' => $link,
            'porcent' => $data->porcent,
            'type' => $data->type,
            'client_id' => $client->id,
        ]);
    }

    private static function createLinkAfiliado($data, $client) {
        do {
            $code = substr(str_shuffle(str_repeat('0123456789abcdefghijklmnopqrstuvwxyz', ceil(9 / 62))), 1,9);
        } while (self::where('link', $code)->exists());
        $code = $client->name.'-'.$client->surname.'-'.$code;

        return $code;
    }
}
