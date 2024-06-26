import Telefone from "../../assets/Icons/telefone.svg?react";
import useFormatadorTelefone from "../../common/state/hooks/FormularioCadastro/useFormatadorTelefone";

export default function FormularioLogin() {
  const { telefone, formatarTelefone } = useFormatadorTelefone();
  console.log(telefone)

  return (
    <form className="w-full">
      <div className='bg-white/20 border border-solid border-white/50 rounded-lg p-4 text-xl max-w-[420px] mx-auto mb-6'>
        <div className='flex flex-col mt-2'>
          <label htmlFor="telefone" className='block font-medium text-sm mb-1 w-max text-gray-700'>Celular</label>


          <div className="relative">
            <label htmlFor="telefone" className="absolute w-10 h-10 flex items-center justify-center">
              <Telefone className="w-4.5" />
            </label>
            <input 
              type="text"
              id='telefone'
              placeholder='(11) 98900-9999'
              className='block w-full pl-10 rounded-md text-sm text-gray-900 ring-gray-300 ring-1 ring-inset outline-none px-3.5 py-2.5 focus:ring-2 focus:ring-amber-500 transition ease-in-out'
              maxLength={15}
              onChange={formatarTelefone}
              value={telefone}
            />
          </div>
        </div>
      </div>

      <button type="submit" className="text-sm font-medium rounded-md shadow-sm text-white  bg-amber-500 w-full hover:bg-amber-600 max-w-[420px] flex justify-center items-center px-3.5 py-2.5 mx-auto transition ease-in-out">Efetuar Login</button>
    </form>
  )
}
