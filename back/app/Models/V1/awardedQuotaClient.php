<?php

namespace App\Models\V1;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class awardedQuotaClient extends Model
{
    use HasFactory;

    protected $fillable = [ 'awarded_number', 'price', 'client_id', 'rifas_id' ];
}
