/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import Bilhete from "../../assets/Icons/bilhete.svg?react";
import Calendario from "../../assets/Icons/calendario.svg?react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { estadoProdutoSelecionado, estadoProdutos } from "../../common/state/atom";
import { useEffect, useState } from "react";
import { fetchDados } from "../../common/http/http";

export default function CardProdutos({ categoria }) {
  const [produtos, setProdutos] = useRecoilState(estadoProdutos);
  const setProdutoSelecionado = useSetRecoilState(estadoProdutoSelecionado);
  const produtosFiltrados = produtos.filter(produto => produto.status === categoria);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const obterDados = async () => {
      const dados = await fetchDados('/produtos');
      setProdutos(dados.data);
      setLoading(false); 
    };
    
    obterDados();
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
    <div className="flex flex-col gap-4">
      {produtosFiltrados.map(produto => (
        <Link 
          key={produto.id} 
          to={`/${produto.slug}/${produto.id}`}
          onClick={() => setProdutoSelecionado(produto)}
          className="flex w-auto overflow-hidden rounded-lg bg-neutral-200 hover:shadow-[4px_4px_4px_#0002] border border-solid border-neutral-400 ring-0 ring-amber-500/60 hover:ring-offset-4 hover:ring-2 transition-all"
        >
          <img 
            className="w-[80px] m-2 rounded-lg object-cover transition-all" 
            src={converterImgProduto(produto.img)} 
            alt={`Imagem do ${produto.title}`}
          />

          <div className="flex grow flex-col bg-neutral-100 overflow-hidden p-2">
            <p className="text-lg w-full font-semibold text-neutral-900 text-left truncate">
              {produto.title}
            </p>

            <p className="text-sm w-full text-neutral-600 text-left truncate">
              {produto.description_resume}
            </p>
            
            <div className="flex items-end justify-between mt-2">
              <div className="flex flex-col gap-2">
                {categoria === "finalizadas" && (
                  <div className='flex items-center gap-2'>
                    <Calendario className="icon text-amber-500" />
                    <p className="text-sm font-semibold text-zinc-700">{produto.end_rifa} - <span>(-69 Dias)</span></p>
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <Bilhete className="icon text-emerald-500 w-[18px] h-[18px]" />
                  <p className="font-bold text-lg leading-4 text-neutral-600 text-left truncate">{produto.price}</p>
                </div>
              </div>

              <button className="bg-amber-500 hover:bg-black rounded px-4 py-1 transition-all">
                {categoria === "ativas" ? "Comprar" : "Ver"}
              </button>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
