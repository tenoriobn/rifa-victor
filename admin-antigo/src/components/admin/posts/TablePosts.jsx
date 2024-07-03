import { Link } from "react-router-dom";
import React from "react";
import imgRifa from "../../../assets/images/exRifa.jpg";
import eyeTel from "../../../assets/images/eye.svg";
import { formatDate, formatPrice, sendRequest } from "../../../util/util";
import { useState } from "react";

export default function TablePosts(props) {
  const postsData = props.postsData;

  const postsInfoRows = postsData.map((postData, index) => {
    return (
      <PostInfoRow
        handleDeleteContainer={props.handleDeleteContainer}
        postData={postData}
        key={index}
      />
    );
  });

  return (
    <table className="min-w-full w-fit text-left">
      <thead>
        <tr>
          <th className="border-t font-bold text-lg text-blue-950 uppercase border-b border-gray-400 p-8 pt-6 pb-6">
            Descrição
          </th>
          <th className="border-t font-bold text-lg text-blue-950 uppercase border-b border-gray-400 p-8 pt-6 pb-6">
            Valor
          </th>
          <th className="border-t font-bold text-lg text-blue-950 uppercase border-b border-gray-400 p-8 pt-6 pb-6">
            Ações
          </th>
        </tr>
      </thead>

      <tbody className="h-[200px]">{postsInfoRows}</tbody>
    </table>
  );
}

