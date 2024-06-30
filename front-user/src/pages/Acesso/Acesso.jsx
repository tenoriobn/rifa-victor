/* eslint-disable react/prop-types */
import { useEffect } from "react";
import PerfilTitulo from "../../assets/Icons/perfil-2.svg?react";
import FormularioLogin from "../../components/FormularioLogin/FormularioLogin";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { estadoErro, estadoUsuario } from "../../common/state/atom";

export default function Acesso() {
  const [erro, setErro] = useRecoilState(estadoErro);
  const [usuario, ] = useRecoilState(estadoUsuario);
  const navigate = useNavigate();

  useEffect(() => {
    if (usuario) {
      navigate("/usuario");
    }
  }, [usuario, navigate]);

  useEffect(() => {
    if (erro) {
      const timer = setTimeout(() => {
        setErro(null);
      }, 6000);

      return () => clearTimeout(timer); 
    }
  }, [erro, setErro]);

  return (
    <div className="text-neutral-700 flex flex-col items-center">
      <PerfilTitulo />
      <h2 className="text-2xl mb-4"><strong>Oi!!</strong> Vamos conferir seus pedidos?</h2>
      <p>Primero você precisa estar logado.</p>
      <p className="mb-6">Informe seu telefone para continuarmos.</p>

      {erro && <div className="bg-red-200 border border-red-500 text-red-500 px-4 py-3 rounded relative mb-4 w-full max-w-[420px] mx-auto">
        <p className="text-red-500">Telefone Inválido</p>
      </div>}

      <FormularioLogin />
    </div>
  )
}
