import React, { useEffect, useState } from "react";
import infoCheck from "../../../public/assets/images/check2.svg";
import { formatDate, formatPrice, sendRequest } from "../../util/util";
import Login from "../../components/Login";
import Paying from "./Paying";
import Links from "../home/components/Links";


export default function MeusNumeros() {
  const [modalNumberCota, setModalNumberCota] = React.useState(false);
  const [numbersCota, setNumbersCota] = useState();
  const [showLoginContainer, setShowLoginContainer] = useState(true);
  const [orders, setOrders] = useState(null);
  const [client, setClient] = useState();
  const [orderId, setOrderId] = useState();
  const [qrCodeBase64, setQrCodeBase64] = useState();
  const [paymentHash, setPaymentHash] = useState();
  const [payingRifa, setPayingRifa] = useState();

  function payment(status) {
    switch (status) {
      case 0:
        return (<span className="bg-red-600 text-sm font-bold p-[2px] rounded">
          Não Pago
        </span>);
      case 1:
        return (<span className="bg-green-600 text-sm font-bold p-[2px] rounded">
          Pago
        </span>);
      case 2:
        return (<span className="bg-green-600 text-sm font-bold p-[2px] rounded">
          Pago
        </span>);
      case 3:
        return (<span className="bg-yellow-600 text-sm font-bold p-[2px] rounded">
          Em processamento
        </span>);
      case 10:
        return (<span className="bg-green-600 text-sm font-bold p-[2px] rounded">
          De graça
        </span>);
      default:
        return;
    }
  }
  async function getNumbers(phone, setError = null) {
    const requestData = {
      method: "POST",
      body: { phone: phone },
      url: `get-numbers`,
    }

    try {
      const response = await sendRequest(requestData);
      if (!response.success) {
        if (setError) {
          setError(response.msg)
        }
        return;
      }
      if (response.data.orders && response.data.orders.length > 0) {
        localStorage.setItem('phone', phone);
        setOrders(response.data.orders);
        setClient(response.data.client);
      } else {
        setOrders([]);
      }
      setShowLoginContainer(false);
    } catch (error) {
      // window.alert(`Houve um erro no servidor ${error}`);
    }
  }

  async function getQr(cotaId) {
    const requestData = {
      method: "POST",
      body: { cotaId },
      url: `pay-cota`,
    }

    try {
      const response = await sendRequest(requestData);
      if (!response.success) {
        return;
      }
      setPaymentHash(response.data.hash);
      setQrCodeBase64(response.data.qrCode);
    } catch (error) {
      // window.alert(`Houve um erro no servidor ${error}`);
    }
  }

  useEffect(() => {
    const phone = localStorage.getItem('phone');
    if (phone) {
      getNumbers(phone);
    }
  }, []);
  return (
    <section>
      <article className="flex flex-col gap-4">
        <h2 className="font-bold text-2xl sm:text-3xl">Meus pedidos</h2>
        {orders && orders.length > 0 && orders.map((order) => (
          <div key={order.id} className="bg-[#001c44] p-3 mb-3">
            <div className="flex mb-4 gap-4">
              <div>
                <img className="w-44 rounded-lg" src={order.thumbnail.split(',')[0]} alt="" />
              </div>
              <div>
                <p className="text-2xl font-bold mb-2">{order.title}</p>
                <p className="mb-1">
                  Pedido: <span>#{order.id}</span>{" "}
                  {
                    payment(order.payment_status)
                  }
                </p>
                <p className="mb-1">{client.name} {client.phone}</p>
                <p className="mb-1">
                  Valor da compra: <span className="font-bold">R$ {formatPrice(order.price)}</span>
                </p>
                <p>
                  Data da compra:{" "}
                  <span className="font-bold">{ formatDate(order.created_at) }</span>
                </p>
              </div>
            </div>
            <div className="flex">
              {order.payment_status === 0 ? (<button onClick={() => {
                getQr(order.id);
                setPayingRifa({ title: order.title, price: order.price, name: client.name, phone: client.phone })
              }} className="bg-red-600 text-white font-bold py-1 px-1 flex-1 hover:bg-red-700 rounded-l-md ">
                PAGAR PEDIDO
              </button>) : (<button
                onClick={() => {
                  setModalNumberCota(!modalNumberCota);
                  setNumbersCota(order.numbers.split(','));
                  setOrderId(order.id);
                }}
                className="bg-green-600 text-white font-bold py-1 px-1 flex-1 hover:bg-green-700 rounded-l-md "
              >
                VER NUMEROS
              </button>)}
              <button className="bg-yellow-500 text-black font-bold py-1 px-1 flex-1 hover:bg-yellow-600 rounded-r-md ">
              VER SORTEIO
            </button>
            </div>
          </div>
        ))}
        {orders && orders.length === 0 && (<h1>SEM PEDIDOS</h1>)}
      </article>
      {
        localStorage.getItem('phone') === null && (
          <Login submitBtn={ (phone, setError) => {
            getNumbers(phone, setError);
          } } closeLoginContainer={() => setShowLoginContainer(false)} showLoginContainer={showLoginContainer} />
        )
      }
      {
        paymentHash && qrCodeBase64 && payingRifa && (
          <Paying info={payingRifa} paymentHash={paymentHash} qrCodeBase64={qrCodeBase64} />
        )
      }
      {modalNumberCota && numbersCota && orderId && (
        <div className="fixed flex flex-col items-center justify-center z-40 top-0 bottom-0 left-0 right-0 bg-transparentBlack min-h-screen p-2 pt-5 pb-10 sm:p-10">
          <div className="bg-white px-10 max-w-[550px] w-full py-10 relative rounded-2xl overflow-x-auto">
            <span
              onClick={() => setModalNumberCota(false)}
              className="text-xl text-black absolute top-3 right-3 cursor-pointer font-bold"
            >
              X
            </span>
            <div>
              <h1 className="text-2xl mb-4 font-bold text-black text-center">
                Números do Pedido: <span>#{orderId}</span>
              </h1>
              <span className="h-[3px] bg-blue-900 w-16 mx-auto mt-2 block"></span>
              <div className="h-32 overflow-x-hidden py-2 my-2 overflow-y-auto">
                <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
                  {numbersCota.map((element) => (
                    <div key={element} className="flex gap-1 text-sm items-center bg-green-500 p-1 rounded-md text-white w-20">
                      <img src={infoCheck} alt="" />
                      <p>{element}</p>
                    </div>
                  ))}
                </div>
              </div>
              <span className="h-[3px] bg-blue-900 w-16 mx-auto mt-2 block"></span>

              <div className="w-full flex justify-end mt-2">
                <button onClick={() => setModalNumberCota(false)} className="bg-gray-400 text-white p-2 font-bold rounded-md  ">Fechar</button>
              </div>
            </div>
          </div>

        </div>
      )}
          <Links />
    </section>
  );
}
