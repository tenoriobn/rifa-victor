export default function ResumoPedido() {
  return (
    <div>
      <h3 className="my-2 font-semibold text-neutral-700">Resumo do Pedido</h3>

      <div 
        className="mb-8 bg-amber-100 border-l-4 border-amber-500 text-amber-700 p-4 rounded" role="alert"
      >
        <p className="font-bold">Pedido Gerado</p><p>Aguardando confirmação de pagamento!</p>

        <p> Pedido Aprovado em <span className="font-semibold">20/06/2024, 16:28:36</span></p>
      </div>
    </div>
  )
}
