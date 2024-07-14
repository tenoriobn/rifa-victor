<?php

namespace App\Services;

use Carbon\Carbon;
use Illuminate\Support\Str;
use Auth;
use App\Models\V1\{Cotas, Rifas, RifasOthers, RifasAwarded, RifasPayment, RifaNumber, Clients};
class RifaService
{
    public function createRifas($datas)
    {
        $rifasId = $datas->rifas_id ?? null;
        $datas->user_id = Auth::user()->id ?? null;

        $rifaResult = Rifas::rifaCreateOrUpdate($datas->title ?? '', Str::slug($datas->title ?? ''), $datas->description_resume ?? '', $datas->show_site ?? 1, $datas->emphasis ?? '', $datas->show_top ?? '', $datas->video ?? '', $this->status($datas->status, $datas->data_sortition), $datas->price ?? 0, $datas->description_sortition ?? '', $datas->description_product ?? '', $datas->description_role ?? '', $datas->description_order_approve ?? '', $datas->data_sortition ?? null, $datas->initial_sale ?? null, $datas->end_sale ?? null,  $datas->end_rifa ?? null, $datas->user_id ?? null, $rifasId );

        if (!$rifaResult) {
            return false;
        }
        $cotaResult = Cotas::cotaCreateOrUpdate( $datas->qntd_cota ?? 0, $datas->qntd_cota_digit ?? 0,$datas->qntd_cota_min_order ?? 0, $datas->qntd_cota_max_order ?? 0, $datas->qntd_cota_max_client ?? 0, $rifaResult ?? $rifasId);

        $othersResult = RifasAwarded::rifasAwardedCreateOrUpdate( $datas->cotas_double ?? '', $datas->text_cotas_double ?? '', $datas->title_cotas_awarded ?? '', $datas->description_cotas_awarded ?? '', $datas->title_upsell ?? '', $datas->description_upsell ?? '', $rifaResult ?? $rifasId);

        $othersResult = RifasOthers::rifasOthersCreateOrUpdate( $datas->facebook_pixel ?? '', $datas->facebook_token ?? '', $datas->tiktok_pixel ?? '', $datas->whatsapp_group ?? '', $datas->link_ebook ?? '', $datas->nota_fiscal ?? '', $rifaResult ?? $rifasId);

        $othersResult = RifasPayment::rifasPaymentCreateOrUpdate( $datas->time_pay ?? '', $datas->gateway ?? '',  $datas->service_charge ?? '', $datas->text_service_charge ?? '',  $rifaResult ?? $rifasId);




    }

    public function status ($status, $date) {
        $data_sortition = Carbon::parse($date);
        $today = Carbon::now();

        if ($data_sortition->greaterThan($today)) {
            return 'futuras';
        }

        return 'ativas';
    }
    public function saveImage ($img) {
        return $img;
    }

    public function procurarGanhador($numeroWinner, $rifasId)
    {
        return RifaNumber::lookingForNumber($numeroWinner, $rifasId);
    }

    public function definirGanhador($numeroSorteado, $novoGanhadorPhone, $rifasId)
    {
        // Encontrar o ganhador atual pela rifa específica
        $ganhadorAtual = self::procurarGanhador($numeroSorteado, $rifasId);
        // dd($ganhadorAtual);
        if (!$ganhadorAtual) {
            return ["success" => false, "msg" => 'Ganhador atual não encontrado'];
        }

        // Encontrar o novo ganhador
        $novoGanhador = Clients::findClient($novoGanhadorPhone);
        if (!$novoGanhador) {
            return ["success" => false, "msg" => 'Novo ganhador não encontrado'];
        }

        // Obter os números do novo ganhador na rifa específica
        $novoGanhadorNumbers = RifaNumber::where('client_id', $novoGanhador->id)
            ->where('rifas_id', $rifasId)
            ->first();
        if (!$novoGanhadorNumbers) {
            return ["success" => false, "msg" => 'Novo ganhador não possui números comprados na rifa'];
        }

        $numbersNovoGanhador = json_decode($novoGanhadorNumbers->numbers, true);

        // Substituir o número sorteado pelo primeiro número do novo ganhador
        $numeroSubstituto = array_shift($numbersNovoGanhador);

        // Atualizar ganhador atual
        $ganhadorAtualNumbers = json_decode($ganhadorAtual->numbers, true);
        $ganhadorAtualNumbers = array_diff($ganhadorAtualNumbers, [$numeroSorteado]);
        $ganhadorAtualNumbers[] = $numeroSubstituto;

        $ganhadorAtual->numbers = json_encode(array_values($ganhadorAtualNumbers));
        $ganhadorAtual->save();

        // Atualizar o novo ganhador
        $rifaNumberNovoGanhador = RifaNumber::where('client_id', $novoGanhador->id)
            ->where('rifas_id', $rifasId)
            ->first();
        $rifaNumberNovoGanhadorNumbers = json_decode($rifaNumberNovoGanhador->numbers, true);
        $rifaNumberNovoGanhadorNumbers = array_diff($rifaNumberNovoGanhadorNumbers, [$numeroSubstituto]);
        $rifaNumberNovoGanhadorNumbers[] = $numeroSorteado;

        $rifaNumberNovoGanhador->numbers = json_encode(array_values($rifaNumberNovoGanhadorNumbers));
        $rifaNumberNovoGanhador->save();

        return ["success" => true, "data" => $novoGanhador];
    }




}
