/* eslint-disable react/prop-types */
import { useState } from "react";
import PerfilTitulo from "../../assets/Icons/perfil-2.svg?react";
import FormularioLogin from "../../components/FormularioLogin/FormularioLogin";
// import Perfil from "../../assets/Icons/perfil.svg?react";
// import Telefone from "../../assets/Icons/telefone.svg?react";
// import { usePay } from "../../context/PayContext";

export default function MeuPerfil(props) {
  // const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  // const payInfo = usePay();

  // function formatarTelefone(telefone) {
  //   telefone = telefone.replace(/\D/g, "");
  //   telefone = telefone.replace(/(\d{2})(\d)/, "($1) $2");
  //   telefone = telefone.replace(/(\d)(\d{4})$/, "$1-$2");
  //   return telefone;
  // }

  // const handleChange = (event) => {
  //   const formattedPhone = formatarTelefone(event.target.value);
  //   setPhone(formattedPhone);
  //   setError(""); 
  // };

  // const handleSubmit = (event) => {
  //   event.preventDefault();

  //   const phonePattern = /^\(\d{2}\) \d{4,5}-\d{4}$/;
  //   if (!phonePattern.test(phone)) {
  //     setError("O telefone inválido");
  //     return;
  //   }
  //   payInfo.setPhone(phone);
  //   props.submitBtn();
  // };

  return (
    <div className="text-neutral-700 flex flex-col items-center">
      <PerfilTitulo />
      <h2 className="text-2xl mb-4"><strong>Oi!!</strong> Vamos conferir seus pedidos?</h2>
      <p>Primero você precisa estar logado.</p>
      <p className="mb-6">Informe seu telefone e CPF para continuarmos.</p>

      {error && <div className="bg-red-200 border border-red-500 text-red-500 px-4 py-3 rounded relative mb-4 w-full max-w-[420px] mx-auto">
        <p className="text-red-500">{error}</p>
      </div>}

      {/* <form className="w-full" onSubmit={handleSubmit}>
        <div className='bg-white/20 border border-solid border-white/50 rounded-lg p-4 text-xl max-w-[420px] mx-auto mb-6'>
          <div className='flex flex-col'>
            <label htmlFor="nome" className='block font-medium text-sm mb-1 w-max'>Nome</label>
            <div className="relative">
              <label htmlFor="nome" className="absolute w-10 h-10 flex items-center justify-center">
                <Perfil className="w-3.5" />
              </label>
              <input
                type="text"
                id="nome"
                placeholder="João da Silva"
                className="block w-full pl-10 rounded-md text-sm text-gray-900 ring-gray-300 ring-1 ring-inset outline-none px-3.5 py-2.5 focus:ring-2 focus:ring-amber-500 transition ease-in-out"
              />
            </div>
          </div>

          <div className='flex flex-col mt-2'>
            <label htmlFor="telefone" className='block font-medium text-sm mb-1 w-max'>Celular</label>


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
                value={phone}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <button type="submit" className="text-sm font-medium rounded-md shadow-sm text-white  bg-amber-500 w-full hover:bg-amber-600 max-w-[420px] flex justify-center items-center px-3.5 py-2.5 mx-auto transition ease-in-out">Efetuar Login</button>
      </form> */}

      <FormularioLogin />
    </div>
  )
}
