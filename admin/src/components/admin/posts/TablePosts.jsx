import { Link } from "react-router-dom";
import React from "react";

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
  const refUl = React.useRef()

  console.log(refUl.current);
  const postData = props.postData;


  function useClickOutside(ref, callback) {
    console.log(ref,callback);
    React.useEffect(() => {
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                callback();
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [ref, callback]);
}

useClickOutside(refUl, () => setAtivo(false));

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
    <tr>
      <td className="border-t border-b border-gray-400 ">
        <div className="flex items-center gap-4 p-8 pr-32 pt-6 pb-6">
          <div className="shrink-0">
            <picture>
              <img
                className="w-32 h-32 object-cover"
                src={postData.thumbnail}
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
            onClick={() => setAtivo(!ativo)}
            className="bg-blue-900 text-white font-bold text-base py-2 px-4 cursor-pointer rounded-lg hover:bg-blue-700 transition-all duration-200"
          >
            Ações
          </button>
          {ativo && (
            <ul ref={refUl} className="absolute bg-slate-200 right-0  rounded-lg w-36  shadow-xl">
              <li className="">
                <Link className="text-black block text-sm font-bold py-2 px-2 hover:bg-slate-300 rounded-lg">Compras</Link>
              </li>
              <li className="">
                <Link className="text-green-500 block text-sm font-bold py-2 px-2 hover:bg-slate-300 rounded-lg">Definir Ganhador </Link>
              </li>
            </ul>
          )}
          </div>

        </div>
      </td>
    </tr>
  );
}
