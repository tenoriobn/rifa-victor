
import { useRecoilValue } from "recoil";
import { estadoRenderizaComponenteCadastro, estadoRenderizaComponenteLogin } from "../../../common/state/atom";
import FormularioCadastro from "../../FormularioCadastro/FormularioCadastro";
import FormularioLogin from "../../FormularioLogin/FormularioLogin";
import useAlternarFormularios from "../../../common/state/hooks/FormulariosAcesso/useAlternarFormularios";

export default function FormulariosAcesso() {
  const renderizaComponenteCadastro = useRecoilValue(estadoRenderizaComponenteCadastro);
  const renderizaComponenteLogin = useRecoilValue(estadoRenderizaComponenteLogin);
  const { alterarParaCadastro, alterarParaLogin } = useAlternarFormularios();

  return (
    <div className="bg-slate-100 p-4 rounded-lg mb-4">
      <div className="flex flex-wrap justify-between border-b border-solid border-b-slate-300 mb-4  pb-2">
        {renderizaComponenteLogin &&
          <>
            <h3 className="text-lg text-neutral-700 font-semibold"> Fazer login </h3>

            <button
              className="relative inline-block group text-white rounded overflow-hidden shadow-transparent shadow-md hover:shadow-black/3 0 bg-sky-500 text-sm  px-4 py-1 font-semibold"
              onClick={alterarParaCadastro}
            >
              Quero me registrar
            </button>
          </>
        }

        {renderizaComponenteCadastro &&
          <> 
            <h3 className="text-lg text-neutral-700 font-semibold"> Fazer login </h3>       
            <button
              className="relative inline-block group text-white rounded overflow-hidden shadow-transparent shadow-md hover:shadow-black/3 0 bg-sky-500 text-sm  px-4 py-1 font-semibold"
              onClick={alterarParaLogin}
            >
              Já sou cliente! 
            </button>
          </>
        }
      </div>
      
      {renderizaComponenteCadastro && <FormularioCadastro />}
      {renderizaComponenteLogin && <FormularioLogin />}
    </div>
  )
}
