/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { formatPrice } from "../../../src/common/util/util";

export default function Paying(props) {
  const [timeLeft, setTimeLeft] = useState(30 * 60); 
  const [copied, setCopied] = useState(false); 

  useEffect(() => {
    if (timeLeft === 0) {
      // Trigger any action when timer ends

      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(props.paymentHash).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Hide notification after 2 seconds
    });
  };

  return (
    <div
      className={`flex fixed top-0 bottom-0 left-0 right-0 z-50  bg-[rgba(0,0,0,.7)] overflow-auto flex-col items-center justify-center p-4`}
    >
      <article className="w-full max-w-xl bg-white overflow-auto p-4 py-16 rounded-lg relative">
        <i
          onClick={() => props.closePaymentContainer()}
          className="icon-times-circle-o z-50 text-3xl text-white absolute top-4 right-4 cursor-pointer"
        >
          {" "}
        </i>

        <article className="flex flex-col gap-2">
          <h1 className="bg-green-600 text-white font-bold text-center p-4 absolute left-0 top-0 w-full text-2xl">Aguardando Pagamento!</h1>
          <p className="text-center text-black text-lg mt-2">Finalize o pagamento</p>
          <p className="text-sm p-2 bg-yellow-200 text-yellow-800 font-bold rounded">Pix copia e cola: abra o aplicativo do seu banco pelo celular, selecione PIX e faça o pagamento. Ou escaneie o código com um celular.</p>

          <form>
            <div className="flex flex-col gap-2">
              {/* Add your form fields here */}
            </div>

            {props.qrCodeBase64 && (
              <img className="w-[200px] mx-auto" src={`data:image/jpeg;base64,${props.qrCodeBase64}`} alt="QR Code" />
            )}
           {props.paymentHash && (
              <>
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-secondary text-base font-medium text-hash py-2 bg-gray-200 max-w-full truncate ">
                    {props.paymentHash}
                  </h2>
                  <button
                    type="button"
                    className="bg-green-600 text-white py-2 px-3 cursor-pointer rounded-md whitespace-nowrap hover:bg-green-700"
                    onClick={copyToClipboard}
                  >
                    COPIAR CÓDIGO
                  </button>
                </div>
                {copied && <p className="text-green-500 font-bold text-center text-xl">Código copiado!</p>}
              </>
            )}
            <button type="button" className="text-white w-full mt-3 bg-blue-500 hover:bg-blue-600 py-2 px-3 rounded-md font-bold">JÁ PAGUEI, VER MEUS PEDIDOS</button>
            <div className="bg-yellow-200 text-yellow-800 mt-3 p-2 rounded text-center">
              <p className="text-base">O tempo para você pagar acaba em:</p>
              <p className="text-yellow-800 font-bold text-3xl">{formatTime(timeLeft)}</p>
            </div>

            <div className="bg-blue-200 p-2 mt-3 rounded-md">
              <p className="text-blue-600 mb-1">Detalhes do pedido:</p>
              <p className="font-bold text-blue-700 uppercase mb-1">{props.info.title}</p>
              <p className="font-bold text-blue-700 mb-1">Nome: <span className="uppercase">{props.info.name}</span></p>
              <p className="font-bold text-blue-700 mb-1">Telefone: <span className="uppercase">{props.info.phone}</span></p>
              <p className="font-bold text-blue-700 mb-1">Valor total: <span className="uppercase">{formatPrice(props.info.price)}</span></p>
            </div>
          </form>
        </article>
      </article>
    </div>
  );
}
