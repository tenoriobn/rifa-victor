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
                $paymentStatus = $paymentStatusResponse['payment']->status;
                if ($paymentStatus === 'approved') {

                    $payment->update(['status' => 1]);
                    $this->info("O pagamento de {$payment->client->name} com o ID de pagamento {$payment->pix_id} foi aprovado.");
                } elseif ($paymentStatus === 'expired') {
                    $payment->update(['status' => 0]);
                    $this->info("O pagamento de {$payment->client->name} com o ID de pagamento {$payment->pix_id} foi expirado.");
                } else {
                    $this->info("O pagamento de {$payment->client->name} com o ID de pagamento {$payment->pix_id} está pendente.");
                }
            } else {
                $this->error("Erro ao verificar pagamento {$payment->pix_id}: {$paymentStatusResponse['message']}");
                $this->error("details {$payment->pix_id}: {$paymentStatusResponse['content']['message']}");
            }
        }
        $this->info('Fim da verificação de pagamento.');

    }
}
