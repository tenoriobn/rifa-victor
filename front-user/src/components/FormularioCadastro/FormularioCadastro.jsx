import { useState } from "react";
import useValidarFormulario from "../../common/state/hooks/FormularioCadastro/useValidarFormulario";

export default function FormularioCadastro() {
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const { telefone, formatarTelefone } = useValidarFormulario(nome, sobrenome);

  return (
    <form className="space-y-4" action="">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="w-full">
          <label htmlFor="name" className="block mb-1 text-sm font-medium text-neutral-900">
            Nome
          </label>

          <input 
            type="text" 
            name="name" 
            id="name" 
            className="border text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full px-2 py-1 bg-gray-100 border-gray-500 placeholder-gray-400 text-neutral-900" 
            placeholder="Nome Completo" 
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required=""
          />
        </div>

        <div className="w-full">
          <label htmlFor="sobrenome" className="block mb-1 text-sm font-medium text-neutral-900">
            Sobrenome
          </label>

          <input 
            type="text" 
            name="sobrenome" 
            id="sobrenome" 
            className="border text-sm rounded focus:ring-blue-500 focus:border-blue-500 w-full block px-2 py-1 bg-gray-100 border-gray-500 placeholder-gray-400 text-neutral-900" 
            placeholder="Nome Completo" 
            value={sobrenome}
            onChange={(e) => setSobrenome(e.target.value)}
            required=""
          />
        </div>
      </div>

      <div>
          <label htmlFor="phone" className="block mb-1 text-sm font-medium text-neutral-900">
            Seu telefone
          </label>

          <input 
            id="phone" 
            className="border text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full px-2 py-1 bg-gray-100 border-gray-500 placeholder-gray-400 text-neutral-900" 
            placeholder="N. Telefone" 
            value={telefone}
            onChange={formatarTelefone}
            required="" 
          />
        </div>
    </form>
  )
}
