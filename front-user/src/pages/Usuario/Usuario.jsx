import { useState } from "react";
import Perfil from "../../assets/Icons/perfil-2.svg?react";
import Sair from "../../assets/Icons/sair.svg?react";
import MeusDados from "../../components/MeusDados/MeusDados";
import MeusPedidos from "../../components/MeusPedidos/MeusPedidos";

export default function Usuario() {
  const [botaoSelecionado, setBotaoSelecionado] = useState('perfil');

  const botoes = [
    { id: 'perfil', label: 'Perfil' },
    { id: 'meus-pedidos', label: 'Meus Pedidos' }
  ];

  return (
    <>
      <div className="flex items-center justify-between flex-wrap gap-2 bg-slate-300 rounded p-2 mb-2">
        <div className="flex items-center gap-2 text-xl ">
          <Perfil className="w-6 h-6" />
          <h2 className="text-xl font-semibold text-neutral-800">
            Usuário
          </h2>
        </div>

        <button
            className="flex items-center justify-center gap-1 group text-white rounded overflow-hidden shadow-transparent shadow-md hover:shadow-black/3 0 bg-red-600 px-4 py-1 font-medium"
          >
            Sair
            <Sair className="icon stroke-white fill-white" />
        </button>
      </div>

      <div className="relative rounded-lg p-1 bg-slate-400 h-10 inline-grid items-center grid-cols-2">
        {botoes.map((botao) => (
          <button
            key={botao.id}
            className={`outline-none disabled:cursor-not-allowed h-8 px-3 text-sm font-medium rounded-md transition-colors ${
              botaoSelecionado === botao.id ? 'bg-white text-gray-900' : 'text-gray-500'
            }`}
            type="button"
            onClick={() => setBotaoSelecionado(botao.id)}
          >
            {botao.label}
          </button>
        ))}
      </div>

      {
        botaoSelecionado === "perfil" ? <MeusDados /> : <MeusPedidos />
      }
    </>
  )
}
