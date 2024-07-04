<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

use App\Jobs\GenerateRifaNumbers;
use App\Models\V1\RifaPay;
use App\Models\V1\RifaNumber;
use Exception;

class VerifyPayment extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'pagamentos:verificar';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Verificar pagamentos a cada minuto';

    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     */
    public function handle()
    {
        try {
            $this->info('Verificando pagamentos...');

            $cancelPayIds = [];
            $payMadeIds = [];


            $cancelPay = RifaPay::cancelPayment()->toArray(); // Converter para array
            $payMade = RifaPay::MadePayment()->toArray(); // Converter para array

            if($cancelPay == [] && $payMade == []) {
                $this->info('Não há pagamentos pendentes para verificar.');
                return;
            }

            if (!empty($cancelPayIds)) {
                RifaNumber::cancelRifaNumber($cancelPayIds);
            }

            if (!empty($payMade)) {
                foreach ($payMade as $payMadeId) {
                    GenerateRifaNumbers::dispatch([$payMadeId]);
                    //  $payment = RifaNumber::with(['rifa.cota', 'rifaPay'])->whereIn('pay_id', [$payMadeId])->get();
                    // RifaNumber::generateUniqueNumbers($payment);
                }
            }



            $this->info('Verificação de pagamentos concluída.');
        } catch (Exception $e) {
            $this->error('Ocorreu um erro durante a verificação de pagamentos: ' . $e->getMessage());
        }
    }
}
