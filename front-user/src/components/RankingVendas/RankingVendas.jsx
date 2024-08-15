import Ranking from "../../assets/Icons/ranking.svg?react";
import Medalha from "../../assets/Icons/medalha.svg?react";
import { estadoRanking } from "../../common/state/atom";
import { useRecoilValue } from "recoil";

export default function RankingVendas() {
  const rankingUsuarios = useRecoilValue(estadoRanking);

  return (
    <div className="mt-4">
      <h4 className="flex items-center gap-2 font-semibold mb-2 text-xl">
        <Ranking className="icon stroke-neutral-700" />
        <span className="text-neutral-700">Ranking de Vendas</span>
      </h4>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {rankingUsuarios.map((usuario) => (
           usuario && usuario.client ? (
          <div 
            key={usuario.client_id}
            className="bg-gray-100 rounded-lg p-4 flex items-center gap-x-2 text-neutral-700"
          >
            <Medalha />
  
            <div>
              <p className="font-medium leading-4 mb-1">{usuario.client.name}</p>
              <p className="text-sm">Qtd. Números: <strong>{usuario.total_numbers}</strong></p>
            </div>
          </div>
            ) : null
        ))}
      </div>
    </div>
  )
}
