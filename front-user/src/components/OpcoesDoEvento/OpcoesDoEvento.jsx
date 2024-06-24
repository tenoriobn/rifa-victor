import Compartilhar from "../../assets/Icons/compartilhar.svg?react";
import Whatsapp from "../../assets/Icons/whatsapp.svg?react";
import useCompartilharRifa from "../../common/state/hooks/opcoesDoEvento/useCompartilharRifa";
import ModalRegulamento from "./ModalRegulamento/ModalRegulamento";

export default function OpcoesDoEvento() {
  const { compartilharRifa } = useCompartilharRifa();

  return (
    <div className="mb-4 flex flex-wrap max-sm:justify-around gap-2">
      <ModalRegulamento />

      <button 
        onClick={compartilharRifa}
        className="flex gap-1 text-white rounded text-xs bg-emerald-500 py-1 px-4">
        <Compartilhar />
        Compartilhar
      </button>

      <a 
        href="https://chat.whatsapp.com/JibL4e2IFbvDDEbejZtqys"
        className="flex gap-1 text-white rounded text-xs bg-green-500 py-1 px-4 cursor-pointer"
        target="_blank"
      >
        <Whatsapp />
        Grupo Whatsapp
      </a>
    </div>
  )
}
