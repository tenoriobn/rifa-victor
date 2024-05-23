/* eslint-disable react/prop-types */
import { useState } from "react";
import { usePay } from "../../../context/PayContext";

export default function Payment(props) {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const payInfo = usePay();

  function formatarTelefone(telefone) {
    telefone = telefone.replace(/\D/g, "");
    telefone = telefone.replace(/(\d{2})(\d)/, "($1) $2");
    telefone = telefone.replace(/(\d)(\d{4})$/, "$1-$2");
    return telefone;
  }

  const handleChange = (event) => {
    const formattedPhone = formatarTelefone(event.target.value);
    setPhone(formattedPhone);
    setError(""); 
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const phonePattern = /^\(\d{2}\) \d{4,5}-\d{4}$/;
    if (!phonePattern.test(phone)) {
      setError("O telefone inválido");
      return;
    }
    payInfo.setPhone(phone);
    props.submitBtn();
  };

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
          <h2 className="text-secondary text-base font-medium">
            Você está adquirindo{" "}
            {props.rifaNumbers} número(s) do sorteio ({props.rifaTitle}), seu
            pedido será efetivado assim que concluir a compra.
          </h2>

          <form onSubmit={handleSubmit}>
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
                  value={phone}
                  maxLength={15}
                  onChange={handleChange}
                />
                {error && <p className="text-red-500">{error}</p>}
              </div>
            </div>

            <p className="text-primary font-bold text-base">
              Informe seu telefone para continuar!
            </p>
            <button  className=" mt-4 block w-full p-2 text-white font-bold bg-blue-700" type="submit" >
              Continuar
            </button>
          </form>
        </article>
      </article>
    </div>
  );
}
