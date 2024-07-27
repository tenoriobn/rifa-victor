/* eslint-disable react/prop-types */
import { useRecoilValue } from "recoil";
import Compartilhar from "../../assets/Icons/compartilhar.svg?react";
import Whatsapp from "../../assets/Icons/whatsapp.svg?react";
import { estadoRifa } from "../../common/state/atom";
import useCompartilharRifa from "../../common/state/hooks/opcoesDoEvento/useCompartilharRifa";
import ModalRegulamento from "./ModalRegulamento/ModalRegulamento";
import usePhoneFormat from "../../common/state/hooks/usePhoneFormat/usePhoneFormat";

export default function OpcoesDoEvento({ display }) {
  const { compartilharRifa } = useCompartilharRifa();
  const rifa = useRecoilValue(estadoRifa)

  const { formatPhone } = usePhoneFormat();
  const formattedPhone = formatPhone(rifa.rifa_others.whatsapp_group);

  return (
    <div className="mb-4 flex flex-wrap max-sm:justify-around gap-2">
      <ModalRegulamento />

      <button 
        onClick={compartilharRifa}
        className="relative inline-block group text-white rounded overflow-hidden shadow-transparent shadow-md hover:shadow-black/3 0 text-xs bg-emerald-500"
      >
        <div className="absolute left-0 top-0 bg-emerald-600 w-0 group-hover:w-full transition-all duration-300 h-1/2"></div>
        <div className="absolute right-0 bottom-0 bg-emerald-600 w-0 group-hover:w-full transition-all duration-300 h-1/2"></div>
        <div className="relative px-4 py-1 transition-all duration-300 flex items-center justify-center gap-1">
          <Compartilhar />
          Compartilhar
        </div>
      </button>

      <a 
        href={`https://wa.me/${formattedPhone}`}
        className={`relative inline-block group text-white rounded overflow-hidden shadow-transparent shadow-md hover:shadow-black/3 0 text-xs cursor-pointer bg-green-500 ${display}`}
        target="_blank"
      >
        <div className="absolute left-0 top-0 bg-green-600 w-0 group-hover:w-full transition-all h-1/2"></div>
        <div className="absolute right-0 bottom-0 bg-green-600 w-0 group-hover:w-full transition-all h-1/2"></div>
        <div className="relative px-4 py-1 transition-all duration-300 flex items-center justify-center gap-1">
          <Whatsapp />
          Grupo Whatsapp
        </div>
      </a>
    </div>
  )
}
