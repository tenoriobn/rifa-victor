<?php

namespace App\Models\V1;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\{HasOne, hasMany};

use App\Services\FuncaoService;
use App\Models\V1\{RifasAwarded, RifasOthers, RifasPayment, awardedQuota, awardedQuotaClient};

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
        'description_order_approve',
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
    public function awardedQuota(): HasOne {
        return $this->hasOne(AwardedQuota::class);
    }
    public function awardedQuotaClient(): hasMany {
        return $this->hasMany(AwardedQuotaClient::class);
    }
    public function rifaImage(): hasMany {
        return $this->hasMany(RifaImage::class);
    }

    public static function rifaCreateOrUpdate($title, $slug, $description_resume, $show_site, $emphasis, $show_top, $video, $status, $price, $description_sortition, $description_product, $description_role, $description_order_approve, $data_sortition, $initial_sale, $end_sale, $end_rifa, $user_id, $rifa_id) {
        $rifaService = new FuncaoService();
        $price = $rifaService->convertToDecimal($price);
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
                'status' => $status,
                'price' => $price,
                'description_sortition' => $description_sortition,
                'description_product' => $description_product,
                'description_role' => $description_role,
                'description_order_approve' => $description_order_approve,
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
        return self::with(['cota', 'rifaAwarded', 'rifaOthers', 'rifaPayment', 'awardedQuota', 'awardedQuotaClient.client'])->where('winner_id', 0)->latest()->get();
    }
    public static function getAllRifas() {
        return self::with(['cota', 'rifaAwarded', 'rifaOthers', 'rifaPayment', 'awardedQuota', 'awardedQuotaClient.client'])->latest()->get();
    }
    public static function getOneRifa($id) {
        return self::with(['cota', 'rifaAwarded', 'rifaOthers', 'rifaPayment', 'awardedQuota', 'awardedQuotaClient.client'])->where("id", $id)->first();
    }
    public static function getOneRifaActiva($id) {
        return self::with(['cota', 'rifaAwarded', 'rifaOthers', 'rifaPayment', 'awardedQuota', 'awardedQuotaClient.client'])->where("id", $id)->where('status','ativas')->first();
    }
    public static function getOneRifaEdit($id) {
        return self::with(['cota', 'rifaAwarded', 'rifaOthers', 'rifaPayment', 'awardedQuota', 'awardedQuotaClient.client'])->where("id", $id)->where('status','ativas')->first();
    }

}
