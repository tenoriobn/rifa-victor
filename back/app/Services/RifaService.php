<?php

namespace App\Services;
use App\Models\V1\{Cotas, Rifas, RifasOthers, RifasAwarded};

use App\Models\V1\RifasPayment;
use Carbon\Carbon;
use Illuminate\Support\Str;
class RifaService
{
    public function createRifas($datas)
    {
        $rifa_id = $datas->rifa_id ?? null;

        $rifaResult = Rifas::rifaCreateOrUpdate($datas->title ?? '', Str::slug($datas->title ?? ''), $datas->description_resume ?? '', $datas->show_site ?? '', $datas->emphasis ?? '', $datas->show_top ?? '', $datas->video ?? '', $this->saveImage($datas->img), $this->status($datas->status, $datas->data_sortition), $datas->price ?? 0, $datas->description_sortition ?? '', $datas->description_product ?? '', $datas->description_role ?? '', $datas->data_sortition ?? null, $datas->initial_sale ?? null, $datas->end_sale ?? null, $datas->user_id ?? null, $rifa_id );

        if (!$rifaResult) {
            return false;
        }

        $cotaResult = Cotas::cotaCreateOrUpdate( $datas->qntd_cota ?? 0, $datas->qntd_cota_digit ?? 0, $datas->value_unit ?? 0, $datas->qntd_cota_max_order ?? 0, $datas->qntd_cota_max_client ?? 0, $rifaResult, $datas->cota_id ?? null);

        $othersResult = RifasAwarded::rifasAwardedCreateOrUpdate( $datas->cotas_double ?? '', $datas->text_cotas_double ?? '', $datas->title_cotas_awarded ?? '', $datas->description_cotas_awarded ?? '', $datas->title_upsell ?? '', $datas->description_upsell ?? '', $rifaResult, $datas->rifas_awarded_id ?? null);

        $othersResult = RifasOthers::rifasOthersCreateOrUpdate( $datas->facebook_pixel ?? '', $datas->facebook_token ?? '', $datas->tiktok_pixel ?? '', $datas->whatsapp_group ?? '', $datas->link_ebook ?? '', $datas->nota_fiscal ?? '', $rifaResult, $datas->rifas_other_id ?? null);

        $othersResult = RifasPayment::rifasPaymentCreateOrUpdate( $datas->time_pay ?? '', $datas->type_pay ?? '', $datas->service_charge ?? '', $datas->text_service_charge ?? '',  $rifaResult, $datas->rifas_payment_id ?? null);

    }

    public function status ($status, $date) {
        $data_sortition = Carbon::parse($date);
        $today = Carbon::now();

        if ($data_sortition->greaterThan($today)) {
            return 'futura';
        }

        return 'ativado';
    }
    public function saveImage ($img) {
        return $img;
    }


}
