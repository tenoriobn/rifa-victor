import { useState } from "react";
import Perfil from "../../assets/Icons/perfil-2.svg?react";
import Sair from "../../assets/Icons/sair.svg?react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { estadoUsuario } from "../../common/state/atom";

export default function Usuario() {
  const [, setBotaoSelecionado] = useState("perfil");
  const navigate = useNavigate();
  const setUsuario = useSetRecoilState(estadoUsuario);
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    const rotaAtual = location.pathname;
    navigate(rotaAtual);
    setUsuario(null);
  };

  const links = [
    { id: "perfil", label: "Perfil", to: "meu-perfil" },
    { id: "meus-pedidos", label: "Meus Pedidos", to: "meus-pedidos" },
  ];

  return (
    <>
      <div className="flex items-center justify-between flex-wrap gap-2 bg-slate-300 rounded p-2 mb-2">
        <div className="flex items-center gap-2 text-xl ">
          <Perfil className="w-6 h-6" />
          <h2 className="text-xl font-semibold text-neutral-800">Usuário</h2>
        </div>

        <button
          className="flex items-center justify-center gap-1 group text-white rounded overflow-hidden shadow-transparent shadow-md hover:shadow-black/3 0 bg-red-600 px-4 py-1 font-medium"
          onClick={handleLogout}
        >
          Sair
          <Sair className="icon stroke-white fill-white" />
        </button>
      </div>

      <div className="relative rounded-lg p-1 bg-slate-400 h-10 inline-grid items-center grid-cols-2">
        {links.map((link) => (
          <Link
            key={link.id}
            className={`flex items-center justify-center outline-none h-8 px-3 text-sm font-medium rounded-md transition-colors ${
              location.pathname.includes(link.to)
                ? "bg-white text-gray-900"
                : "text-gray-500"
            }`}
            to={`/usuario/${link.to}`}
            onClick={() => setBotaoSelecionado(link.id)}
          >
            {link.label}
          </Link>
        ))}
      </div>

      <Outlet />
    </>
  );
}
