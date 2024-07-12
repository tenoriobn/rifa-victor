<?php

namespace App\Services;

use App\Models\V1\RifaPay;

class PaymentService
{
    public function verifyPayments()
    {
        $cancelPayIds = [];
        $payMadeIds = [];

        RifaPay::chunk(100, function ($payments) use (&$cancelPayIds, &$payMadeIds) {
            foreach ($payments as $payment) {
                $timeLimit = $payment->rifa->cota->camada ?? 30;

                if ($payment->status == 0 && $payment->verify == 0 && $payment->created_at <= now()->subMinutes($timeLimit)) {
                    $cancelPayIds[] = $payment->id;
                } elseif ($payment->status == 1 && $payment->verify == 0) {
                    $payMadeIds[] = $payment->id;
                }
            }
        });

        if (!empty($cancelPayIds)) {
            RifaPay::whereIn('id', $cancelPayIds)->update(['status' => 2, 'verify' => 1]);
        }

        if (!empty($payMadeIds)) {
            RifaPay::whereIn('id', $payMadeIds)->update(['verify' => 1]);
        }

        return [$cancelPayIds, $payMadeIds];
    }
}
