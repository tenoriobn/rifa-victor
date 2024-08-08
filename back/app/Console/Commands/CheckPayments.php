<?php

namespace App\Console\Commands;

use App\Models\V1\RifaPay;
use App\Services\MercadoPagoService;
use Illuminate\Console\Command;

class CheckPayments extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'pagamentos:pendentes';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Verifica o status dos pagamentos pendentes';



    public function __construct(MercadoPagoService $mercadoPagoService)
    {
        parent::__construct();
        $this->mercadoPagoService = $mercadoPagoService;
    }
    public function handle()
    {
        $payments = RifaPay::with('client')->where('status', 0)->whereNotNull('pix_id')->get();

        foreach ($payments as $payment) {
            $paymentStatusResponse = $this->mercadoPagoService->checkPaymentStatus($payment->pix_id);
            if ($paymentStatusResponse['status']) {
                $paymentStatus = $paymentStatusResponse['data']['status'];
                if ($paymentStatus === 1) {

                    $payment->update(['status' => 1]);
                    $this->info("O pagamento de {$payment->client->name} com o ID  {$payment->id} foi aprovado.");
                } elseif ($paymentStatus === 0) {
                    $payment->update(['status' => 0]);
                    $this->info("O pagamento de {$payment->client->name} com o ID {$payment->id} está pendente.");
                } else {
                    $this->info("O pagamento de {$payment->client->name} com o ID {$payment->id} foi expirado. ");
                }
            } else {
                $this->error("Erro ao verificar pagamento do(a) {$payment->client->name} {$payment->client->surname} id do pix: {$payment->pix_id}");
            }
        }
        $this->info('Fim da verificação de pagamento.');

    }
}
