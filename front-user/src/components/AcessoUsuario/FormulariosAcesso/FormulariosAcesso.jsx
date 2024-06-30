
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { estadoRenderizaComponenteCadastro, estadoRenderizaComponenteLogin, estadoRenderizaInfoUsuario, estadoUsuario } from "../../../common/state/atom";
import FormularioCadastro from "../../FormularioCadastro/FormularioCadastro";
import FormularioLogin from "../../FormularioLogin/FormularioLogin";
import useAlternarFormularios from "../../../common/state/hooks/FormulariosAcesso/useAlternarFormularios";
import DadosUsuario from "../../DadosUsuario/DadosUsuario";

export default function FormulariosAcesso() {
  const renderizaComponenteCadastro = useRecoilValue(estadoRenderizaComponenteCadastro);
  const [renderizaInfoUsuario, setRenderizaInfoUsuario] = useRecoilState(estadoRenderizaInfoUsuario);
  const [renderizaComponenteLogin, setRenderizaComponenteLogin] = useRecoilState(estadoRenderizaComponenteLogin);
  const { alterarParaCadastro, alterarParaLogin } = useAlternarFormularios();
  const setUsuario = useSetRecoilState(estadoUsuario);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    setRenderizaInfoUsuario(false);
    setRenderizaComponenteLogin(true);
    setUsuario(null);
  };

  return (
    <div className="bg-slate-100 p-4 rounded-lg mb-4">
      <div className="flex flex-wrap justify-between border-b border-solid border-b-slate-300 mb-4  pb-2">
        {renderizaComponenteLogin &&
          <>
            <h3 className="text-lg text-neutral-700 font-semibold"> Fazer login </h3>

            <button
              className="relative inline-block group text-white rounded overflow-hidden shadow-transparent shadow-md hover:shadow-black/3 0 bg-sky-500 text-sm"
              onClick={alterarParaCadastro}
            >
              <div className="absolute left-0 top-0 bg-sky-600 w-0 group-hover:w-full transition-all duration-300 h-1/2"></div>
              <div className="absolute right-0 bottom-0 bg-sky-600 w-0 group-hover:w-full transition-all duration-300 h-1/2"></div>
              <div className="relative px-4 py-1 transition-all duration-300 flex items-center justify-center gap-1">
                Quero me registrar
              </div>
            </button>
          </>
        }

        {renderizaComponenteCadastro &&
          <> 
            <h3 className="text-lg text-neutral-700 font-semibold"> Registrar Conta </h3>       
            <button
              className="relative inline-block group text-white rounded overflow-hidden shadow-transparent shadow-md hover:shadow-black/3 0 bg-sky-500 text-sm"
              onClick={alterarParaLogin}
            >
              <div className="absolute left-0 top-0 bg-sky-600 w-0 group-hover:w-full transition-all duration-300 h-1/2"></div>
              <div className="absolute right-0 bottom-0 bg-sky-600 w-0 group-hover:w-full transition-all duration-300 h-1/2"></div>
              <div className="relative px-4 py-1 transition-all duration-300 flex items-center justify-center gap-1">
                Já sou cliente! 
              </div>
            </button>
          </>
        }

        {renderizaInfoUsuario &&
          <> 
            <h3 className="text-lg text-neutral-700 font-semibold"> Usar dados de: </h3>       
            <button
              className="relative inline-block group text-white rounded overflow-hidden shadow-transparent shadow-md hover:shadow-black/3 0 bg-sky-500 text-sm"
              onClick={handleLogout}
            >
              <div className="absolute left-0 top-0 bg-sky-600 w-0 group-hover:w-full transition-all duration-300 h-1/2"></div>
              <div className="absolute right-0 bottom-0 bg-sky-600 w-0 group-hover:w-full transition-all duration-300 h-1/2"></div>
              <div className="relative px-4 py-1 transition-all duration-300 flex items-center justify-center gap-1">
                Esse não sou eu 
              </div>
            </button>
          </>
        }
      </div>
      
      {renderizaComponenteCadastro && <FormularioCadastro />}
      {renderizaComponenteLogin && <FormularioLogin />}
      {renderizaInfoUsuario && <DadosUsuario />}

    </div>
  )
}
