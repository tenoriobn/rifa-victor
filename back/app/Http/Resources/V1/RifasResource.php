<?php

namespace App\Http\Resources\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RifasResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "id" => $this->id,
            "title" => $this->title,
            "description" => $this->description,
            "thumbnail" => $this->thumbnail,
            "rifaStatus" => $this->rifa_status,
            "rifaDate" => $this->rifa_date,
            "price" => $this->price,
            "rifaNumbers" => $this->rifa_numbers,
            "firstPacoteNumbers" => $this->first_pacote_numbers,
            "firstPacoteDiscount" => $this->first_pacote_discount,
            "secondPacoteNumbers" => $this->second_pacote_numbers,
            "secondPacoteDiscount" => $this->second_pacote_discount,
            "thirdPacoteNumbers" => $this->third_pacote_numbers,
            "thirdPacoteDiscount" => $this->third_pacote_discount,
            "fourthPacoteNumbers" => $this->fourth_pacote_numbers,
            "fourthPacoteDiscount" => $this->fourth_pacote_discount,
            "fifthPacoteNumbers" => $this->fifth_pacote_numbers,
            "fifthPacoteDiscount" => $this->fifth_pacote_discount,
            "sixthPacoteNumbers" => $this->sixth_pacote_numbers,
            "sixthPacoteDiscount" => $this->sixth_pacote_discount,
            "seventhPacoteNumbers" => $this->seventh_pacote_numbers,
            "seventhPacoteDiscount" => $this->seventh_pacote_discount,
            "eighthPacoteNumbers" => $this->eighth_pacote_numbers,
            "eighthPacoteDiscount" => $this->eighth_pacote_discount,
            "createdAt" => $this->created_at,
            "updatedAt" => $this->updated_at,
        ];
    }
}
