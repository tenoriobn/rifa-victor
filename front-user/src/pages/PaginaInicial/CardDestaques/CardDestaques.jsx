/* eslint-disable react-hooks/exhaustive-deps */
import { useRecoilState, useSetRecoilState } from "recoil";
import Bilhete from "../../../assets/Icons/bilhete.svg?react";
import { estadoProdutoSelecionado, estadoProdutos } from "../../../common/state/atom";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchDados } from "../../../common/http/http";
import CardAviso from "../../../components/CardAviso/CardAviso";
import AvisoCarregando from "../../../components/AvisoCarregando/AvisoCarregando";

export default function CardDestaques() {
  const [loading, setLoading] = useState(true);
  const [produto, setProdutos] = useRecoilState(estadoProdutos);
  const setProdutoSelecionado = useSetRecoilState(estadoProdutoSelecionado);
  const [erroConexao, setErroConexao] = useState(false);

  const obterDados = async () => {
    try {
      const dados = await fetchDados('/index');
      setProdutos(dados.data);
      setLoading(false);
    } catch (error) {
      setErroConexao(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    obterDados();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <AvisoCarregando />; 
  }

  if (erroConexao) {
    return (
      <CardAviso
        classes="border-rose-800 bg-rose-100 text-rose-800 flex flex-col items-start	"
        subtitulo="Ops!"
        mensagem=" Encontramos um problema ao processar as ofertas. Pedimos desculpas pelo inconveniente. Por favor, tente novamente em alguns minutos."
      >
        <button 
          onClick={obterDados}
          className="relative inline-block group text-white rounded overflow-hidden shadow-transparent shadow-md hover:shadow-black/3 0 bg-rose-600 duration-300"
        >
          <div className="absolute left-0 top-0 bg-rose-700 w-0 group-hover:w-full transition-all h-1/2 duration-300"></div>
          <div className="absolute right-0 bottom-0 bg-rose-700 w-0 group-hover:w-full transition-all h-1/2 duration-300" ></div>
          <div className="relative px-4 py-1 transition-all flex items-center justify-center gap-1 duration-300"> 
            Tentar novamente 
          </div>
        </button>
      </CardAviso>
    );
  }

  return (
    <>
      {produto ? (
        <Link 
          key={produto.id} 
          to={`/${produto.slug}/${produto.id}`}
          onClick={() => setProdutoSelecionado(produto)}
          className="flex w-auto overflow-hidden rounded-lg bg-neutral-200 hover:shadow-[4px_4px_4px_#0002] border border-solid border-neutral-400 ring-0 ring-amber-500/60 hover:ring-offset-4 hover:ring-2 transition-all duration-300 flex-col mb-6 cursor-pointer"
        >
          <img 
            src={`../../../public/imgRifas/${produto.rifa_image[0]?.path}`}            
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
                <p className="font-bold text-lg leading-5 text-neutral-600 text-left truncate">
                  R$ {Number(produto.price).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
              </div>

              <button 
                className="relative inline-block group bg-amber-500 text-white rounded overflow-hidden shadow-transparent shadow-md hover:shadow-black/30"
              >
                <div className="absolute left-0 top-0 bg-amber-600 w-0 group-hover:w-full transition-all duration-300 h-1/2"></div>
                <div className="absolute right-0 bottom-0 bg-amber-600 w-0 group-hover:w-full transition-all duration-300 h-1/2"></div>
                <div className="relative px-4 py-1 transition-all">
                  Comprar
                </div>
              </button>
            </div>
          </div>
        </Link>
      )  : (
        <CardAviso
          classes="border-yellow-600 bg-yellow-100 text-yellow-700"
          subtitulo="Nada aqui..."
          mensagem="Parece que estamos sem ofertas disponíveis no momento, mas não se preocupe, em breve teremos novidades! Fique ligado!"
        />
      )}
    </>
  )
}
