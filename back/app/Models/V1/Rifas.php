<?php

namespace App\Models\V1;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rifas extends Model
{
    protected $fillable = [
        "title", "description", "thumbnail", "rifa_status",
        "rifa_date", "price", "first_pacote_numbers", "first_pacote_discount",
        "second_pacote_numbers", "second_pacote_discount", "third_pacote_numbers", "third_pacote_discount", "fourth_pacote_numbers", "fourth_pacote_discount",
        "rifa_numbers", "rifa_numbers_remaining",
    ];


    use HasFactory;
}
