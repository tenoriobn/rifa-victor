import { useState } from 'react';
import CardCotasAtivas from './CardCotasAtivas/CardCotasAtivas';
import CardCotasResgatadas from './CardCotasResgatadas/CardCotasResgatadas';

export default function CotasPremiadas() {
  const [botaoSelecionado, setBotaoSelecionado] = useState('ativas');

  const botoes = [
    { id: 'ativas', label: 'Cotas Ativas' },
    { id: 'resgatadas', label: 'Cotas Resgatadas' }
  ];

  return (
    <div className="bg-slate-300 p-2 rounded-lg mt-4 mb-4">
      <p className="font-semibold text-neutral-700 mb-2">
        Cotas premiadas! Achou? Levou na hora
      </p>

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

      {botaoSelecionado === "ativas" ? <CardCotasAtivas /> : <CardCotasResgatadas />}
    </div>
  );
}