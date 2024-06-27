import { useRecoilState, useSetRecoilState } from "recoil";
import Bilhete from "../../../assets/Icons/bilhete.svg?react";
import { estadoProdutoSelecionado, estadoProdutos } from "../../../common/state/atom";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchDados } from "../../../common/http/http";

export default function CardDestaques() {
  const [loading, setLoading] = useState(true);
  const [produto, setProdutos] = useRecoilState(estadoProdutos);
  // const produtosFiltrados = produtos.filter(produto => produto.id === 1);
  const setProdutoSelecionado = useSetRecoilState(estadoProdutoSelecionado);

  useEffect(() => {
    const obterDados = async () => {
      const dados = await fetchDados('/index');
      setProdutos(dados.data);
      setLoading(false); 
    };
    
    obterDados();
  }, []);

  if (loading) {
    return <div>Carregando...</div>; 
  }
  const converterImgProduto = (imgs) => {
    let img = imgs.replace(/\\"/g, '"');
    let imgArray = JSON.parse(img);
    let primeiroElemento = imgArray[0];
    return primeiroElemento; 
  };

  return (
    <>
      {produto ? (
        <Link 
          key={produto.id} 
          to={`/${produto.slug}/${produto.id}`}
          onClick={() => setProdutoSelecionado(produto)}
          className="flex w-auto overflow-hidden rounded-lg bg-neutral-200 hover:shadow-[4px_4px_4px_#0002] border border-solid border-neutral-400 ring-0 ring-amber-500/60 hover:ring-offset-4 hover:ring-2 transition-all flex-col mb-6 cursor-pointer"
        >
          <img src= {converterImgProduto(produto.img)}
            alt="Foto do Prêmio" 
            className="aspect-[16/9] w-full max-h-[200px] object-cover transition-all"
          />

          <div className="flex grow flex-col bg-neutral-100 overflow-hidden p-2">
            <p className="text-lg w-full font-semibold text-neutral-900 text-left truncate">
              {produto.title}
            </p>

            <p className="text-sm w-full text-neutral-600 text-left truncate">{produto.description_resume}</p>

            <div className="flex justify-between mt-2">
              <div className='flex items-center gap-2'>
                <Bilhete className="icon text-emerald-500 w-[18px] h-[18px]" />
                <p className="font-bold text-lg leading-4 text-neutral-600 text-left truncate">{produto.price}</p>
              </div>

              <button className="bg-amber-500 rounded px-4 py-1">Comprar</button>
            </div>
          </div>
        </Link>
      )  : (
        <p>Não tem!</p>
      )}
    </>
  )
}
