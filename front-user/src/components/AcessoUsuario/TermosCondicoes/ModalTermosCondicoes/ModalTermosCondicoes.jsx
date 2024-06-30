import { useState, useEffect } from 'react';

export default function ModalTermosCondicoes() {
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
        className="relative inline-block group text-white rounded overflow-hidden shadow-transparent shadow-md hover:shadow-black/3 0 text-xs bg-blue-500"
      >
        <div className="absolute left-0 top-0 bg-blue-600 w-0 group-hover:w-full transition-all duration-300 h-1/2"></div>
        <div className="absolute right-0 bottom-0 bg-blue-600 w-0 group-hover:w-full transition-all duration-300 h-1/2"></div>
        <div className='relative px-4 py-1 transition-all duration-300 flex items-center justify-center gap-1'>
          Ver Termos e Condições
        </div>
      </button>

      {isOpen && (
        <div 
          id="default-modal" 
          aria-hidden="true" 
          className="fixed top-0 left-0 w-full h-full flex flex-wrap justify-center items-center bg-black/40 backdrop-blur-sm p-4 overflow-auto z-[1000]"
        >
          <div className='absolute inset-0'></div>
          <div className='relative max-w-xl mx-4 p-4 bg-white text-neutral-800 border rounded-lg overflow-auto'>
            <h1 className="text-xl border-b border-b-slate-400"> Temos e Condições </h1>

            <div className='p-8'>
              <div>
                <strong>Termos e Condições</strong>

                <p>
                  <br />
                    <strong>1. Aceitação dos Termos e Condições</strong>
                      <br />
                        Ao acessar e usar este site, você aceita e concorda com estes Termos e Condições. Se você não concordar com qualquer um destes termos, por favor, não use o site.
                      <br /><br />
                    
                    <strong>2. Alterações</strong>
                      <br />
                        Podemos atualizar nossos Termos e Condições de tempos em tempos. Recomendamos que os usuários revisem esta página regularmente para quaisquer mudanças. A continuação do uso deste site após a publicação de alterações nestes Termos e Condições implica na aceitação dessas alterações.
                      <br /><br />
                    
                    <strong>3. Compra de e-books e Incentivo</strong>
                      <br />
                        Ao comprar um e-book em nosso site, você receberá um número para concorrer a um prêmio. A entrega do prêmio será conforme estabelecido em nossas Regras da Promoção.
                      <br /><br />

                    <strong>4. Coleta de Informações</strong>
                      <br />
                        Ao se cadastrar em nosso site, solicitaremos informações como nome, telefone e e-mail. Estas informações serão utilizadas exclusivamente para fins de comunicação relacionada ao site, compras, promoções e para fins fiscais. Não compartilharemos suas informações com terceiros sem o seu consentimento expresso, exceto quando necessário para fins fiscais ou conforme exigido por lei.
                      <br /><br />

                    <strong>5. Uso do site</strong>
                      <br />
                        Você concorda em usar o site apenas para fins legais e de uma forma que não infrinja os direitos de restringir ou inibir o uso e o gozo do site por qualquer terceiro.
                      <br /><br />

                    <strong>6. Limitação de Responsabilidade</strong>
                      <br />
                        O conteúdo deste site é fornecido sem quaisquer garantias de qualquer tipo. Não podemos garantir que o site estará sempre disponível ou que seu uso do site será ininterrupto ou livre de erros.
                      <br /><br />

                    <strong>7. Direitos Autorais</strong>
                      <br />
                        Todo o conteúdo do site, incluindo e-books, textos, gráficos, logos, ícones e imagens, é de nossa propriedade e está protegido pelas leis internacionais de direitos autorais. A reprodução, distribuição, modificação ou qualquer outra utilização do conteúdo sem nossa permissão expressa é estritamente proibida. 
                      <br /><br />

                    <strong>8. Links para outros sites</strong>
                      <br />
                        Nosso site pode conter links para outros sites. Esses sites não estão sob nosso controle e não somos responsáveis pelo conteúdo ou práticas de qualquer site vinculado.
                      <br /><br />

                    <strong>9. Legislação Aplicável</strong>
                      <br />
                        Estes Termos e Condições são regidos pelas leis [do seu país]. Qualquer disputa decorrente destes termos será resolvida nos tribunais [do seu país ou estado].
                      <br /><br />

                    <strong>10. Contato</strong>
                      <br />
                        Para qualquer dúvida sobre estes Termos e Condições ou sobre as Regras da Promoção, entre em contato conosco através do WhatsApp na home do site.
                </p>
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
