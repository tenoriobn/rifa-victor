import { useState, useEffect } from 'react';
import Documento from "../../../assets/Icons/documento.svg?react";

export default function ModalRegulamento() {
  const [isOpen, setIsOpen] = useState(false);

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
                <center><strong>REGULAMENTO DA AÇÃO</strong></center>

                <p>
                  <br />
                    <strong>1. Participação</strong>
                      <br />
                        Para participar desta ação, o participante deve adquirir um ou mais ebooks neste site.
                      <br />
                        Cada ebook adquirido dará direito a um número para participar da ação. O participante só será considerado apto a participar da ação após a aprovação do pagamento.
                      <br /><br />
                    
                    <strong>2. Responsabilidade do Participante</strong>
                      <br />
                        O participante é responsável por fornecer informações corretas e completas no momento da compra. Qualquer erro ou omissão nas informações pode resultar na desqualificação do participante.
                      <br /><br />
                    
                    <strong>3. Data da Ação</strong>
                      <br />
                        A data da ação está indicada no topo da página de compra. Ela pode ser adiada ou antecipada, de acordo com as vendas. A data final será baseada no resultado do 1º prêmio da Loteria Federal na semana subsequente à venda de 100% das cotas.
                      <br /><br />

                    <strong>4. Sorteio</strong>
                      <br />
                        O sorteio ocorrerá após a venda de todos os ebooks. O número sorteado será formado pelos 5 últimos algarismos do 1º prêmio extraído pela Loteria Federal, + o último algarismo do segundo prêmio.
                      <br />
                        Por exemplo:
                      <br />
                        1º prêmio = 1 5 9 4 5
                      <br />
                        2º prêmio = 4 6 7 2 9
                      <br />
                        3º prêmio = 5 3 0 0 8
                      <br />
                        O número sorteado será: 159459. Nesse exemplo !&nbsp;
                      <br /><br />

                    <strong>5. Caso de venda incompleta de cotas</strong>
                      <br />
                        Se não forem vendidas 100% das cotas, o organizador pode optar pela mudança na ordem da forma do sorteio.
                      <br /><br />

                    <strong>6. Informações adicionais</strong>
                      <br />
                        O participante pode acessar o menu Meus Pedidos a qualquer momento para obter informações sobre sua compra, e ver os seus números !&nbsp;
                </p>
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
