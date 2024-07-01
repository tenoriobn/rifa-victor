import { useSetRecoilState } from "recoil";
import { estadoRenderizaComponenteCadastro, estadoRenderizaComponenteLogin, estadoRenderizaInfoUsuario } from "../../atom";

const useAlternarFormularios = () => {
  const setRenderizaComponenteCadastro = useSetRecoilState(estadoRenderizaComponenteCadastro);
  const setRenderizaComponenteLogin = useSetRecoilState(estadoRenderizaComponenteLogin);
  const setRenderizaInfoUsuario = useSetRecoilState(estadoRenderizaInfoUsuario);

  const alterarParaCadastro = () => {
    setRenderizaComponenteLogin(false);
    setRenderizaComponenteCadastro(true);
  };

  const alterarParaLogin = () => {
    setRenderizaComponenteCadastro(false);
    setRenderizaInfoUsuario(false);
    setRenderizaComponenteLogin(true);
  };

  const voltarParaRifa = () => {
    setRenderizaComponenteCadastro(false);
    setRenderizaComponenteLogin(false);
    setRenderizaInfoUsuario(false);
  }

  return {
    alterarParaCadastro,
    alterarParaLogin,
    voltarParaRifa
  };
};

export default useAlternarFormularios;
