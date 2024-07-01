<?php

namespace App\Models\V1;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AwardedQuotaClient extends Model
{
    use HasFactory;


    protected $fillable = [ 'awarded_number', 'price_awarded_quota', 'client_id', 'rifas_id' ];
}
