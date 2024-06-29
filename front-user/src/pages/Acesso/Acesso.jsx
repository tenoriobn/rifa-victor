/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import PerfilTitulo from "../../assets/Icons/perfil-2.svg?react";
import FormularioLogin from "../../components/FormularioLogin/FormularioLogin";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { estadoUsuario } from "../../common/state/atom";

export default function Acesso() {
  const [error, ] = useState("");
  const [usuario, ] = useRecoilState(estadoUsuario);
  const navigate = useNavigate();

  useEffect(() => {
    if (usuario) {
      navigate("/usuario");
    }
  }, [usuario, navigate]);

  return (
    <div className="text-neutral-700 flex flex-col items-center">
      <PerfilTitulo />
      <h2 className="text-2xl mb-4"><strong>Oi!!</strong> Vamos conferir seus pedidos?</h2>
      <p>Primero você precisa estar logado.</p>
      <p className="mb-6">Informe seu telefone e CPF para continuarmos.</p>

      {error && <div className="bg-red-200 border border-red-500 text-red-500 px-4 py-3 rounded relative mb-4 w-full max-w-[420px] mx-auto">
        <p className="text-red-500">{error}</p>
      </div>}

      <FormularioLogin />
    </div>
  )
}
