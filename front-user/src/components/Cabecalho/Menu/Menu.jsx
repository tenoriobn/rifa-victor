import { Link } from 'react-router-dom';
import Fechamento from "../../../assets/Icons/fechamento.svg?react";
import Inicio from "../../../assets/Icons/inicio.svg?react";
import Carrinho from "../../../assets/Icons/carrinho.svg?react";
import Trofeu from "../../../assets/Icons/trofeu.svg?react";
import Perfil from "../../../assets/Icons/perfil.svg?react";
import Pedidos from "../../../assets/Icons/pedidos.svg?react";
import useAtivarMenu from '../../../common/state/hooks/Menu/useAtivarMenu';

export default function Menu() {
  const { menuAtivo, setMenuAtivo, menuRef } = useAtivarMenu();

  const links = [
    { "to": "/", "icon": Inicio, "label": "Home" },
    { "to": "/produtos", "icon": Carrinho, "label": "Produtos" },
    { "to": "/ganhadores", "icon": Trofeu, "label": "Ganhadores" },
    { "to": "/usuario/meu-perfil", icon: Perfil, "label": "Meu Perfil" },
    { "to": "/usuario/meus-pedidos", "icon": Pedidos, "label": "Meus Pedidos" }
  ]

  return (
    <>
      {menuAtivo && (
        <div className="fixed inset-0 bg-black/90 z-[999]">
          <div ref={menuRef} className="absolute top-0 right-0 h-full w-full max-w-sm bg-black/90">
            <div className="absolute top-0 right-0 p-4">
              <button
                className="p-2 hover:bg-white/10 transition-all duration-300 rounded-lg"
                onClick={() => setMenuAtivo(!menuAtivo)}
              >
                <Fechamento className="stroke-white fill-white" />
              </button>
            </div>

            <div className="flex flex-col gap-y-4 p-8 text-xl font-normal text-neutral-400">
              {links.map(({ to, icon: Icon, label }) => (
                <Link
                  key={to}
                  to={to}
                  onClick={() => setMenuAtivo(!menuAtivo)}
                  className="flex items-center gap-4 hover:text-neutral-100 transition-all duration-300 stroke-neutral-400 hover:stroke-neutral-100"
                >
                  <Icon />
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
