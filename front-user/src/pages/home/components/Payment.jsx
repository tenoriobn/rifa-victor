import { useEffect, useState } from "react";
import { sendRequest } from "../../../util/util";

export default function Payment(props) {
  const [qrCodeBase64, setQrCodeBase64] = useState();
  const [paymentHash, setPaymentHash] = useState();
  
  useEffect(() => {
    async function generatePaymentQRCode() {
      const requestData = {
        method: "POST",
        body: { email: "teste@gmail.com" },
        url: "pix",
      };
      const { data } = await sendRequest(requestData);
      setPaymentHash(data.hash);
      setQrCodeBase64(data.qrCode);
    }
    generatePaymentQRCode();
  }, []);

  return (
    <div
      className={`${
        props.showPaymentContainer ? "flex" : "hidden"
      } fixed top-0 bottom-0 left-0 right-0 overflow-auto bg-[rgba(0,0,0,.7)] flex-col items-center justify-center p-4`}
    >
      <article className="w-full max-w-xl bg-white p-4 py-16 rounded-lg relative">
        <i
          onClick={() => props.closePaymentContainer()}
          className="icon-times-circle-o text-3xl text-secondary absolute top-4 right-4 cursor-pointer"
        >
          {" "}
        </i>

        <article className="flex flex-col gap-2">
          {
            qrCodeBase64 && (<img src={`data:image/jpeg;base64,${qrCodeBase64}`}/>)
          }
          {
            paymentHash && (<h2 className="text-secondary text-base font-medium text-hash">
            {paymentHash}
          </h2>)
          }
          <h2 className="text-secondary text-base font-medium">
            Você está adquirindo {props.rifaNumbers} número(s) do sorteio (
            {props.rifaTitle}), seu pedido será efetivado assim que concluir a
            compra.
          </h2>

          <form action="">
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="phone"
                  className="text-lg text-primary font-bold"
                >
                  Seu Telefone:
                </label>

                <input
                  className="p-2 w-full rounded-lg bg-white text-grayBlack text-base border border-grayBlue"
                  type="text"
                  placeholder="(11) 99999-9999"
                />
              </div>
              <p className="text-base font-medium text-red-600">
                {" "}
                Phone Error{" "}
              </p>
            </div>

            <p className="text-primary font-bold text-base">
              Informe seu telefone para continuar!
            </p>
          </form>
        </article>
      </article>
    </div>
  );
}
