import { useRecoilValue } from "recoil";
import SetaEsquerda from "../../assets/Icons/seta.svg?react";
import Verificado from "../../assets/Icons/verificado.svg?react"
import TermosCondicoes from "./TermosCondicoes/TermosCondicoes";
import { estadoFormularioPreenchido, estadoTermosAceito, estadoValorCompra } from "../../common/state/atom";
import FormulariosAcesso from "./FormulariosAcesso/FormulariosAcesso";
import useAlternarFormularios from "../../common/state/hooks/FormulariosAcesso/useAlternarFormularios";

export default function AcessoUsuario() {
  const valorCompra = useRecoilValue(estadoValorCompra);
  const termosAceito = useRecoilValue(estadoTermosAceito);
  const camposPreenchidos = useRecoilValue(estadoFormularioPreenchido);
  const { voltarParaRifa } = useAlternarFormularios();

  return (
    <>
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
          className="flex items-center justify-center gap-1 group text-white rounded overflow-hidden shadow-transparent shadow-md hover:shadow-black/3 0 bg-red-600 px-4 py-1 font-medium"
          onClick={voltarParaRifa}
        >
          <SetaEsquerda className="icon stroke-white fill-white rotate-90" />
          Voltar 
        </button>

        <button 
          className="text-white rounded overflow-hidden shadow-transparent shadow-md hover:shadow-black/3 0 bg-emerald-600 disabled:bg-slate-300 px-4 py-1 flex items-center justify-center gap-1"
          disabled={!termosAceito || !camposPreenchidos}
        >
          Finalizar Pedido 
          <Verificado className="icon" />
        </button>
      </div>
    </>
  )
}
