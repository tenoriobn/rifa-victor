<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

use App\Models\V1\RifaNumber;
use Exception;

class GenerateRifaNumbers implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $paymentId;

    public function __construct($paymentId)
    {
        $this->paymentId = $paymentId;
    }

    public function handle()
    {
        try {
            $payment = RifaNumber::with(['rifa.cota', 'rifaPay'])->whereIn('pay_id', $this->paymentId)->get();
            RifaNumber::generateUniqueNumbers($payment);

        } catch (Exception $e) {
            \Log::error('Ocorreu um erro durante a geração de números da rifa: ' . $e->getMessage());
        }
    }
}


