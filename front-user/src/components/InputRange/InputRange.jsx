/* eslint-disable react-hooks/exhaustive-deps */
import SinalMenos from "../../assets/Icons/sinalMenos.svg?react";
import SinalMais from "../../assets/Icons/sinalMais.svg?react";
import { useRecoilState, useRecoilValue } from "recoil";
import { estadoRifa, estadoValorRange } from "../../common/state/atom";
import useOperacoesInputRange from "../../common/state/hooks/inputRange/useOperacoesInputRange";
import { useEffect } from "react";

export default function InputRange() {
  const [valorRange, setValorRange] = useRecoilState(estadoValorRange);
  const { calcularPorcentagem, decrementarValor, incrementarValor, } = useOperacoesInputRange();
  const rifa = useRecoilValue(estadoRifa)

  useEffect(() => {
    setValorRange(rifa.cota.qntd_cota_min_order)
  }, []);

  return (
    <>
      <p className='font-semibold'>
        Quantidade 
        <span className='text-xs'> (Qtd. minima: {rifa.cota.qntd_cota_min_order})</span>
      </p>

      <div 
        className="w-full border border-solid border-neutral-900/80 p-2 inline-flex items-center rounded-full gap-x-2 mb-6"
      >
        <button 
          className="inline-flex items-center h-10 w-10 text-xl shrink-0 justify-center text-white font-bold rounded-full bg-amber-500 hover:bg-amber-600 transition-all duration-300 disabled:bg-neutral-400 active:scale-110"
          onClick={() => decrementarValor(5)}
        > 
          -5 
        </button>

        <button 
          className="inline-flex items-center justify-center text-white rounded-full bg-amber-500 hover:bg-amber-600 transition-all duration-300 disabled:bg-neutral-400 active:scale-110"
          onClick={() => decrementarValor(1)}
        >
            <SinalMenos />
        </button>

        <input 
          className="bg-transparent w-full text-3xl font-semibold text-center text-neutral-800" 
          value={valorRange}
          disabled
        />

        <button 
          className="inline-flex items-center justify-center text-white rounded-full bg-amber-500 hover:bg-amber-600 transition-all duration-300 disabled:bg-neutral-400 active:scale-110"
          onClick={() => incrementarValor(1)}
        >
          <SinalMais />
        </button>

        <button 
          className="inline-flex items-center h-10 w-10 text-xl shrink-0 justify-center text-white font-bold rounded-full bg-amber-500 hover:bg-amber-600 transition-all duration-300 disabled:bg-neutral-400 active:scale-110 "
          onClick={() => incrementarValor(5)}
        > 
            +5 
        </button>
      </div>

      <div className="flex justify-between text-xs gap-2 items-center mb-4">
        <p className="font-bold">{rifa.cota.qntd_cota_min_order} </p>

        <div className="relative w-full flex items-center h-5">
          <input 
            min={rifa.cota.qntd_cota_min_order} 
            max={rifa.cota.qntd_cota_max_order}
            step="1" 
            type="range" 
            value={valorRange}
            onChange={(event) => setValorRange(event.target.value)}
            className="w-full absolute appearance-none cursor-pointer disabled:cursor-not-allowed disabled:bg-opacity-50 focus:outline-none peer group bg-transparent rounded-lg focus-visible:ring-2 focus-visible:ring-amber-500 dark:focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-900 h-5 [&::-webkit-slider-thumb]:relative [&::-moz-range-thumb]:relative [&::-webkit-slider-thumb]:z-[1] [&::-moz-range-thumb]:z-[1] [&::-webkit-slider-thumb]:appearance-none [&::-moz-range-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 text-amber-500 dark:text-amber-500 [&::-webkit-slider-thumb]:ring-2 [&::-webkit-slider-thumb]:ring-current [&::-webkit-slider-thumb]:bg-white  [&::-moz-range-thumb]:bg-current [&::-webkit-slider-thumb]:h-5 [&::-moz-range-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-moz-range-thumb]:w-5 [&::-webkit-slider-thumb]:-mt-1 [&::-moz-range-thumb]:-mt-1 [&::-webkit-slider-runnable-track]:group-disabled:bg-opacity-50 [&::-moz-range-track]:group-disabled:bg-opacity-50 [&::-webkit-slider-runnable-track]:bg-gray-400   [&::-moz-range-track]:dark:bg-gray-400 [&::-webkit-slider-runnable-track]:rounded-lg [&::-moz-range-track]:rounded-lg [&::-webkit-slider-runnable-track]:h-3 [&::-moz-range-track]:h-3" 
          />

          <span className="absolute pointer-events-none peer-disabled:bg-opacity-50 rounded-s-lg bg-amber-500 dark:bg-amber-500 h-3" style={{width: `${calcularPorcentagem(valorRange, `${rifa.cota.qntd_cota_min_order}` , `${rifa.cota.qntd_cota_max_order}`)}%`}}></span>
        </div>

        <p className="font-bold">{rifa.cota.qntd_cota_max_order}</p>
      </div>
    </>
  )
}
