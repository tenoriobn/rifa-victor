import { useEffect } from "react";
import Links from "../home/components/Links";
import trophy from "../../../public/assets/images/trophy-fill.svg"
import exRifa from "../../../public/assets/images/exRifa.jpg"

export default function Ganhadores() {

    useEffect(() => {

    }, []);
    return (
      <section>
        <article className="flex flex-col gap-4">
          <h2 className="font-bold text-2xl sm:text-3xl">Ganhadores</h2>
          <div className="bg-[#001c44] p-3 mb-3">
            <div className="flex gap-2 justify-center mb-4">
              <img src={trophy} alt="" />
              <p className="font-bold text-xl ">Vencedor do sorteio (nome do Sorteio)</p>
            </div>
            <div className="flex gap-4">
              <div>
                <img className="w-44 rounded-lg" src={exRifa} alt="" />
              </div>
              <div>
                <p className="font-bold mb-2">Ganhador(a) <span>ROBLOX A MELHOR</span></p>
                <p className="font-bold mb-2">Telefone <span>(11) 99999-****</span></p>
                <p className="font-bold mb-2">Data de Compra: 10/05/2202 10:40:25</p>
                <p className="font-bold mb-2">Número Sorteado: <span className="text-white bg-green-500 p-1 rounded-md">45852</span></p>
                <p className="font-bold mb-2">Valor Pago: <span className="text-white bg-blue-500 p-1 rounded-md">R$ 6,00</span></p>
                <p className="font-bold mb-2">800 Bilhetes comprados</p>
              </div>
            </div>
          </div>
  
          <Links />
        </article>
      </section>
    );
  }
  