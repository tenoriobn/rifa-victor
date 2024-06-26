import Estrela from "../../assets/Icons/estrela.svg?react";
import TempoEncerrado from "../../assets/Icons/tempoEncerrado.svg?react";
import AccordionDescricao from "../../components/AccordionDescricao/AccordionDescricao";
import OpcoesDoEvento from "../../components/OpcoesDoEvento/OpcoesDoEvento";
import SlidePremio from "../../components/SlidePremio/SlidePremio";

export default function RifaFinalizada() {
  return (
    <>
      <div 
        className="flex flex-col-reverse md:flex-row items-center justify-between font-semibold text-neutral-800 mb-2"
      >
        <div className="flex items-center gap-x-1">
          <Estrela className="icon stroke-amber-500" />
          <h2>SAVEIRO CROSS DOS SONHOS</h2>
        </div>

        <div className="text-rose-500 flex items-center gap-1 text-xs">
          <p className="text-rose-500 flex items-center gap-1 text-xs"> Sorteio encerrado </p>
          <TempoEncerrado />
        </div>
      </div>

      <SlidePremio />
      <OpcoesDoEvento display={"hidden"} />

      <div className="bg-slate-100 p-2 rounded-lg">
        <h3 className="text-neutral-700">SAVEIRO CROSS CABINE DUPLA</h3>
      </div>

      <AccordionDescricao display={"hidden"} />
    </>
  )
}
