import { Link } from "react-router-dom"
import MenuIcon from "../../assets/Icons/menu.svg?react"
import Perfil from "../../assets/Icons/perfil-2.svg?react"
import Menu from "./Menu/Menu"
import { useRecoilState, useRecoilValue } from "recoil";
import { estadoMenuAtivo, estadoUsuario, stateSiteConfig } from "../../common/state/atom";
import useFormatarUsuario from "../../common/state/hooks/Cabecalho/useFormatarNome";

export default function Cabecalho() {
  const [menuAtivo, setMenuAtivo] = useRecoilState(estadoMenuAtivo);
  const usuario = useRecoilValue(estadoUsuario);
  const { nomeFormatado, inicialNome } = useFormatarUsuario(usuario);
  const siteConfig = useRecoilValue(stateSiteConfig);

  const logoSrc = siteConfig?.logo_dark || siteConfig?.logo_light;

  return (
    <>    
      <div className="bg-white border-b text-neutral-200">
        <div className="flex justify-between items-center max-w-2xl mx-auto pt-4 pb-8 px-4">
          
          {logoSrc ? (
              <img src={logoSrc} alt="LogoTipo" className="max-h-[30px]" />
            ) : (
              <div />
          )}

          <div className="flex items-center gap-2">
            {usuario ?             
              <Link 
                aria-current="page" 
                to="/usuario/meu-perfil" 
                className="router-link-active router-link-exact-active flex flex-row-reverse items-center gap-2 p-2 hover:bg-gray-100 transition-all duration-300 rounded-lg text-neutral-800"
              >
                <div 
                  className="bg-slate-700 text-neutral-200 h-8 w-8 rounded-full inline-flex items-center justify-center ring-offset-2"
                >
                  {inicialNome}
                </div> 
                
                  Olá, {nomeFormatado?.split(' ')[0]}
              </Link>
              :

              <Link 
                className="p-2 hover:bg-gray-100 transition-all duration-300 rounded-lg"
                to="/usuario/meu-perfil"
              >
                <Perfil className="fill-black/90 w-7 h-7"  />
              </Link>
            }

            <button 
              className="p-2 hover:bg-gray-100 transition-all duration-300 rounded-lg"
              onClick={() => setMenuAtivo(!menuAtivo)}
            >
              <MenuIcon className="fill-black/90" />
            </button>
          </div>
        </div>
      </div>

      <Menu />
    </>
  )
}
