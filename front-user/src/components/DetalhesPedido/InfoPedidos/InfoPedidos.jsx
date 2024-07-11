import Whatsapp from "../../../assets/Icons/whatsapp.svg?react"

export default function InfoPedidos() {
  const informacoes = [
    { label: '🔢 Código:', value: '2290627' },
    { label: '🛍 Total de Cotas:', value: '35' },
    { label: '➕ Taxa:', value: 'R$ 0,00' },
    { label: '💲 Valor:', value: 'R$ 7,00' }
  ];

  return (
    <div className="flex flex-col-reverse md:flex-row w-full gap-8">
      <div className="grow bg-white p-4 rounded-md">
        {informacoes.map((info, index) => (
          <p key={index} className="text-neutral-700">
            <span className="font-semibold">{info.label} </span>
            {info.value}
          </p>
        ))}

        <div className="mt-4 flex gap-2 text-neutral-700">
          <p className="font-bold">⚠ Status:</p>
          <p className="text-amber-500">Aguardando pagamento</p>
        </div>

        <div className="mt-4 flex gap-2 text-neutral-700">
          <p className="font-bold">✅ Status:</p>
          <p className="text-amber-500">Finalizado</p>
        </div>

        <div className="mt-4 flex gap-2 text-neutral-700">
          <p className="font-bold">❌ Status:</p>
          <p className="text-red-500">Cancelado</p>
        </div>

        <div className="flex gap-2 text-neutral-700">
          <div className="font-bold">🗓 Pago em:</div>
          <div>20/06/24, 16:28</div>
        </div>

        <a 
          href="https://chat.whatsapp.com/11999999999"
          target="_blank"
          className="relative inline-block group text-white rounded overflow-hidden shadow-transparent shadow-md hover:shadow-black/3 0 text-xs bg-green-500"
        >
          <div className="absolute left-0 top-0 bg-green-700 w-0 group-hover:w-full transition-all duration-300 h-1/2"></div>
          <div className="absolute right-0 bottom-0 bg-green-700 w-0 group-hover:w-full transition-all duration-300 h-1/2"></div>

          <div className="relative px-4 py-1 transition-all flex items-center justify-center gap-1">
            <Whatsapp />
            Grupo Whatsapp
          </div>
        </a>
      </div>
    </div>
  )
}
