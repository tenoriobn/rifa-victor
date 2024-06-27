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
            className="flex gap-1 group text-white rounded overflow-hidden shadow-transparent shadow-md hover:shadow-black/3 0 text-xs bg-sky-500 px-4 py-1"
            onClick={() => setEditarPerfil(!editarPerfil)}
          >
            <Editar />
            Editar
          </button>
        </div>

        <FormularioEdicaoDados />
      </div>
    </div>
  )
}
