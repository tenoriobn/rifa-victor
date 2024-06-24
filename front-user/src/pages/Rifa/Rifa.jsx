import Estrela from "../../assets/Icons/estrela.svg?react";
import SlidePremio from "../../components/SlidePremio/SlidePremio";
import OpcoesDoEvento from "../../components/OpcoesDoEvento/OpcoesDoEvento";
import InputRange from "../../components/InputRange/InputRange";
import PacotesPromocionais from "../../components/PacotesPromocionais/PacotesPromocionais";
import CotasPremiadas from "../../components/CotasPremiadas/CotasPremiadas";
import AccordionDescricao from "../../components/AccordionDescricao/AccordionDescricao";
import RankingVendas from "../../components/RankingVendas/RankingVendas";

export default function Rifa() {
  return (
    <section>
      <div className="flex flex-col-reverse gap-1 md:flex-row items-center font-semibold text-neutral-800 mb-2">
        <Estrela className="icon stroke-amber-500" />
        <h2>SAVEIRO CROSS DOS SONHOS</h2>
      </div>

      <SlidePremio />

      <OpcoesDoEvento />

      <div className="bg-slate-100 p-2 rounded-lg">
        <h3 className="text-neutral-700">SAVEIRO CROSS CABINE DUPLA</h3>
      </div>

      <div className='py-4 text-neutral-700'>
        <InputRange />
        <PacotesPromocionais />
      </div>

      <CotasPremiadas />

      <AccordionDescricao />

      <RankingVendas />
    </section>
  )
}
