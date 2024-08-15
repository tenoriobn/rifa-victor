import Editar from "../../assets/Icons/editar.svg?react"
import FormularioEdicaoDados from "./FormularioEdicaoDados/FormularioEdicaoDados"
import { useRecoilState } from "recoil"
import { estadoEditarPerfil } from "../../common/state/atom"

export default function MeusDados() {
  const [editarPerfil, setEditarPerfil] = useRecoilState(estadoEditarPerfil)

  return (
    <div
      className="rounded-lg divide-y divide-gray-200 dark:divide-gray-800 ring-1 ring-gray-200  shadow bg-white w-full mt-4 mb-8"
    >
      <div className="divide-y divide-gray-200">
        <div className="flex items-center gap-2 font-bold px-4 py-5 sm:px-6">
          <h3 className="text-neutral-700">Meus dados</h3>

          <button
            className="relative inline-block group text-white rounded overflow-hidden shadow-transparent shadow-md hover:shadow-black/3 0 text-xs bg-green-500"
            onClick={() => setEditarPerfil(!editarPerfil)}
          >
            <div className="absolute left-0 top-0 bg-green-600 w-0 group-hover:w-full transition-all duration-300 h-1/2"></div>
            <div className="absolute right-0 bottom-0 bg-green-600 w-0 group-hover:w-full transition-all duration-300 h-1/2"></div>
            <div className="relative px-4 py-1 transition-all duration-300 flex items-center justify-center gap-1">
              <Editar />
              Editar
            </div>
          </button>
        </div>

        <FormularioEdicaoDados />
      </div>
    </div>
  )
}
