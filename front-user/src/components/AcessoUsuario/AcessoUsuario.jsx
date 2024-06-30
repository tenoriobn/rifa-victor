import { useRecoilValue, useSetRecoilState } from "recoil";
import { estadoErroCadastro, estadoFinalizarPedido, estadoFormularioPreenchido, estadoRenderizaComponenteCadastro, estadoTermosAceito, estadoUsuario, estadoValorCompra } from "../../common/state/atom";
import useAlternarFormularios from "../../common/state/hooks/FormulariosAcesso/useAlternarFormularios";
import FormulariosAcesso from "./FormulariosAcesso/FormulariosAcesso";
import TermosCondicoes from "./TermosCondicoes/TermosCondicoes";
import SetaEsquerda from "../../assets/Icons/seta.svg?react";
import Verificado from "../../assets/Icons/verificado.svg?react"
import MensagemErro from "../MensagemErro/MensagemErro";

export default function AcessoUsuario() {
  const renderizaComponenteCadastro = useRecoilValue(estadoRenderizaComponenteCadastro);
  const setFinalizarPedido = useSetRecoilState(estadoFinalizarPedido);
  const valorCompra = useRecoilValue(estadoValorCompra);
  const termosAceito = useRecoilValue(estadoTermosAceito);
  const camposPreenchidos = useRecoilValue(estadoFormularioPreenchido);
  const { voltarParaRifa } = useAlternarFormularios();
  const usuario = useRecoilValue(estadoUsuario);
  const erroCadastro = useRecoilValue(estadoErroCadastro);

  const handleClick = () => {
    setFinalizarPedido(true);
  }

  return (
    <>
      {erroCadastro && <MensagemErro />}
      <FormulariosAcesso />

      <div className="mb-4 p-2 bg-emerald-100 text-emerald-600 border-emerald-500/40 border border-solid rounded-lg">
        <p>
          Valor do pedido: 
          <span className="font-bold text-lg"> R$&nbsp;{valorCompra}</span>
        </p>
      </div>

      <TermosCondicoes />

      <div
        className="flex flex-col gap-2 sm:flex-row items-center justify-between"
      >
        <button
          className="relative inline-block group text-white rounded overflow-hidden shadow-transparent shadow-md hover:shadow-black/3 0 bg-red-600"
          onClick={voltarParaRifa}
        >
          <div className="absolute left-0 top-0 bg-red-700 w-0 group-hover:w-full transition-all duration-300 h-1/2"></div>
          <div className="absolute right-0 bottom-0 bg-red-700 w-0 group-hover:w-full transition-all duration-300 h-1/2"></div>
          <div className="relative px-4 py-1 transition-all flex items-center justify-center gap-1">
            <SetaEsquerda className="icon stroke-white fill-white rotate-90" />
            Voltar 
          </div>
        </button>

        <button 
          className="relative inline-block group text-white rounded overflow-hidden shadow-transparent shadow-md hover:shadow-black/3 0 bg-emerald-600 disabled:bg-slate-300"
          disabled={!termosAceito || (renderizaComponenteCadastro && !camposPreenchidos) || (!renderizaComponenteCadastro && (!termosAceito || !usuario))}
          onClick={handleClick}
        >
          <div className="absolute left-0 top-0 bg-emerald-700 w-0 group-hover:w-full transition-all h-1/2"></div>
          <div className="absolute right-0 bottom-0 bg-emerald-700 w-0 group-hover:w-full transition-all h-1/2"></div>
          <div className="relative px-4 py-1 transition-all flex items-center justify-center gap-1">
            Finalizar Pedido 
            <Verificado className="icon" />
          </div>
        </button>
      </div>
    </>
  )
}
