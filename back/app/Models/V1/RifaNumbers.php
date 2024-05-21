<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RifaNumbers extends Model
{
    use HasFactory;

    public const PENDING = 0;
    public const APPROVED = 1;
    public const AUTHORIZED = 2;
    public const IN_PROCESS = 3;
    public const IN_MEDIATION = 4;
    public const REJECTED = 5;
    public const CANCELLED = 6;
    public const REFUNDED = 7;
    public const CHARGED_BACK = 8;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'rifa_numbers';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['rifa_id', 'client_id', 'numbers'];
}
