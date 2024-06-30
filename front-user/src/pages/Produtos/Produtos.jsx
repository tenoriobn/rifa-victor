import { useState } from "react";
import CabecalhoSecao from "../../components/CabecalhoSecao/CabecalhoSecao";
import CardProdutos from "../../components/CardProdutos/CardProdutos";
import Estrela from "../../assets/Icons/estrela.svg?react";

export default function Produtos() {
  const [categoria, setCategoria] = useState("ativas");

  const botoes = [
    { texto: "Ativas", categoria: "ativas" },
    { texto: "Finalizadas", categoria: "finalizadas" },
    { texto: "Futuras", categoria: "futuras", disabled: true }
  ];

  return (
    <article className="flex flex-col">
      <CabecalhoSecao 
        subtitulo="Ofertas" 
        paragrafo=" Escolha sua sorte!"
        Icone={Estrela}
      />

      <div className="flex gap-2 w-full justify-end mb-4">
        {botoes.map((botao) => (
          <button
            key={botao.categoria}
            className={`px-2 py-1 rounded-lg transition-all duration-300 cursor-pointer ${
              categoria === botao.categoria ? "bg-sky-600 text-white" : "bg-neutral-300 text-neutral-700"
            } ${botao.disabled ? "cursor-not-allowed disabled:bg-neutral-400" : "hover:bg-sky-300"}`}
            onClick={() => setCategoria(botao.categoria)}
            disabled={botao.disabled}
          >
            {botao.texto}
          </button>
        ))}
      </div>

      <CardProdutos categoria={categoria} />

    </article>
  )
}
