/* eslint-disable react/prop-types */
import { useState } from 'react';
import Seta from "../../assets/Icons/seta.svg?react";
import { estadoRifa } from '../../common/state/atom';
import { useRecoilValue } from 'recoil';

export default function AccordionDescricao({ display }) {
  const [selecaoAtiva, setSelecaoAtiva] = useState(null);
  const rifa = useRecoilValue(estadoRifa)

  const toggleSelecao = (selecao) => {
    setSelecaoAtiva(selecaoAtiva === selecao ? null : selecao);
  };

  return (
    <div className="mt-4">
      <div className="w-full flex flex-col">
        <button 
          onClick={() => toggleSelecao('descricaoProduto')}
          className='text-white font-medium rounded-md text-sm px-2.5 py-1.5 bg-sky-500 hover:bg-sky-600 outline-none inline-flex mb-1.5 w-full'
        >
          Descrição do Produto
          <Seta 
            className={`i-heroicons-chevron-down-20-solid h-5 w-5 ms-auto transform transition-transform duration-200 fill-white ${selecaoAtiva === 'descricaoProduto' ? 'rotate-180' : ''}`} 
          />
        </button>

        <div 
          className={`text-sm text-gray-500 dark:text-gray-400  bg-slate-100  rounded-lg  overflow-hidden transition-max-height duration-500 ease-in-out px-2 ${selecaoAtiva === 'descricaoProduto' ? 'max-h-96 pt-1.5 pb-3 mt-1.5 mb-3' : 'max-h-0'}`}
        >
          <p className="text-gray-500">{rifa.description_product}</p>
        
        </div>
      </div>

      <div className={`w-full flex-col ${display}`}>
        <button 
          onClick={() => toggleSelecao('descricaoSorteio')}
          className='text-white font-medium rounded-md text-sm px-2.5 py-1.5 bg-sky-500 hover:bg-sky-600 outline-none inline-flex mb-1.5 w-full'
        >
          Descrição do Sorteio
          <Seta 
            className={`i-heroicons-chevron-down-20-solid h-5 w-5 ms-auto transform transition-transform duration-200 fill-white ${selecaoAtiva === 'descricaoSorteio' ? 'rotate-180' : ''}`} 
          />
        </button>

        <div 
          className={`text-sm text-gray-500 dark:text-gray-400 bg-slate-100 rounded-lg overflow-hidden transition-max-height duration-500 ease-in-out px-2 ${selecaoAtiva === 'descricaoSorteio' ? 'max-h-96 pt-1.5 pb-3 mt-1.5 mb-3' : 'max-h-0'}`}
        >
          <p className="text-gray-500">{rifa.description_sortition}</p>
         
        </div>
      </div>
    </div>
  );
}
