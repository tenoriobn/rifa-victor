import React from "react";
import imgRifa from "../../../public/assets/images/exRifa.jpg";
import infoCheck from "../../../public/assets/images/check2.svg";


export default function MeusNumeros() {
  const [modalNumberCota, setModalNumberCota] = React.useState(false);
  // useEffect(() => {}, []);
  return (
    <section>
      <article className="flex flex-col gap-4">
        <h2 className="font-bold text-2xl sm:text-3xl">Meus pedidos</h2>

        <div className="bg-[#001c44] p-3 mb-3">
          <div className="flex mb-4 gap-4">
            <div>
              <img className="w-44 rounded-lg" src={imgRifa} alt="" />
            </div>
            <div>
              <p className="text-2xl font-bold mb-2">Nome sorteio</p>
              <p className="mb-1">
                Pedido: <span>#31994</span>{" "}
                <span className="bg-red-600 text-sm font-bold p-[2px] rounded">
                  Não Pago
                </span>
              </p>
              <p className="mb-1">BERNARDO COSTA (21)99927-7666</p>
              <p className="mb-1">
                Valor da compra: <span className="font-bold">R$ 4,50</span>
              </p>
              <p>
                Data da compra:{" "}
                <span className="font-bold">22/05/2024 às 22:53:50</span>
              </p>
            </div>
          </div>
          <div className="flex">
            <button className="bg-red-600 text-white font-bold py-1 px-1 flex-1 hover:bg-red-700 rounded-l-md ">
              PAGAR PEDIDO
            </button>
            <button className="bg-yellow-500 text-black font-bold py-1 px-1 flex-1 hover:bg-yellow-600 rounded-r-md ">
              VER SORTEIO
            </button>
          </div>
        </div>
        <div className="bg-[#001c44] p-3 mb-3">
          <div className="flex mb-4 gap-4">
            <div>
              <img className="w-44 rounded-lg" src={imgRifa} alt="" />
            </div>
            <div>
              <p className="text-2xl font-bold mb-2">Nome sorteio</p>
              <p className="mb-1">
                Pedido: <span>#31994</span>{" "}
                <span className="bg-green-600 text-sm font-bold p-[2px] rounded">
                  Pago
                </span>
              </p>
              <p className="mb-1">BERNARDO COSTA (21)99927-7666</p>
              <p className="mb-1">
                Valor da compra: <span className="font-bold">R$ 4,50</span>
              </p>
              <p>
                Data da compra:{" "}
                <span className="font-bold">22/05/2024 às 22:53:50</span>
              </p>
            </div>
          </div>
          <div className="flex">
            <button
              onClick={() => setModalNumberCota(!modalNumberCota)}
              className="bg-green-600 text-white font-bold py-1 px-1 flex-1 hover:bg-green-700 rounded-l-md "
            >
              VER NUMEROS
            </button>
            <button className="bg-yellow-500 text-black font-bold py-1 px-1 flex-1 hover:bg-yellow-600 rounded-r-md ">
              VER SORTEIO
            </button>
          </div>
        </div>
      </article>

      {modalNumberCota && (
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
              Números do Pedido: <span>#20144</span>
              </h1>
              <span className="h-[3px] bg-blue-900 w-16 mx-auto mt-2 block"></span>
              <div className="h-32 overflow-x-hidden py-2 my-2 overflow-y-auto">
                    <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
                      <div className="flex gap-1 text-sm items-center bg-green-500 p-1 rounded-md text-white w-20">
                        <img src={infoCheck} alt="" />
                        <p>48504</p>
                      </div>
                      <div className="flex gap-1 text-sm items-center bg-green-500 p-1 rounded-md text-white w-20">
                        <img src={infoCheck} alt="" />
                        <p>48504</p>
                      </div>
                      <div className="flex gap-1 text-sm items-center bg-green-500 p-1 rounded-md text-white w-20">
                        <img src={infoCheck} alt="" />
                        <p>48504</p>
                      </div>
                      <div className="flex gap-1 text-sm items-center bg-green-500 p-1 rounded-md text-white w-20">
                        <img src={infoCheck} alt="" />
                        <p>48504</p>
                      </div>
                      <div className="flex gap-1 text-sm items-center bg-green-500 p-1 rounded-md text-white w-20">
                        <img src={infoCheck} alt="" />
                        <p>48504</p>
                      </div>
                      <div className="flex gap-1 text-sm items-center bg-green-500 p-1 rounded-md text-white w-20">
                        <img src={infoCheck} alt="" />
                        <p>48504</p>
                      </div>
                      <div className="flex gap-1 text-sm items-center bg-green-500 p-1 rounded-md text-white w-20">
                        <img src={infoCheck} alt="" />
                        <p>48504</p>
                      </div>
                      <div className="flex gap-1 text-sm items-center bg-green-500 p-1 rounded-md text-white w-20">
                        <img src={infoCheck} alt="" />
                        <p>48504</p>
                      </div>
                      <div className="flex gap-1 text-sm items-center bg-green-500 p-1 rounded-md text-white w-20">
                        <img src={infoCheck} alt="" />
                        <p>48504</p>
                      </div>
                      <div className="flex gap-1 text-sm items-center bg-green-500 p-1 rounded-md text-white w-20">
                        <img src={infoCheck} alt="" />
                        <p>48504</p>
                      </div>
                      <div className="flex gap-1 text-sm items-center bg-green-500 p-1 rounded-md text-white w-20">
                        <img src={infoCheck} alt="" />
                        <p>48504</p>
                      </div>
                      <div className="flex gap-1 text-sm items-center bg-green-500 p-1 rounded-md text-white w-20">
                        <img src={infoCheck} alt="" />
                        <p>48504</p>
                      </div>
                      <div className="flex gap-1 text-sm items-center bg-green-500 p-1 rounded-md text-white w-20">
                        <img src={infoCheck} alt="" />
                        <p>48504</p>
                      </div>
                      <div className="flex gap-1 text-sm items-center bg-green-500 p-1 rounded-md text-white w-20">
                        <img src={infoCheck} alt="" />
                        <p>48504</p>
                      </div>
                      <div className="flex gap-1 text-sm items-center bg-green-500 p-1 rounded-md text-white w-20">
                        <img src={infoCheck} alt="" />
                        <p>48504</p>
                      </div>
                      <div className="flex gap-1 text-sm items-center bg-green-500 p-1 rounded-md text-white w-20">
                        <img src={infoCheck} alt="" />
                        <p>48504</p>
                      </div>
                      <div className="flex gap-1 text-sm items-center bg-green-500 p-1 rounded-md text-white w-20">
                        <img src={infoCheck} alt="" />
                        <p>48504</p>
                      </div>
                      <div className="flex gap-1 text-sm items-center bg-green-500 p-1 rounded-md text-white w-20">
                        <img src={infoCheck} alt="" />
                        <p>48504</p>
                      </div>
                      <div className="flex gap-1 text-sm items-center bg-green-500 p-1 rounded-md text-white w-20">
                        <img src={infoCheck} alt="" />
                        <p>48504</p>
                      </div>
                      <div className="flex gap-1 text-sm items-center bg-green-500 p-1 rounded-md text-white w-20">
                        <img src={infoCheck} alt="" />
                        <p>48504</p>
                      </div>
                      <div className="flex gap-1 text-sm items-center bg-green-500 p-1 rounded-md text-white w-20">
                        <img src={infoCheck} alt="" />
                        <p>48504</p>
                      </div>
                      <div className="flex gap-1 text-sm items-center bg-green-500 p-1 rounded-md text-white w-20">
                        <img src={infoCheck} alt="" />
                        <p>48504</p>
                      </div>
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
    </section>
  );
}
