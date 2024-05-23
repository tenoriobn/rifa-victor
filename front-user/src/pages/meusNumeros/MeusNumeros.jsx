import { useEffect } from "react";

export default function MeusNumeros() {

    useEffect(() => {

    }, []);
    return (
      <section>
        <article className="flex flex-col gap-4">
          <h2 className="font-bold text-2xl sm:text-3xl">Meus pedidos</h2>
  
          <article className="p-4 bg-white rounded-lg flex flex-col gap-3">
            <p className="text-[#222] text-base">
              A extração será realizada pelo resultado da Loteria Federal do dia
              após a venda de todos os números.
            </p>
  
            <p className="text-[#222] text-base">
              Só estarão participando do sorteio quem estiver com todos os números
              pagos.
            </p>
  
            <p className="text-[#222] text-base">
              Após finalizar a ação, confirme seus números no menu Meus Números.
            </p>
  
            <p className="text-[#222] text-base">
              Será ganhador o participante que escolher o número que coincidir com
              a centena ou milhar do 1º prêmio do sorteio do resultado da Loteria
              Federal no dia do sorteio.
            </p>
  
            <p className="text-[#222] text-base">
              Obrigado por participarem e boa sorte a todos!
            </p>
          </article>
        </article>
      </section>
    );
  }
  