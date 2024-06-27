<?php

namespace App\Models\V1;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

use App\Models\V1\{RifasAwarded, RifasOthers, RifasPayment};

class Rifas extends Model
{

    protected $fillable = [
        'title',
        'slug',
        'description_resume',
        'show_site',
        'emphasis',
        'show_top',
        'video',
        'img',
        'status',
        'price',
        'description_sortition',
        'description_product',
        'description_role',
        'data_sortition',
        'initial_sale',
        'end_sale',
        'user_id',
        'winner_id',
    ];


    use HasFactory;

    public function cota(): HasOne {
        return $this->hasOne(Cotas::class);
    }

    public function rifaAwarded(): HasOne {
        return $this->hasOne(RifasAwarded::class);
    }
    public function rifaOthers(): HasOne {
        return $this->hasOne(RifasOthers::class);
    }
    public function rifaPayment(): HasOne {
        return $this->hasOne(RifasPayment::class);
    }

    public static function rifaCreateOrUpdate($title, $slug, $description_resume, $show_site, $emphasis, $show_top, $video, $img, $status, $price, $description_sortition, $description_product, $description_role, $data_sortition, $initial_sale, $end_sale, $end_rifa, $user_id, $rifa_id) {
        $imgJson = json_encode($img);
        $result  = self::updateOrCreate(
            ['id' => $rifa_id],
            [
                'title' => $title,
                'slug' => $slug,
                'description_resume' => $description_resume,
                'show_site' => $show_site,
                'emphasis' => $emphasis,
                'show_top' => $show_top,
                'video' => $video,
                'img' => $imgJson,
                'status' => $status,
                'price' => $price,
                'description_sortition' => $description_sortition,
                'description_product' => $description_product,
                'description_role' => $description_role,
                'data_sortition' => $data_sortition,
                'initial_sale' => $initial_sale,
                'end_sale' => $end_sale,
                'end_rifa' => $end_rifa,
                'user_id' => $user_id,
            ]);

            $is_created = $result->wasRecentlyCreated || $result->wasChanged();


            $rifa_id = $result->id;

            return $is_created ? $rifa_id : false;
    }

    public static function getAllRifasActivas() {
        return self::with(['cota', 'rifaAwarded', 'rifaOthers', 'rifaPayment'])->where('winner_id', 0)->latest()->get();
    }
    public static function getAllRifas() {
        return self::with(['cota', 'rifaAwarded', 'rifaOthers', 'rifaPayment'])->latest()->get();
    }
    public static function getOneRifas($id) {
        return self::with(['cota', 'rifaAwarded', 'rifaOthers', 'rifaPayment'])->where("id", $id)->first();
    }

}
