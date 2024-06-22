import { useEffect, useState } from "react";
import Links from "../home/components/Links";
import trophy from "../../../public/assets/images/trophy-fill.svg";
import { formatDate, formatPrice } from "../../util/util";
import { Link } from "react-router-dom";
import IconeGanhadores from './IconeGanhadores.svg?react';

// Mock da função sendRequest para simular a resposta da API
async function sendRequest(requestData) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        data: {
          winner: {
            title: "Rifa do Carro",
            name: "Juliano Oliveira Amaral",
            phone: "(11) 98765-4321",
            updated_at: "13/04/2024",
            winner_number: "1234",
            price: 5000,
            numbers: 5,
            thumbnail: "https://imagedelivery.net/TuyDlh37fwpu3jSKwZ3-9g/06f43084-aa29-480e-c4d9-36dfaaab8f00/winnerThumb"
          }
        }
      });
    }, 1000); // Simula um atraso na resposta da API
  });
}

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
      } else if (response.data.winner) {
        setWinner(response.data.winner);
      } else {
        setWinner(null);
      }
    } catch (error) {
      // window.alert(`Houve um erro no servidor ${error}`);
    }
  }

  useEffect(() => {
    getWinner();
  }, []);

  return (
    <div>
      <article className="flex flex-col gap-2">
        <div className="text-xl bg-slate-300 rounded p-2">
        <IconeGanhadores />
          <h2 className="text-xl font-semibold text-neutral-800">
            Ganhadores
            <span className="font-thin text-sm text-neutral-700"> Os sortudos!</span>
          </h2>
        </div>
        {winner && (
          <Link className="flex w-auto overflow-hidden rounded-lg bg-neutral-200 hover:shadow-[4px_4px_4px_#0002] border border-solid border-neutral-400 ring-0 ring-amber-500/60 hover:ring-offset-4 hover:ring-2 transition-all">
            <div className="flex w-full">
                <img 
                  className="w-[80px] m-2 rounded-lg object-cover transition-all" 
                  src={winner.thumbnail.split(",")[0]} 
                  alt=""
                />

              <div className="flex grow flex-col bg-neutral-100 overflow-hidden p-2">
                <p className="text-lg w-full font-semibold text-neutral-900 text-left truncate">{winner.name}</p>
                <p className="text-sm w-full text-neutral-600 text-left truncate">F250 OU 50K NO PIX</p>
                <p className="text-sm w-full text-neutral-600 text-left truncate">
                  Bilhete da Sorte: 
                  <span className="font-semibold"> {winner.winner_number}</span>
                </p>
                <p className="text-sm w-full text-neutral-600 text-left truncate">
                  Data do Sorteio:
                  <span className="font-semibold"> {winner.updated_at}</span>
                </p>
                {/* <p className="font-bold mb-2">Valor Pago: <span className="text-white bg-blue-500 p-1 rounded-md">R$ {formatPrice(winner.price)}</span></p>
                <p className="font-bold mb-2">{winner.numbers} Bilhetes comprados</p> */}
              </div>
            </div>
          </Link>
        )}
        {/* <Links /> */}
      </article>
    </div>
  );
}
