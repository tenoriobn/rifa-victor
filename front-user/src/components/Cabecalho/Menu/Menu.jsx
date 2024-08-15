import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Fechamento from "../../../assets/Icons/fechamento.svg?react";
import Inicio from "../../../assets/Icons/inicio.svg?react";
import Carrinho from "../../../assets/Icons/carrinho.svg?react";
import Trofeu from "../../../assets/Icons/trofeu.svg?react";
import Perfil from "../../../assets/Icons/perfil.svg?react";
import Pedidos from "../../../assets/Icons/pedidos.svg?react";
import useAtivarMenu from '../../../common/state/hooks/Menu/useAtivarMenu';
import { motion } from 'framer-motion';
import { transicaoAnimadaMenu } from '../../../common/util/transicaoAnimada';

export default function Menu() {
  const [esmaecendoFechar, setEsmaecendoFechar] = useState(false);
  const { menuAtivo, setMenuAtivo, menuRef } = useAtivarMenu(setEsmaecendoFechar);
  const location = useLocation();

  useEffect(() => {
    if (!menuAtivo && esmaecendoFechar) {
      const timeout = setTimeout(() => {
        setMenuAtivo(false);
        setEsmaecendoFechar(false);
      }, 290);
      return () => clearTimeout(timeout);
    }
  }, [menuAtivo, esmaecendoFechar, setMenuAtivo]);

  const links = [
    { to: "/", icon: Inicio, label: "Home" },
    { to: "/produtos", icon: Carrinho, label: "Produtos" },
    { to: "/ganhadores", icon: Trofeu, label: "Ganhadores" },
    { to: "/usuario/meu-perfil", icon: Perfil, label: "Meu Perfil" },
    { to: "/usuario/meus-pedidos", icon: Pedidos, label: "Meus Pedidos" }
  ];

  const animacao = transicaoAnimadaMenu();

  return (
    <div>
      {(menuAtivo || esmaecendoFechar) && (
        <div className={`fixed inset-0 bg-black/90 z-[999] transition-opacity duration-300 ${esmaecendoFechar ? 'opacity-0' : 'opacity-100'}`}>
          <motion.div 
            {...animacao}
            ref={menuRef} 
            className="absolute top-0 right-0 h-full w-full max-w-sm bg-gray-50 border-l border-neutral-700	"
          >
            <div className="absolute top-0 right-0 p-4">
              <button
                className="p-2 hover:bg-white/10 transition-all duration-300 rounded-lg"
                onClick={() => {
                  setEsmaecendoFechar(true);
                  setTimeout(() => setMenuAtivo(false), 290);
                }}
              >
                <Fechamento className="stroke-neutral-700 fill-neutral-700" />
              </button>
            </div>

            <div className="flex flex-col gap-y-4 p-8 text-xl font-normal text-neutral-400">
              {links.map(({ to, icon: Icon, label }) => (
                <Link
                  key={to}
                  to={to}
                  onClick={() => {
                    // setEsmaecendoFechar(true);
                    setTimeout(() => setMenuAtivo(false), 0);
                  }}
                  className={`flex items-center gap-4  transition-all duration-300 hover:stroke-green-400 ${
                    location.pathname === to ? 'text-green-400 stroke-green-400' : 'text-neutral-800 stroke-neutral-800 hover:text-green-400'
                  }`}
                >
                  <Icon />
                  {label}
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
