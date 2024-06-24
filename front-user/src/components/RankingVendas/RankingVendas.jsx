import Ranking from "../../assets/Icons/ranking.svg?react";
import Medalha from "../../assets/Icons/medalha.svg?react";

export default function RankingVendas() {
  const rankingUsuarios = [
    { id: 1, nome: 'Fermino Camargo', qtdNumeros: '15776'},
    { id: 2, nome: 'Rodrigo Moraes', qtdNumeros: '11399'},
    { id: 3, nome: 'Marielle', qtdNumeros: '6667'},
    { id: 4, nome: 'Lourenço', qtdNumeros: '4000'},
    { id: 5, nome: 'Sandra Santos', qtdNumeros: '4000'},
  ];

  return (
    <div className="mt-4">
      <h4 className="flex items-center gap-2 font-semibold mb-2 text-xl">
        <Ranking className="icon stroke-neutral-700" />
        <span className="text-neutral-700">Ranking de Vendas</span>
      </h4>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {rankingUsuarios.map((usuario) => (
          <div 
            key={usuario.id}
            className="bg-slate-300 rounded-lg p-4 flex items-center gap-x-2 text-neutral-700"
          >
            <Medalha />
  
            <div>
              <p className="font-medium leading-4 mb-1">{usuario.nome}</p>
              <p className="text-sm">Qtd. Números: <strong>{usuario.qtdNumeros}</strong></p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
