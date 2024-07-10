import imgRifa from "../../../assets/images/exRifa.jpg";
import btnInfoRifa from "../../../assets/images/clock.svg";
import infoCheck from "../../../assets/images/check2.svg";
import React from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { formatDate, formatPrice, sendRequest } from '../../../util/util'
import { useState } from "react";

export default function Buyers() {
  const [teleofne, setTeleofne] = React.useState("");
  const [cota, setCota] = React.useState("");
  const [rifaInfo, setRifaInfo] = useState();
  const [buyers, setBuyers] = useState();
  const rifaId = useParams().rifaId;
  const [id, setId] = React.useState("");
  const [ativoPesquisa, setAtivoPesquisa] = React.useState(false);
  const [modalInfo, setModalInfo] = React.useState(false);
  const [buyerInfo, setBuyerInfo] = useState();

  function handleClear() {
    setCota("");
    setId("");
    setTeleofne("");
  }

  function selectColor(paymentId) {
    switch (paymentId) {
      case 0:
        return 'yellow';;
      case 1:
        return 'green';
      default:
        return 'green';
    }
  }

  async function getOrder() {
    const requestData = {
      method: "POST",
      body: { id: rifaId, cota: cota, buyId: id, phone: teleofne },
      url: `rifas/search-order`,
    };

    try {

      const response = await sendRequest(requestData);

      if (!response.success) {
        alert("Compra não encontrada")
        return;
      }

      const responseData = response.data;

      // setRifaInfo(responseData.rifa);
      setModalInfo(true);
      setBuyerInfo(responseData.buyer);



    } catch (error) {
      window.alert(`Houve um erro no servidor ${error}`);
    }
  }

  async function getOrders() {
    const requestData = {
      method: "GET",
      url: `rifas/orders/${rifaId}`,
    };

    try {

      const response = await sendRequest(requestData);

      if (!response.success) {
        return;
      }

      const responseData = response.data;
      setRifaInfo(responseData.rifa);
      setBuyers(responseData.buyers);



    } catch (error) {
      window.alert(`Houve um erro no servidor ${error}`);
    }
  }

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <>
      <section>
        <div className="flex justify-end">
          <button
            onClick={() => setAtivoPesquisa(!ativoPesquisa)}
            class="cursor-pointer mb-4 h-full p-2 pr-5 pl-5 inline-block rounded-lg bg-blue-900 hover:opacity-90"
            type="submit"
          >
            <i class="icon-search text-lg text-white"></i>
          </button>
        </div>
        {ativoPesquisa && (
          <div className="border-2 border-black p-3	">
            <div className="flex gap-3">
              <div>
                <label className="font-bold text-lg mb-2 block" htmlFor="tel">
                  Telefone
                </label>
                <input
                  type="text"
                  id="tel"
                  value={teleofne}
                  onChange={(event) => setTeleofne(event.target.value)}
                  className="p-2 pl-4 pr-4 text-base border-2 border-gray-300 text-tertiary w-full"
                />
              </div>
              <div>
                <div>
                  <label
                    className="font-bold text-lg mb-2 block"
                    htmlFor="cota"
                  >
                    Cota
                  </label>
                  <input
                    type="text"
                    id="cota"
                    value={cota}
                    onChange={(event) => setCota(event.target.value)}
                    className="p-2 pl-4 pr-4 text-base border-2 border-gray-300 text-tertiary w-full"
                  />
                </div>
              </div>
            </div>
            <div className="flex mb-2">
              <div className="">
                <label className="font-bold text-lg mb-2 block" htmlFor="id">
                  Id Compra
                </label>
                <input
                  type="text"
                  id="id"
                  value={id}
                  onChange={(event) => setId(event.target.value)}
                  className="p-2 pl-4 pr-4 text-base border-2 border-gray-300 text-tertiary w-full"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <button onClick={() => getOrder()} className="text-white bg-blue-900 font-bold hover:opacity-90 p-2 my-3">
                Buscar
              </button>
              <button
                onClick={handleClear}
                className="text-black bg-gray-300 font-bold hover:opacity-90 p-2"
              >
                Limpar Busca
              </button>
            </div>
          </div>
        )}
      </section>
      <section>
        {buyers && buyers.length > 0 && (
          buyers.map((buyer) => (<div className={`bg-${selectColor(buyer.payment_status)}-600 py-4 px-4 text-white mt-4 flex flex-col gap-3 sm:gap-0 sm:flex-row items-center justify-between mb-4`}>
          <div className="flex items-center gap-3">
            <div className="">
              <img className="w-32 object-cover" src={imgRifa} alt="" />
            </div>
            <div className="font-bold">
              <p>#{buyer.id}</p>
              <p>{buyer.name}</p>
            </div>
          </div>
          <div className="font-bold">
            <p>{buyer.numbers} cotas</p>
            <p>
              R$ <span>{formatPrice(buyer.price)}</span>
            </p>
          </div>
          <div>
            <button
              onClick={() => {
                setModalInfo(true);
                setBuyerInfo(buyer);
              }}
              className="bg-blue-900 p-3 rounded-md cursor-pointer hover:bg-blue-700"
            >
              <img src={btnInfoRifa} alt="" />
            </button>
          </div>
        </div>))
        )}
        {buyers && buyers.length === 0 && (
          <h1>Sem compras</h1>
        )}
      </section>

      {modalInfo && buyerInfo && (
        <div className="fixed flex flex-col items-center justify-center z-40 top-0 bottom-0 left-0 right-0 bg-transparentBlack min-h-screen p-2 pt-5 pb-10 sm:p-10">
          <div className="bg-white px-10 max-w-[550px] w-full py-10 relative rounded-2xl overflow-x-auto">
            <span
              onClick={() => setModalInfo(false)}
              className="text-xl text-black absolute top-3 right-3 cursor-pointer font-bold"
            >
              X
            </span>
            <div>
              <h1 className="text-2xl font-bold text-center">
                Detalhes Compra
              </h1>
              <span className="h-[3px] bg-blue-900 w-14 mx-auto mt-2 block"></span>
              <div>
                <div className="flex justify-between my-3 gap-2 flex-col sm:flex-row">
                  <div>
                    <label className="font-bold mb-1 block" htmlFor="">Nome</label>
                    <input
                      className="p-2 pl-4 pr-4 text-base border-2 border-gray-300 text-tertiary w-full"
                      type="text"
                      value={buyerInfo.name}
                      disabled
                    />
                  </div>
                  <div>
                    <label className="font-bold mb-1 block" htmlFor="">Telefone</label>
                    <input
                      className="p-2 pl-4 pr-4 text-base border-2 border-gray-300 text-tertiary w-full"
                      type="text"
                      value={buyerInfo.phone}
                      disabled
                    />
                  </div>
                </div>
                <div>
                  <div className="mb-3">
                    <label className="font-bold mb-1 block" htmlFor="">Sorteio</label>
                    <input
                      type="text"
                      className="p-2 pl-4 pr-4 text-base border-2 border-gray-300 text-tertiary w-full"
                      value={rifaInfo.title}
                      disabled
                    />
                  </div>
                </div>

                <div>
                  <p className="font-bold mb-1 block">Cotas</p>
                  <div className="h-32 overflow-x-hidden py-2 overflow-y-auto">
                    <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
                      {
                        buyerInfo.nums.split(',').map((element) => (
                          <div className="flex gap-1 text-sm items-center bg-green-500 p-1 rounded-md text-white w-20">
                            <img src={buyerInfo.payment_status === 1 ? infoCheck : ""} alt="" />
                            <p>{element}</p>
                          </div>
                        ))
                      }
                    </div>
                  </div>
                  <span class="h-[3px] bg-blue-900 w-16 mx-auto mt-2 block"></span>
                  <div className="flex justify-start gap-4 my-4 ">
                    <div>
                      <p className="font-bold mb-1 block">Subtotal</p>
                      <p>R$ <span>{formatPrice(buyerInfo.price)}</span></p>
                    </div>
                    <div>
                      <p className="font-bold mb-1 block">Desconto</p>
                      <p>R$ <span>{formatPrice(buyerInfo.price)}</span></p>
                    </div>
                  </div>
                  <div className="my-4">
                    <p className="font-bold mb-1 block">Situação da comprar</p>
                    <p>{buyerInfo.payment_status === 1 ? "Compra Aprovada" : "Pagamento pendente"}</p>
                  </div>
                  <span class="h-[3px] bg-blue-900 w-16 mx-auto mt-2 block"></span>
                  <div className="flex gap-4 my-4 flex-col sm:flex-row">
                    <div className="flex-1" >
                      <p className="font-bold mb-1 block">Reserva efetuada</p>
                      <p>{formatDate(buyerInfo.created_at)}</p>
                    </div>
                    <div className="flex-1">
                      <p className="font-bold mb-1 block">Pagamento efetuado (PIX)</p>
                      <p>{formatDate(buyerInfo.updated_at)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
