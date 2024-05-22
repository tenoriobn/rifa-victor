<?php

namespace App\Services;

class PaymentStatusService
{
    public function create($request) {
        $phone = $request->phone;
        $phone = preg_replace('/[^a-zA-Z0-9]/', '', $phone);
        $message = $request->message;
        $hash = substr(str_shuffle("0123456789abcdefghijklmnopqrstvwxyz"), 0, 8);
        $user = Auth::user();
        FindCellphone::create([
            'status' => FindCellphone::PENDING,
            'id_hash' => $hash,
            'phone_number' => $phone,
            'user_id' => $user->id,
            'message' => $message,
        ]);
        $this->smsService->sendSmsMessage($phone, $message, $hash);
    }

}
