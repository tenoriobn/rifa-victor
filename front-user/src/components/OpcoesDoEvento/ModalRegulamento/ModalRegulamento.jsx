import { useState, useEffect } from 'react';
import Documento from "../../../assets/Icons/documento.svg?react";
import { useRecoilValue } from 'recoil';
import {  estadoRifa } from '../../../common/state/atom';

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


  return (
    <>
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="flex gap-1 text-white rounded text-xs bg-sky-500 py-1 px-4"
      >
        <Documento />
        Ver Regulamento
      </button>

      {isOpen && (
        <div id="default-modal" aria-hidden="true" className="fixed top-0 left-0 w-full h-full flex flex-wrap justify-center items-center bg-black/40 backdrop-blur-sm p-4 overflow-auto z-[1000]">
          <div className='absolute inset-0'></div>
          <div className='relative max-w-xl mx-4 p-4 bg-white text-neutral-800 border rounded-lg overflow-auto'>
            <h1 className="text-xl border-b border-b-slate-400"> Regulamento </h1>

            <div className='p-8'>
              <div>
                {rifa.description_role}
              </div>
            </div>

            <div className="text-right">
              <button 
                className="relative inline-block group text-white rounded overflow-hidden shadow-transparent shadow-md hover:shadow-black/30 bg-sky-300 px-4 py-1"
                onClick={() => setIsOpen(!isOpen)}
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
