/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Estrela from "../../assets/Icons/estrela.svg?react";
import SlidePremio from "../../components/SlidePremio/SlidePremio";
import OpcoesDoEvento from "../../components/OpcoesDoEvento/OpcoesDoEvento";
import InputRange from "../../components/InputRange/InputRange";
import PacotesPromocionais from "../../components/PacotesPromocionais/PacotesPromocionais";
import CotasPremiadas from "../../components/CotasPremiadas/CotasPremiadas";
import AccordionDescricao from "../../components/AccordionDescricao/AccordionDescricao";
import RankingVendas from "../../components/RankingVendas/RankingVendas";
import AcessoUsuario from "../../components/AcessoUsuario/AcessoUsuario";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {  estadoRenderizaComponenteCadastro, estadoRenderizaComponenteLogin, estadoRifa } from "../../common/state/atom";
import TempoEncerrado from "../../assets/Icons/tempoEncerrado.svg?react";
import { fetchDados } from "../../common/http/http";

export default function Rifa() {
  const renderizaComponenteCadastro = useRecoilValue(estadoRenderizaComponenteCadastro);
  const renderizaComponenteLogin = useRecoilValue(estadoRenderizaComponenteLogin);

  const [produto, setProduto] = useState();
  const [loading, setLoading] = useState(true);
  const setRifa = useSetRecoilState(estadoRifa)
  const { slug, id } = useParams();
  
  useEffect(() => {
    const obterDados = async () => {
      const dados = await fetchDados(`/produtos/${slug}/${id}`);
      setProduto(dados.data);
      setLoading(false); 
      setRifa(dados.data)
    
    };
    
    obterDados();
  }, [slug, id]);

  if (loading) {
    return <div>Carregando...</div>; 
  }
  const renderizaComponente = produto.status === "ativas";

  return (
    <section>
      <div 
        className="flex flex-col-reverse md:flex-row items-center justify-between font-semibold text-neutral-800 mb-2"
      >
        <div className="flex items-center gap-x-1">
          <Estrela className="icon stroke-amber-500" />
          <h2>{produto.title}</h2>
        </div>

        {!renderizaComponente && (
          <div className="text-rose-500 flex items-center gap-1 text-xs">
            <p className="text-rose-500 flex items-center gap-1 text-xs"> Sorteio encerrado </p>
            <TempoEncerrado />
          </div>
        )}
      </div> 

      <SlidePremio />
      
      {!renderizaComponenteCadastro && !renderizaComponenteLogin && (
        <>
          <OpcoesDoEvento display={`${renderizaComponente ? "flex" : "hidden"}`} />

          <div className="bg-slate-100 p-2 rounded-lg">
            <h3 className="text-neutral-700">{produto.description_resume}</h3>
          </div>

          {renderizaComponente && (
            <>
              <div className='py-4 text-neutral-700'>
                <InputRange />
                <PacotesPromocionais />
              </div>

              <CotasPremiadas />
            </>
          )}

          <AccordionDescricao display={`${renderizaComponente ? "flex" : "hidden"}`} />

          {renderizaComponente && (
            <RankingVendas />
          )}
        </>
      )}

      {renderizaComponenteCadastro || renderizaComponenteLogin ? (
        <AcessoUsuario />
      ) : ''}
    </section>
  )
}
