/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Estrela from "../../assets/Icons/estrela.svg?react";
import Presente from "../../assets/Icons/gift.svg?react";
import SlidePremio from "../../components/SlidePremio/SlidePremio";
import OpcoesDoEvento from "../../components/OpcoesDoEvento/OpcoesDoEvento";
import InputRange from "../../components/InputRange/InputRange";
import PacotesPromocionais from "../../components/PacotesPromocionais/PacotesPromocionais";
import CotasPremiadas from "../../components/CotasPremiadas/CotasPremiadas";
import AccordionDescricao from "../../components/AccordionDescricao/AccordionDescricao";
import RankingVendas from "../../components/RankingVendas/RankingVendas";
import AcessoUsuario from "../../components/AcessoUsuario/AcessoUsuario";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {  estadoProdutos, estadoRanking, estadoRenderizaComponenteCadastro, estadoRenderizaComponenteLogin, estadoRenderizaInfoUsuario, estadoRifa } from "../../common/state/atom";
import TempoEncerrado from "../../assets/Icons/tempoEncerrado.svg?react";
import { fetchDados } from "../../common/http/http";
import { motion } from 'framer-motion';
import { transicaoAnimada } from "../../common/util/transicaoAnimada";
import useFormattedDate from "../../common/state/hooks/useFormattedDate/useFormattedDate ";
import { initFacebookPixel } from "../../common/util/facebookPixel";

export default function Rifa() {
  const renderizaComponenteCadastro = useRecoilValue(estadoRenderizaComponenteCadastro);
  const renderizaComponenteLogin = useRecoilValue(estadoRenderizaComponenteLogin);
  const renderizaInfoUsuario = useRecoilValue(estadoRenderizaInfoUsuario);
  const [produto, setProduto] = useRecoilState(estadoProdutos);
  const [loading, setLoading] = useState(true);
  const setRifa = useSetRecoilState(estadoRifa)
  const setRanking = useSetRecoilState(estadoRanking)
  const { formattedDate } = useFormattedDate();
  const { slug, id } = useParams();
  
  useEffect(() => {
    const obterDados = async () => {
      const dados = await fetchDados(`/produtos/${slug}/${id}`);
      setProduto(dados.data.rifa);

      setLoading(false); 
      setRifa(dados.data.rifa)
      setRanking(dados.data.ranking);

      if (dados.data.rifa.rifa_others.facebook_pixel) {
        initFacebookPixel(dados?.data?.rifa?.rifa_others?.facebook_pixel);
      }
    };

    obterDados();    
  }, [slug, id]);

  if (loading) {
    return <div>Carregando...</div>; 
  }
  const renderizaComponente = produto.status === "ativas";
  const renderizaComponenteFuturas = produto.status === "futuras";

  const animacao = transicaoAnimada();

  return (
    <section>
      <motion.div 
        {...animacao}
        className="flex flex-col-reverse md:flex-row items-center justify-between font-semibold text-neutral-800 mb-2"
      >
        <div className="flex items-center gap-x-1">
          <Estrela className="icon stroke-green-500" />
          <h2>{produto.title}</h2>
        </div>

        {(!renderizaComponente || renderizaComponenteFuturas) && (
          <div className="text-rose-500 flex items-center gap-1 text-xs">
            {produto.status === "futuras" ? 
              <p className="text-green-500 flex items-center gap-1 text-xs"> 
                {formattedDate(produto.initial_sale)}
              </p>
              : <>              
                <p className="text-rose-500 flex items-center gap-1 text-xs"> 
                  Sorteio encerrado
                </p>

                <TempoEncerrado />
              </>
            }
          </div>
        )}
      </motion.div> 

      <SlidePremio />
      {console.log('renderizaInfoUsuario: ', renderizaInfoUsuario)}
      {!renderizaComponenteCadastro && !renderizaComponenteLogin && !renderizaInfoUsuario && (
        <motion.div
          {...animacao}
        >
          <OpcoesDoEvento display={`${renderizaComponente ? "flex" : "hidden"}`} />

          <div className="bg-gray-100 p-2 rounded-lg">
            <h3 className="text-neutral-700">{produto.description_resume}</h3>
          </div>

          { renderizaComponente &&
            produto?.rifa_awarded?.cotas_double === "sim" ?
              <div className="flex items-center gap-2 bg-slate-100 p-2 rounded-lg mt-4">
                <Presente />
                <h3 className="text-neutral-700 leading-normal">
                  {produto?.rifa_awarded?.text_cotas_double}
                </h3>
              </div>
            : ''
          }

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
          {console.log('accordions: ', renderizaComponente)}

          {renderizaComponente && (
            <RankingVendas />
          )}
        </motion.div>
      )}

      {((renderizaComponenteCadastro || renderizaComponenteLogin || renderizaInfoUsuario) && renderizaComponente ? <AcessoUsuario /> : null)}
    </section>
  )
}
