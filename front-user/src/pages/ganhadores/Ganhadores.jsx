import { useEffect, useState } from "react";
import Links from "../home/components/Links";
import trophy from "../../../public/assets/images/trophy-fill.svg"
import { formatDate, formatPrice, sendRequest } from "../../util/util";

export default function Ganhadores() {
  const [winner, setWinner] = useState();
  async function getWinner() {
    const requestData = {
      method: "GET",
      url: `public-rifas/latest-winner`,
    };
  
    try {
      const response = await sendRequest(requestData);
  
      if (!response.success) {
        setWinner(null);
      }
      console.log(response.data)
      if (response.data.winner) {
        setWinner(response.data.winner);
      } else {
        setWinner(null);
      }
    } catch (error) {
      // window.alert(`Houve um erro no servidor ${error}`);
    }
  }
  useEffect(() => {
    getWinner()
  }, []);

  return (
    <section>
      <article className="flex flex-col gap-4">
        <h2 className="font-bold text-2xl sm:text-3xl">Ganhadores</h2>
        { winner && (
          <div className="bg-[#001c44] p-3 mb-3">
            <div className="flex gap-2 justify-center mb-4">
              <img src={trophy} alt="" />
              <p className="font-bold text-xl ">Vencedor do sorteio {winner.title}</p>
            </div>
            <div className="flex gap-4">
              <div>
                <img className="w-44 rounded-lg" src={winner.thumbnail.split(',')[0]} alt="" />
              </div>
              <div>
                <p className="font-bold mb-2">Ganhador(a) <span>{ winner.name }</span></p>
                <p className="font-bold mb-2">Telefone <span>{winner.phone}</span></p>
                <p className="font-bold mb-2">Data de Compra: {formatDate(winner.updated_at)}</p>
                <p className="font-bold mb-2">Número Sorteado: <span className="text-white bg-green-500 p-1 rounded-md">{ winner.winner_number }</span></p>
                <p className="font-bold mb-2">Valor Pago: <span className="text-white bg-blue-500 p-1 rounded-md">R$ { formatPrice(winner.price) }</span></p>
                <p className="font-bold mb-2">{ winner.numbers } Bilhetes comprados</p>
              </div>
            </div>
          </div>
        ) }

        <Links />
      </article>
    </section>
  );
}
