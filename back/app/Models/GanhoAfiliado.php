<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GanhoAfiliado extends Model
{
    use HasFactory;

    protected $fillable = [
        'afiliado_id',
        'pedidos',
        'faturamento',
        'comissao',
        'rifas_id',
        'pago',
        'rifa_pay_id',
  
    ];

    public function afiliado()
    {
        return $this->belongsTo(Afiliado::class);
    }

    public static function findOneAfiliadoByProduto($id, $idProduto) {
        return self::with(['afiliado.client'])->where('afiliado_id', $id)->where('rifas_id',  $idProduto)->get();
    }

    public static function createGanhoAfiliado($idAfiliado) {
        return self::create([
            'afiliado_id' => $idAfiliado,
            'pedidos' => 0,
            'faturamento' => 0.00,
            'comissao' => 0.00,
            'pago' => 0,
        ]);
    }
    public static function cancelPagamentoAfiliado($rifaPayIds) {
        foreach ($rifaPayIds as $id) {
           $ganhoAfiliado = where('rifa_pay_id', $id)->first();
           $ganhoAfiliado->delete();
        }
        return true;
    }
}
