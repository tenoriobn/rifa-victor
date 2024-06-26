import SetaTermos from "../../../assets/Icons/setaTermos.svg?react";
import { useRecoilState } from "recoil";
import { estadoTermosAceito } from "../../../common/state/atom";
import ModalTermosCondicoes from "./ModalTermosCondicoes/ModalTermosCondicoes";

export default function TermosCondicoes() {
  const [termosAceito, setTermosAceito] = useRecoilState(estadoTermosAceito);

  return (
    <>
      <div 
        className={`mb-4 p-2 rounded-lg flex flex-col-reverse sm:flex-row items-center justify-between border border-solid  ${ termosAceito ? "bg-emerald-100 text-emerald-600 border-emerald-500/40" : "bg-yellow-50 text-yellow-600 border-yellow-500/40"}`}
      >
        <label className="flex items-center gap-2 relative">
          <input 
            type="checkbox" 
            checked={termosAceito}
            onChange={() => setTermosAceito(!termosAceito)}
          /> 
          Aceito os termos e condições 
          {!termosAceito && (
            <div className="absolute -left-[10px] -top-6">
              <SetaTermos className="icon animate-bounce text-red-600" />
            </div>
          )}
        </label>

        <ModalTermosCondicoes />
      </div>

      {!termosAceito && (
        <div
          className="mb-4 p-2 rounded-lg bg-red-200 text-red-500 border border-solid border-red-500/10"
        >
          <p>
            Para prosseguir você deve aceitar 
            <span className="font-semibold"> Termos e Condições</span>
          </p>
        </div>
      )}
    </>
  )
}
