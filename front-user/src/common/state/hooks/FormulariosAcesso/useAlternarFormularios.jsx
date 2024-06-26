import { useSetRecoilState } from "recoil";
import { estadoRenderizaComponenteCadastro, estadoRenderizaComponenteLogin } from "../../atom";

const useAlternarFormularios = () => {
  const setRenderizaComponenteCadastro = useSetRecoilState(estadoRenderizaComponenteCadastro);
  const setRenderizaComponenteLogin = useSetRecoilState(estadoRenderizaComponenteLogin);

  const alterarParaCadastro = () => {
    setRenderizaComponenteLogin(false);
    setRenderizaComponenteCadastro(true);
  };

  const alterarParaLogin = () => {
    setRenderizaComponenteCadastro(false);
    setRenderizaComponenteLogin(true);
  };

  const voltarParaRifa = () => {
    setRenderizaComponenteCadastro(false);
    setRenderizaComponenteLogin(false);
  }

  return {
    alterarParaCadastro,
    alterarParaLogin,
    voltarParaRifa
  };
};

export default useAlternarFormularios;
