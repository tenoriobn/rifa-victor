import { Link } from "react-router-dom"
import MenuIcon from "../../assets/Icons/menu.svg?react"
import Menu from "./Menu/Menu"
import { useRecoilState } from "recoil";
import { estadoMenuAtivo } from "../../common/state/atom";

export default function Cabecalho() {
  const [menuAtivo, setMenuAtivo] = useRecoilState(estadoMenuAtivo);

  return (
    <>    
      <div className="bg-neutral-950 text-neutral-200">
        <div className="flex justify-end items-center max-w-2xl mx-auto pt-4 pb-8 px-4">
          <div className="flex items-center gap-2">
            <Link 
              aria-current="page" 
              to="/usuario" 
              className="router-link-active router-link-exact-active flex flex-row-reverse items-center gap-2 p-2 hover:bg-amber-300/20 transition-all rounded-lg"
            >
              <div 
                className="bg-slate-700 h-8 w-8 rounded-full inline-flex items-center justify-center ring-offset-2"
              >
                H
              </div> 
              
                Olá, Helvécio
            </Link>

            <button 
              className="p-2 hover:bg-amber-300/20 transition-all rounded-lg"
              onClick={() => setMenuAtivo(!menuAtivo)}
            >
              <MenuIcon />
            </button>
          </div>
        </div>
      </div>

      <Menu />
    </>
  )
}
