/* eslint-disable react/prop-types */
import { useState } from 'react';
import Seta from "../../assets/Icons/seta.svg?react";

export default function AccordionDescricao({ display }) {
  const [selecaoAtiva, setSelecaoAtiva] = useState(null);

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
          <p className="text-gray-500">por apenas 0,19 centavos o bilhete promocional,&nbsp;</p>
          <p className="text-gray-500">você concorre a essa linda</p>
          <p className="text-gray-500">Saveiro Cross dos SONHOS ou 50 K no pix</p>
          <p className="text-gray-500">&nbsp;</p>
          <p className="text-gray-500">cabine dupla, preta, ano 2015</p>
          <p className="text-gray-500">rodas originais&nbsp;</p>
          <p className="text-gray-500">PERFEITA, pra você levar a família toda !</p>
          <p className="text-gray-500">ou, caso você prefira, 50 Mil no seu pix&nbsp;</p>
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
          <p className="text-gray-500">Sorteio será realizado pela loteria federal, assim que se esgotarem todas as cotas,&nbsp;</p>
          <p className="text-gray-500">além do prêmio principal</p>
          <p className="text-gray-500">são 30 bilhetes premiados&nbsp;</p>
          <p className="text-gray-500">e 3.000,00 pro maior comprador&nbsp;</p>
        </div>
      </div>
    </div>
  );
}
