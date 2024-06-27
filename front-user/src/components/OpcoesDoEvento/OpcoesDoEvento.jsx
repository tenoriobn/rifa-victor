/* eslint-disable react/prop-types */
import { useRecoilValue } from "recoil";
import Compartilhar from "../../assets/Icons/compartilhar.svg?react";
import Whatsapp from "../../assets/Icons/whatsapp.svg?react";
import {  estadoRifa } from "../../common/state/atom";
import useCompartilharRifa from "../../common/state/hooks/opcoesDoEvento/useCompartilharRifa";
import ModalRegulamento from "./ModalRegulamento/ModalRegulamento";

export default function OpcoesDoEvento({ display }) {
  const { compartilharRifa } = useCompartilharRifa();
  const rifa = useRecoilValue(estadoRifa)
  

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
        href={rifa.rifa_others.whatsapp_group}
        className={`gap-1 text-white rounded text-xs bg-green-500 py-1 px-4 cursor-pointer ${display}`}
        target="_blank"
      >
        <Whatsapp />
        Grupo Whatsapp
      </a>
    </div>
  )
}
