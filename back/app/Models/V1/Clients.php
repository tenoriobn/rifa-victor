<?php
namespace App\Models\V1;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Tymon\JWTAuth\Contracts\JWTSubject;
use App\Http\Controllers\V1\Response;


class Clients extends Authenticatable implements JWTSubject
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['name', 'surname', 'cellphone', 'api_token'];

    public static function createClient($name, $surname, $cellphone)
    {
        try {
            $client = self::firstOrCreate(
                ['cellphone' => $cellphone],
                [
                    'name' => $name,
                    'surname' => $surname,
                    'cellphone' => $cellphone,
                ]
            );
            return $client->wasRecentlyCreated;
        } catch (\Throwable $th) {
            return response()->json(['message' => 'Erro interno'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public static function findClient($cellphone) {
        $client = self::where('cellphone', $cellphone)->first();
        return $client;
    }

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'surname' => $this->surname,
            'cellphone' => $this->cellphone,
            'api_token' => $this->api_token,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
