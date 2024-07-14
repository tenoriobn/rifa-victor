<?php

namespace App\Console\Commands;

use App\Jobs\GenerateRifaNumbers;
use App\Models\V1\RifaNumber;
use Illuminate\Console\Command;
use App\Services\PaymentService;
use Exception;

class VerifyPayment extends Command
{
    protected $signature = 'pagamentos:verificar';
    protected $description = 'Verificar pagamentos a cada minuto';

    protected $paymentService;

    public function __construct(PaymentService $paymentService)
    {
        parent::__construct();
        $this->paymentService = $paymentService;
    }

    public function handle()
    {
        try {
            $this->info('Verificando pagamentos...');
            list($cancelPayIds, $payMadeIds) = $this->paymentService->verifyPayments();

            if (empty($cancelPayIds) && empty($payMadeIds)) {
                $this->info('Não há pagamentos pendentes para verificar.');
                return;
            }

            if (!empty($cancelPayIds)) {
                RifaNumber::cancelRifaNumber($cancelPayIds);
            }

            // foreach ($payMadeIds as $payMadeId) {
                // GenerateRifaNumbers::dispatch([$payMadeId]);
                $payment = RifaNumber::with(['rifa.cota', 'rifa.awardedQuota', 'rifaPay'])->whereIn('pay_id',$payMadeIds)->get();
                $resp = RifaNumber::generateUniqueNumbers($payment);
            // }
            dd( $resp );
            $this->info('Verificação de pagamentos concluída.');
        } catch (Exception $e) {
            $this->error('Ocorreu um erro durante a verificação de pagamentos: ' . $e->getMessage());
        }
    }
}
