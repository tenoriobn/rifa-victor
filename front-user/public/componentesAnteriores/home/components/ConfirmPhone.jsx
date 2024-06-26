/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { usePay } from "../../../../src/context/PayContext";

export default function ConfirmPhone(props) {
  const [phone, setPhone] = useState("");
  const [confirmPhone, setConfirmPhone] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [disableBtn, setDisableBtn] = useState(false);
  const payInfo = usePay();

  function formatarTelefone(telefone) {
    telefone = telefone.replace(/\D/g, "");
    telefone = telefone.replace(/(\d{2})(\d)/, "($1) $2");
    telefone = telefone.replace(/(\d)(\d{4})$/, "$1-$2");
    return telefone;
  }

  useEffect(() => {
    setPhone(payInfo.phone);
  }, []);

  const handleChange = (event, setState) => {
    const formattedPhone = formatarTelefone(event.target.value);
    setState(formattedPhone);
    setError(""); // Clear error on input change
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (phone !== confirmPhone) {
      setError("Telefones diferentes");
      return;
    }

    if (name === '') {
      setError("Insira o seu nome");
      return;
    }
    payInfo.setName(name);
    props.submitBtn();
  };

  return (
    <div
      className={`${
        props.showPaymentContainer ? "flex" : "hidden"
      } fixed top-0 bottom-0 left-0 right-0 overflow-auto bg-[rgba(0,0,0,.7)] flex-col items-center justify-center p-4 z-50`}
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
            Você está adquirindo {props.rifaNumbers} número(s) do sorteio (
            {props.rifaTitle}), seu pedido será efetivado assim que concluir a
            compra.
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="name"
                  className="text-lg text-primary font-bold"
                >
                  Nome Completo
                </label>

                <input
                  className="p-2 w-full rounded-lg bg-white text-grayBlack text-base border border-grayBlue"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Seu Nome Completo"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="phone"
                  className="text-lg text-primary font-bold"
                >
                  Seu Telefone
                </label>

                <input
                  className="p-2 w-full rounded-lg bg-white text-grayBlack text-base border border-grayBlue"
                  type="text"
                  disabled={true}
                  placeholder="(11) 99999-9999"
                  value={phone}
                  onChange={(e) => handleChange(e, setPhone)}
                  maxLength={15}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="confirmPhone"
                  className="text-lg text-primary font-bold"
                >
                  Confirme Seu Telefone
                </label>

                <input
                  className="p-2 w-full rounded-lg bg-white text-grayBlack text-base border border-grayBlue"
                  type="text"
                  placeholder="(11) 99999-9999"
                  value={confirmPhone}
                  maxLength={15}
                  onChange={(e) => handleChange(e, setConfirmPhone)}
                />
              </div>
            </div>

            {error && <p className="text-red-500">{error}</p>}

            <p className="text-primary font-bold text-base">
              Informe seu telefone para continuar!
            </p>
            <button className="mt-4 block w-full p-2 text-white font-bold bg-blue-700" type="submit" disabled={disableBtn}>
              Continuar
            </button>
          </form>
        </article>
      </article>
    </div>
  );
}
