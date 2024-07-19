/* eslint-disable react/prop-types */
import useFormatadorTelefone from "../../../common/state/hooks/FormularioCadastro/useFormatadorTelefone";
import Perfil from "../../../assets/Icons/perfil-2.svg?react";
import Telefone from "../../../assets/Icons/telefone.svg?react";
import Whatsapp from "../../../assets/Icons/whatsapp.svg?react";
import { useRecoilValue } from "recoil";
import { estadoEditarPerfil, estadoUsuario } from "../../../common/state/atom";
import { transicaoAnimada } from "../../../common/util/transicaoAnimada";
import { motion } from "framer-motion";

export default function FormularioEdicaoDados() {
  const editarPerfil = useRecoilValue(estadoEditarPerfil);
  const { formatarTelefone } = useFormatadorTelefone();
  const usuario = useRecoilValue(estadoUsuario);
  const animacao = transicaoAnimada();

  return (
    <form action="" className="flex flex-col justify-between text-sm px-4 py-5 sm:px-6 gap-4">
      <div className="flex flex-col justify-between text-sm w-full">
        <label 
          className="block font-medium text-gray-700 mb-1"
          htmlFor="nome"
        >
          Nome
        </label>

        <div className="relative">
          <input 
            id="nome" 
            name="name" 
            disabled
            type="text" 
            className="w-full disabled:cursor-not-allowed disabled:opacity-75 focus:outline-none border-0 form-input rounded-md placeholder-gray-400 dark:placeholder-gray-500 text-sm px-2.5 py-1.5 shadow-sm bg-white ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-amber-500 ps-9 text-gray-700"
            placeholder={usuario.name}
          />

          <span className="absolute inset-y-0 start-0 flex items-center pointer-events-none px-2.5">
            <Perfil className="w-5 fill-gray-400" />
          </span>
        </div>
      </div>

      <div className="flex flex-col justify-between text-sm w-full ">
        <label 
          className="block font-medium text-gray-700 mb-1"
          htmlFor="sobrenome"
        >
          Sobrenome
        </label>

        <div className="relative ">
          <input 
            id="sobrenome" 
            name="sobrenome" 
            disabled
            type="text" 
            className="w-full disabled:cursor-not-allowed disabled:opacity-75 focus:outline-none border-0 form-input rounded-md placeholder-gray-400 dark:placeholder-gray-500 text-sm px-2.5 py-1.5 shadow-sm bg-white ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-amber-500 ps-9 text-gray-700"
            placeholder={usuario.surname}
          />

          <span className="absolute inset-y-0 start-0 flex items-center pointer-events-none px-2.5">
            <Perfil className="w-5 fill-gray-400" />
          </span>
        </div>
      </div>

      <div className="flex flex-col justify-between text-sm w-full">
        <label className="block font-medium text-gray-700 mb-1">
          Telefone
        </label>

        <div className="relative">
          <input 
            type="text"
            id='telefone'
            disabled
            placeholder='(11) 98900-9999'
            className="w-full disabled:cursor-not-allowed disabled:opacity-75 focus:outline-none border-0 form-input rounded-md placeholder-gray-400 dark:placeholder-gray-500 text-sm px-2.5 py-1.5 shadow-sm bg-white ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-amber-500 ps-9 text-gray-700"
            maxLength={15}
            onChange={formatarTelefone}
            value={usuario.cellphone}
          />

          <span className="absolute inset-y-0 start-0 flex items-center pointer-events-none px-2.5">
            <Telefone className="w-4.5 h-5 fill-gray-400" />
          </span>
        </div>
      </div>

      {editarPerfil && (
        <motion.div {...animacao}>
          <h4 className="text-gray-700 w-full flex items-center  gap-2 font-medium">
            Para alterar dados, contate o suporte via WhatsApp:
            <a 
              href="https://wa.me/+5543996403859"
              className="flex gap-1 text-white rounded text-xs bg-green-500 py-1 px-4 cursor-pointer"
              target="_blank"
            >
              <Whatsapp />
              Suporte
            </a>
          </h4>
        </motion.div>
      )}
    </form>
  )
}
