import { useSetRecoilState } from "recoil";
import Alerta from "../../assets/Icons/alerta.svg?react";
import Fechar from "../../assets/Icons/fechamento.svg?react";
import { estadoErroCadastro } from "../../common/state/atom";

export default function MensagemErro() {
  const setErroCadastro = useSetRecoilState(estadoErroCadastro);

  return (
    <div className="relative flex items-center justify-between border border-solid border-red-400 bg-red-200 text-red-500 rounded-lg p-2 mb-4">
      <div className="flex items-center">
        <Alerta />
        <p className="ml-1 text-sm">O telefone informado já está cadastrado, tente outro!</p>
      </div>
      <button className="hover:text-red-800" onClick={() => setErroCadastro(null)} >
        <Fechar className="stroke-red-500 w-3 h-3" />
      </button>
    </div>
  );
}