function PostInfoRow(props) {
  const [ativo, setAtivo] = React.useState(false);
  const [winnerInfo, setWinnerInfo] = useState();
  const refUl = React.useRef();
  const [ganhador, setGanhador] = React.useState("");
  const refButton = React.useRef();
  const [modalWin, setModalWin] = React.useState(false);
  const [inputError, setInputError] = React.useState(false);
  const [modalInfoWin, setModalInfoWin] = React.useState(false);
  const [seeNumber, setSeeNumber] = React.useState(false)
  const [numberPhone, setNumberPhone] = React.useState('*****-****')
  const postData = props.postData;

  function handleNumberPhone(){
    setSeeNumber(!seeNumber)
    if(seeNumber){
      setNumberPhone('*****-****')
    }else{
      setNumberPhone('78978-9632')
    }
  }

  function todayDate() {
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    const formattedToday = dd + '/' + mm + '/' + yyyy;
    return formattedToday;
  }

  function hideNum(phone) {
    if (phone.length > 4) {
      console.log()
      return phone.slice(0, 4) + phone.slice(4).replaceAll(/\d{4,5}/g, '****');
    }
    return phone;
  }
  

  async function submitModalWind(e) {
    e.preventDefault();
    if (ganhador.trim() === "") {
      setInputError(true);
      return;
    }
    
    const requestData = {
      method: "POST",
      url: "rifas/define-winner",
      body: { id: postData.id, cotaId: ganhador },
    }
    try {
      const response = await sendRequest(requestData);
  
      if (response.success === false) {
        alert(response.message);
        return;
      }
      setWinnerInfo({...response.data.buyer, winnerNum: ganhador});
      setModalWin(false);
      setModalInfoWin(true);
    } catch (error) {
      window.alert(`Houve um erro no servidor ${error}`);
    }
  }

  React.useEffect(() => {
    function handleClickOutside(event) {
      if (
        refUl.current &&
        !refUl.current.contains(event.target) &&
        refButton.current &&
        !refButton.current.contains(event.target)
      ) {
        setAtivo(false);
      }
    }

    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [refUl]);

  const domParser = new DOMParser();
  const contentDom = domParser.parseFromString(
    postData.description,
    "text/html"
  );

  const descriptionElements = contentDom.querySelectorAll("p");

  let description = "Nenhuma descrição encontrada.";
  let descriptionError = true;

  if (descriptionElements) {
    const descriptionsArray = Array.from(descriptionElements);

    for (const descriptionElement of descriptionsArray) {
      const descriptionText = descriptionElement.innerText;

      if (descriptionText.length >= 1) {
        descriptionError = false;
        description = descriptionText;
        break;
      }
    }
  }

  return (
    <>
      <tr>
        <td className="border-t border-b border-gray-400 ">
          <div className="flex items-center gap-4 p-8 pr-32 pt-6 pb-6">
            <div className="shrink-0">
              <picture>
                <img
                  className="w-32 h-32 object-cover"
                  src={postData.thumbnail.split(',')[0]}
                  alt="Thumbnail do Post"
                />
              </picture>
            </div>

            <div className="flex flex-col gap-2 shrink-0">
              <h2 className="text-lg max-w-[50ch] truncate text-nowrap text-primary font-bold">
                {postData.title}
              </h2>
              <p
                className={`text-base max-w-[50ch] truncate text-nowrap ${
                  !descriptionError
                    ? "text-tertiary font-normal"
                    : "text-red-500 font-medium"
                }`}
              >
                {description}
              </p>
            </div>
          </div>
        </td>

        <td className="border-t border-b border-gray-400 px-8">
          <p className="text-lg font-bold text-gray-700"> R${postData.price}</p>
        </td>

        <td className="border-t border-b border-gray-400 relative">
          <div className="p-8 pt-6 pb-6 text-2xl flex items-center gap-4">
            <button
              onClick={() =>
                props.handleDeleteContainer(postData.title, postData.id)
              }
              type="button"
              className="text-red-500 cursor-pointer hover:text-red-700 transition-all duration-200"
            >
              <i className="icon-bin"></i>
            </button>

            <Link
              to={`/rifas/${postData.id}`}
              className="text-yellow-400 cursor-pointer hover:text-yellow-600 transition-all duration-200"
            >
              <i className="icon-pencil"></i>
            </Link>

            <Link
              to="/"
              target="_blank"
              className="text-primary cursor-pointer hover:text-blue-900 transition-all duration-200"
            >
              <i className="icon-eye"></i>
            </Link>

            <div className="relative">
              <button
                ref={refButton}
                onClick={() => setAtivo((prev) => !prev)}
                className="bg-blue-900 text-white font-bold text-base py-2 px-4 cursor-pointer rounded-lg hover:bg-blue-700 transition-all duration-200"
              >
                Ações
              </button>
              {ativo && (
                <ul
                  ref={refUl}
                  className="absolute bg-slate-200 right-0  rounded-lg w-36  shadow-xl"
                >
                  <li className="">
                    <Link
                      to={`/compras/${postData.id}`}
                      className="text-black block text-sm font-bold py-2 px-2 hover:bg-slate-300 rounded-lg"
                    >
                      Compras
                    </Link>
                  </li>
                  <li
                    className="cursor-pointer"
                    onClick={() => setModalWin(!modalWin)}
                  >
                    <Link className="text-green-500 block text-sm font-bold py-2 px-2 hover:bg-slate-300 rounded-lg">
                      Definir Ganhador{" "}
                    </Link>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </td>
      </tr>

      {modalWin && (
        <div className="fixed flex flex-col items-center justify-center z-40 top-0 bottom-0 left-0 right-0 bg-transparentBlack min-h-screen p-2 pt-5 pb-10 sm:p-10">
          <form
            className="bg-white px-10 max-w-[550px] w-full py-10 relative rounded-2xl overflow-x-auto"
            onSubmit={submitModalWind}
          >
            <span
              onClick={() => setModalWin(false)}
              className="text-xl text-black absolute top-3 right-3 cursor-pointer font-bold"
            >
              X
            </span>
            <div>
              <h1 className="text-2xl font-bold text-center">
                Definir ganhador
              </h1>
              <span className="h-[3px] bg-blue-900 w-16 mx-auto mt-2 block"></span>
              <div className="my-4">
                <label
                  className="font-bold text-lg mb-2 block"
                  htmlFor="ganhador"
                >
                  Ganhador
                </label>
                <input
                  className={`p-2 pl-4 pr-4 text-base border-2 text-tertiary w-full ${
                    inputError ? "border-red-500" : "border-gray-300"
                  }`}
                  type="text"
                  id="ganhador"
                  placeholder="Cota vencedora"
                  value={ganhador}
                  onChange={(event) => {
                    setGanhador(event.target.value);
                    if (inputError) setInputError(false);
                  }}
                />
              </div>
              <div className="w-full">
                <button
                  type="submit"
                  className="bg-blue-900 text-white font-bold text-base py-2 px-4 cursor-pointer rounded-lg hover:bg-blue-700 transition-all duration-200 block mx-auto"
                >
                  Finalizar
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {modalInfoWin && winnerInfo && (
        <div className="fixed flex flex-col items-center justify-center z-40 top-0 bottom-0 left-0 right-0 bg-transparentBlack min-h-screen p-2 pt-5 pb-10 sm:p-10">
          <div className="bg-white px-10 max-w-[550px] w-full py-10 relative rounded-2xl overflow-x-auto">
            <span
              onClick={() => setModalInfoWin(false)}
              className="text-xl text-black absolute top-3 right-3 cursor-pointer font-bold"
            >
              X
            </span>
            <div className="flex gap-4">
              <div>
                <img className="rounded-lg w-40" src={postData.thumbnail.split(',')[0]} alt="" />
              </div>
              <div>
                <h1 className="text-2xl text-start font-bold mb-2">
                  Nome Sorteio
                </h1>
                <p className="font-bold">
                  Data do sorteio: <span>{todayDate()}</span>
                </p>
              </div>
            </div>
                <span className="h-[3px] bg-blue-900 w-16 mx-auto mt-2 block"></span>
            <div className="my-4">
              <div className="flex gap-3">
                <div>
                  <h2 className="font-bold text-5xl">1</h2>
                </div>
                <div>
                  <p className="font-bold mb-1">
                    Nome: <span>{winnerInfo.name}</span>
                  </p>
                  <p className="font-bold flex gap-3 mb-1">
                    Telefone: <span>{seeNumber ? winnerInfo.phone : hideNum(winnerInfo.phone)}</span>{" "}
                    <img onClick={handleNumberPhone} className="cursor-pointer" src={eyeTel} alt="" />
                  </p>
                  <p className="font-bold mb-1">
                    Status: <span className="text-white bg-green-500 p-1 rounded-md">{ winnerInfo.payment_status === 1 || winnerInfo.payment_status === 2 ? 'Pago' : 'Rifa gratuita' }</span>
                  </p>
                  <p className="font-bold mb-1">
                    Rifa: <span>{ postData.title }</span>
                  </p>
                  <p className="font-bold mb-1">
                    Data de Compra: <span>{ formatDate(winnerInfo.updated_at) }</span>
                  </p>
                  <p className="font-bold mb-1">
                    Número Sorteado: <span className="text-white bg-green-500 p-1 rounded-md">{winnerInfo.winnerNum}</span>
                  </p>
                  <p className="font-bold mb-1">
                    Valor Pago: <span className="text-white bg-blue-500 p-1 rounded-md">R$ {formatPrice(winnerInfo.price)}</span>
                  </p>
                  <p className="font-bold mb-1">
                    <span>{winnerInfo.numbers}</span> Bilhetes comprados
                  </p>
                <button className="bg-green-600 font-bold text-white py-1 px-2 rounded-lg hover:bg-green-700" onClick={() => window.open(`https://web.whatsapp.com/send?phone=${winnerInfo.phone.replaceAll(' ', '')}`,'_blank')}>Entrar em contato</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
