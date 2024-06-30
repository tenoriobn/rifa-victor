export default function ModoPagamento() {
  return (
    <div className="my-4 bg-sky-100 border-l-4 border-sky-500 text-sky-700 p-4 rounded">
      <div className="flex gap-2 justify-between items-center">
        <div>
          <h4 className="font-semibold">Clique no botão &quot;Pagar&quot; para gerar o PIX e concluir sua compra.</h4>
          <p>Após o pagamento, confira seu e-mail para detalhes da compra e cotas adquiridas.</p>
          <p>Você pode verificar seu pedido em acessos futuros acessando &quot;Meus Pedidos&quot; no menu ou clicando no seu nome.</p>
        </div>
        <button 
          className="py-2 px-6 text-xl bg-blue-500 text-white rounded-lg border border-solid border-blue-500 hover:bg-blue-600 transition-colors active:bg-blue-700 disabled:bg-neutral-400"
        >
          Pagar 
        </button>
      </div>

      <div className="mt-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded">
        <h4 className="font-bold">Falha!</h4>
        <p>Pedido expirado, refaça o pedido. (2194)</p>
        <p className="text-sm">Tente novamente em alguns instantes</p>
      </div>
    </div>
  )
}
