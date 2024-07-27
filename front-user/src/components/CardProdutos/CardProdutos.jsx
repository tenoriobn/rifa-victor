/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import Bilhete from "../../assets/Icons/bilhete.svg?react";
import Calendario from "../../assets/Icons/calendario.svg?react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { estadoProdutoSelecionado, estadoProdutos, estadoRenderizaComponenteCadastro, estadoRenderizaComponenteLogin, estadoRenderizaInfoUsuario } from "../../common/state/atom";
import { useEffect, useState } from "react";
import { fetchDados } from "../../common/http/http";
import CardAviso from "../CardAviso/CardAviso";
import AvisoCarregando from "../AvisoCarregando/AvisoCarregando";
import useFormattedDate from "../../common/state/hooks/useFormattedDate/useFormattedDate ";

export default function CardProdutos({ categoria }) {
  const [produtos, setProdutos] = useRecoilState(estadoProdutos);

  const setProdutoSelecionado = useSetRecoilState(estadoProdutoSelecionado);
  const produtosFiltrados = Array.isArray(produtos) ? produtos.filter(produto => produto.status === categoria) : [];
  const setRenderizaInfoUsuario = useSetRecoilState(estadoRenderizaInfoUsuario);
  const setRenderizaComponenteCadastro = useSetRecoilState(estadoRenderizaComponenteCadastro);
  const setRenderizaComponenteLogin = useSetRecoilState(estadoRenderizaComponenteLogin);
  const [erroConexao, setErroConexao] = useState(false);
  const { formattedDate } = useFormattedDate();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const obterDados = async () => {
      try {
        const dados = await fetchDados('/produtos');
        setProdutos(dados.data);
        setLoading(false); 
      } catch (error) {
        setErroConexao(true);
        setLoading(false);
      }
    };
    
    obterDados();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (erroConexao) {
    return (
      <CardAviso
        classes="border-rose-800 bg-rose-100 text-rose-800"
        subtitulo="Ops!"
        mensagem="Encontramos um problema ao processar as ofertas. Pedimos desculpas pelo inconveniente. Por favor, tente novamente em alguns minutos."
      />
    );
  }

  if (loading) {
    return <AvisoCarregando />; 
  }

  const formatarData = (dataString) => {
    const data = new Date(dataString);
    const dia = data.getDate().toString().padStart(2, '0');
    const mes = (data.getMonth() + 1).toString().padStart(2, '0'); // Os meses começam do zero, por isso soma-se 1
    const ano = data.getFullYear().toString(); // Obter o ano completo
    
    // Calcular a diferença em milissegundos entre as duas datas
    const diferenca = new Date() - data;
    
    // Converter a diferença de milissegundos para dias
    const diasPassados = Math.floor(diferenca / (1000 * 60 * 60 * 24));
  
    return `${dia}/${mes}/${ano} - (-${diasPassados} Dias)`;
  };

  const handleClick = (produto) => () => {
    setProdutoSelecionado(produto);
    setRenderizaInfoUsuario(false);
    setRenderizaComponenteCadastro(false);
    setRenderizaComponenteLogin(false);
  };
  
  return (
    <div className="flex flex-col gap-4">
      {produtosFiltrados.length > 0 ? (
        produtosFiltrados.map(produto => (
          <Link 
            key={produto.id} 
            to={`/${produto.slug}/${produto.id}`}
            onClick={handleClick(produto)}
            className="flex w-auto overflow-hidden rounded-lg bg-neutral-200 hover:shadow-[4px_4px_4px_#0002] border border-solid border-neutral-400 ring-0 ring-amber-500/60 hover:ring-offset-4 hover:ring-2 transition-all duration-300"
          >
            <img 
              className="w-[80px] m-2 rounded-lg object-cover transition-all" 
              src={`../../../public/imgRifas/${produto.rifa_image[0]?.path}`}
              alt={`Imagem do ${produto.title}`}
            />

            <div className="flex grow flex-col bg-neutral-100 overflow-hidden p-2">
              <p className="text-lg w-full font-semibold text-neutral-900 text-left truncate">
                {produto.title}
              </p>

              <p className="text-sm w-full text-neutral-600 text-left truncate">
                {produto.description_resume}
              </p>
              
              <div className="flex items-center flex-wrap justify-between mt-2">
                <div className="flex flex-col">
                  {categoria === "finalizadas" && (
                    <div className='flex items-center gap-2'>
                      <Calendario className="icon text-amber-500" />
                      <p className="text-sm font-semibold text-zinc-700">{formatarData(produto.end_rifa)}</p>
                    </div>
                  )}

                  {categoria === "futuras" && (
                    <div className='flex items-center gap-2'>
                      <Calendario className="icon text-amber-500" />
                      <p className="text-sm font-semibold text-zinc-700">{formattedDate(produto.initial_sale)}</p>
                    </div>
                  )}

                  <div className="flex items-center gap-2">
                    <Bilhete className="icon text-emerald-500 w-[18px] h-[18px]" />
                    <p className="font-bold text-lg text-neutral-600 text-left truncate">
                      R$ {Number(produto.price).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                  </div>
                </div>

                <button 
                  className="relative inline-block group bg-amber-500 text-white rounded overflow-hidden shadow-transparent shadow-md hover:shadow-black/30"
                >
                  <div className="absolute left-0 top-0 bg-amber-600 w-0 group-hover:w-full transition-all duration-300 h-1/2"></div>
                  <div className="absolute right-0 bottom-0 bg-amber-600 w-0 group-hover:w-full transition-all duration-300 h-1/2"></div>
                  <div className="relative px-4 py-1 transition-all duration-300">
                    {categoria === "ativas" ? "Comprar" : "Ver"}
                  </div>
                </button>
              </div>
            </div>
          </Link>
        ))
      ) : (
        <>
          {categoria === "ativas" ? 
            <CardAviso 
              classes="border-yellow-600 bg-yellow-100 text-yellow-700"
              subtitulo="Nada aqui... "
              mensagem="Parece que estamos sem ofertas disponíveis no momento, mas não se preocupe, em breve teremos novidades! Fique ligado!"
            />
            : categoria === "finalizadas" ?
            <CardAviso 
              classes="border-yellow-600 bg-yellow-100 text-yellow-700"
              subtitulo="Nada aqui... "
              mensagem="Parece que estamos sem ofertas finalizadas no momento, em breve teremos novidades! Fique ligado!"
            />
            : 
            <CardAviso 
              classes="border-yellow-600 bg-yellow-100 text-yellow-700"
              subtitulo="Nada aqui... "
              mensagem="Parece que estamos sem ofertas futuras no momento, em breve teremos novidades! Fique ligado!"
            />
          }
        </>
      )}
    </div>
  );
}
