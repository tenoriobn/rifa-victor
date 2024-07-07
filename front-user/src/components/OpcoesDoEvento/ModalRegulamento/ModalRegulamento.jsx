import { useState, useEffect } from 'react';
import Documento from "../../../assets/Icons/documento.svg?react";
import { useRecoilValue } from 'recoil';
import {  estadoRifa } from '../../../common/state/atom';
import DOMPurify from 'dompurify';

export default function ModalRegulamento() {
  const [isOpen, setIsOpen] = useState(false);

  const rifa = useRecoilValue(estadoRifa);
  
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const limparHTML = (htmlString) => {
    return { __html: DOMPurify.sanitize(htmlString) };
  };


  return (
    <>
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="relative inline-block group text-white rounded overflow-hidden shadow-transparent shadow-md hover:shadow-black/3 0 text-xs bg-sky-500"
      >
        <div className="absolute left-0 top-0 bg-sky-600 w-0 group-hover:w-full transition-all duration-300 h-1/2"></div>
        <div className="absolute right-0 bottom-0 bg-sky-600 w-0 group-hover:w-full transition-all duration-300 h-1/2"></div>
        <div className="relative px-4 py-1 transition-all duration-300 flex items-center justify-center gap-1">
          <Documento />
          Ver Regulamento
        </div>
      </button>

      {isOpen && (
        <div id="default-modal" aria-hidden="true" className="fixed top-0 left-0 w-full h-full flex flex-wrap justify-center items-center bg-black/40 backdrop-blur-sm p-4 overflow-auto z-[1000]">
          <div className='absolute inset-0'></div>
          <div className='relative max-w-xl mx-4 p-4 bg-white text-neutral-800 border rounded-lg overflow-auto'>
            <h1 className="text-xl border-b border-b-slate-400"> Regulamento </h1>

            <div className='p-8'>
              <div>
                <div dangerouslySetInnerHTML={limparHTML(rifa.description_role)} />
              </div>
            </div>

            <div className="text-right">
              <button 
                className="relative inline-block group text-white rounded overflow-hidden shadow-transparent shadow-md hover:shadow-black/3 0 bg-sky-300"
                onClick={() => setIsOpen(!isOpen)}
              >
                <div className="absolute left-0 top-0 bg-sky-400 w-0 group-hover:w-full transition-all duration-300 h-1/2"></div>
                <div className="absolute right-0 bottom-0 bg-sky-400 w-0 group-hover:w-full transition-all duration-300 h-1/2"></div>
                <div className="relative px-4 py-1 transition-all duration-300 flex items-center justify-center gap-1">
                  Fechar
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
