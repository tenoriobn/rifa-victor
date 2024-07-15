<?php

namespace App\Services;

use Carbon\Carbon;
use Illuminate\Support\Str;
use Auth;
use App\Models\V1\{Cotas, Rifas, RifasOthers, RifasAwarded, RifasPayment, RifaNumber, Clients, RifaPay, AwardedQuota, RifaImage};
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

        $cota = Cotas::cotaCreateOrUpdate( $datas->qntd_cota ?? 0, $datas->qntd_cota_digit ?? 0,$datas->qntd_cota_min_order ?? 0, $datas->qntd_cota_max_order ?? 0, $datas->qntd_cota_max_client ?? 0, $rifaResult ?? $rifasId);

        if (!$cota) {
            return false;
        }

        $awarded = RifasAwarded::rifasAwardedCreateOrUpdate( $datas->cotas_double ?? '', $datas->text_cotas_double ?? '', $datas->title_cotas_awarded ?? '', $datas->description_cotas_awarded ?? '', $datas->title_upsell ?? '', $datas->description_upsell ?? '', $rifaResult ?? $rifasId);

        if (!$awarded) {
            return false;
        }

        $others = RifasOthers::rifasOthersCreateOrUpdate( $datas->facebook_pixel ?? '', $datas->facebook_token ?? '', $datas->tiktok_pixel ?? '', $datas->whatsapp_group ?? '', $datas->link_ebook ?? '', $datas->nota_fiscal ?? '', $rifaResult ?? $rifasId);

        if (!$others) {
            return false;
        }

        $payment = RifasPayment::rifasPaymentCreateOrUpdate( $datas->time_pay ?? '', $datas->gateway ?? '',  $datas->service_charge ?? '', $datas->text_service_charge ?? '',  $rifaResult ?? $rifasId);

        if (!$payment) {
            return false;
        }

        return true;
    }

    public function status ($status, $date) {
        $data_sortition = Carbon::parse($date);
        $today = Carbon::now();

        if ($data_sortition->greaterThan($today)) {
            return 'futuras';
        }

        return 'ativas';
    }
    public function saveImage($imgBase64, $rifaId) {
        // Extrair a extensão da imagem
        preg_match('#^data:image/(?<type>.+);base64,#', $imgBase64, $matches);
        $type = $matches['type'];
        $allowedTypes = ['jpg', 'jpeg', 'png'];

        // Verificar se o tipo é permitido
        if (!in_array($type, $allowedTypes)) {
        throw new \Exception('Formato de imagem não permitido. Aceito apenas JPG e PNG.');
        }

        // Decodificar a imagem base64
        $imgData = base64_decode(preg_replace('#^data:image/\w+;base64,#i', '', $imgBase64));
        $imgName = Str::random(10) . '.' . $type; // Manter a extensão original
        $reactImagePath = '../../admin/public/imgRifas/' . $imgName;

        // Salvar a imagem na pasta imgRifas
        file_put_contents($reactImagePath, $imgData);

        // Salvar a imagem no banco de dados
        return RifaImage::createImage($imgName, $rifaId);
    }

    public function procurarGanhador($numeroWinner, $rifasId)
    {
        return RifaNumber::lookingForNumber($numeroWinner, $rifasId);
    }

    public function definirGanhador($numeroSorteado, $novoGanhadorPhone, $rifasId)
    {
        // Encontrar o ganhador atual pela rifa específica
        $ganhadorAtual = self::procurarGanhador($numeroSorteado, $rifasId);

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

    public function adicionarNumerosRifasClient($cellphone, $qntdNumero, $rifasId) {
        try {
            $client = Clients::findClient($cellphone);
            if (!$client) {
                return ["success" => false, "msg" => 'Usuário não encontrado'];
            }

            $qntdCota = Cotas::findQntdCota($rifasId);
            if (!$qntdCota) {
                return ["success" => false, "msg" => 'Rifa não encontrado'];
            }

            $qntdNumeroEmUso = RifaNumber::countTotalNumber($rifasId);
            $isAddNumero = ($qntdCota->qntd_cota - intval($qntdNumeroEmUso->total)) - $qntdNumero ;
            if($isAddNumero < 0) {
                return ["success" => false, "msg" => 'Quantidade invalida', $isAddNumero ];
            }


            $rifaPay = RifaPay::addNumeroClient( $qntdNumero, $client->id , $rifasId);
            if (!$rifaPay) {
                return ["success" => false, "msg" => 'Rifa nao encontrada', 404];

            }

            $rifaPayDetails = RifaPay::with(['rifa.cota', 'rifa.awardedQuota'])
                ->find($rifaPay->id);

            $result = RifaNumber::applyRifa($rifaPayDetails);

            if(!$result) {
                $rifaPayDetails->delete();
                return ["success" => false, "msg" => "Quantidade de número invalido", 404];
            }

            return ["success" => true, "msg" => "Numero adicionado com sucesso", 201];
        } catch (Exception $e) {
            return response()->json(["success" => false, "msg" => $e->getMessage()], 500);
        }

    }

    public function addBilhetePremiado($cellphone, $numeroPremiado, $rifasId) {
        try {
            $client = Clients::findClient($cellphone);
            if (!$client) {
                return ["success" => false, "msg" => 'Usuário não encontrado'];
            }

            $numBilhete = AwardedQuota::findBilhetePremiado($numeroPremiado);
            if (!$numBilhete) {
                return ["success" => false, "msg" => 'Número não encontrado'];
            }

            AwardedQuota::definirWinnerBilhetePremiado($numeroPremiado, $client->id, $rifasId);


            return ["success" => true, "msg" => "Numero adicionado com sucesso", 201];
        } catch (Exception $e) {
            return response()->json(["success" => false, "msg" => $e->getMessage()], 500);
        }

    }


}
