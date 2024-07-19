import { Link } from 'react-router-dom';
import Bilhete from "../../assets/Icons/bilhete.svg?react";
import Calendario from "../../assets/Icons/calendario.svg?react";
import { useRecoilState,  useSetRecoilState } from 'recoil';
import { estadoGanhadores, estadoProdutoSelecionado } from '../../common/state/atom';
import { useEffect, useState } from 'react';
import { fetchDados } from '../../common/http/http';
import CardAviso from '../CardAviso/CardAviso';
import AvisoCarregando from '../AvisoCarregando/AvisoCarregando';

export default function CardGanhadores() {
  const [ganhadores, setGanhadores] = useRecoilState(estadoGanhadores);
  const [loading, setLoading] = useState(true);
  const [erroConexao, setErroConexao] = useState(false);

  const setProdutoSelecionado = useSetRecoilState(estadoProdutoSelecionado);

  useEffect(() => {
    const obterDados = async () => {
      try {
        const dados = await fetchDados('/produtos/todos/ganhadores');
        setGanhadores(dados.data);
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
        subtitulo="Ixe!!"
        mensagem="Parece que não conseguimos processar os vencedores. Tente de novo em alguns instantes."
      />
    );
  }

  if (loading) {
    return <AvisoCarregando /> 
  }
  
  const ganhadoresFiltrados = ganhadores.filter(produto => produto.winner_id !== 0);

  return (
    <>
      {ganhadoresFiltrados.map(ganhadores => (
        <div key={ganhadores.id} className="flex flex-col gap-4">
          <Link 
            className="flex w-auto overflow-hidden rounded-lg bg-neutral-200 hover:shadow-[4px_4px_4px_#0002] border border-solid border-neutral-400 ring-0 ring-amber-500/60 hover:ring-offset-4 hover:ring-2 transition-all duration-300"
            to={`/${ganhadores.rifa.slug}/${ganhadores.rifa.id}`}
            onClick={() => setProdutoSelecionado(ganhadores)}
          >
            <img 
              className="w-[80px] m-2 rounded-lg object-cover transition-all" 
              src={ganhadores.img}  
              alt="Foto do ganhador"
            />

            <div className="flex grow flex-col bg-neutral-100 overflow-hidden p-2">
              <p className="text-lg w-full font-semibold text-neutral-900 text-left truncate">
              {ganhadores.client.name}
              </p>

              <p className="text-sm w-full text-neutral-600 text-left truncate"> {ganhadores.rifa.description_resume}</p>

              <div className='flex items-center gap-2'>
                <Bilhete className="icon text-emerald-500" />
                <p className="text-sm text-neutral-600 text-left truncate">Bilhete da Sorte: </p>
                <p className="text-sm font-semibold text-zinc-700">{ganhadores.ticket}</p>
              </div>

              <div className='flex items-center gap-2'>
                <Calendario className="icon text-amber-500" />
                <p className="text-sm text-neutral-600 text-left truncate">Data do Sorteio: </p>
                <p className="text-sm font-semibold text-zinc-700">{ganhadores.draw_day}</p>
              </div>
            </div>
          </Link>
        </div>
      ))}

      <CardAviso
        classes="border-sky-400 bg-sky-100 text-sky-400"
        subtitulo="Nenhum ainda!"
        mensagem=" Significa que você pode ser o primeiro!"
      />
    </>
  );
}
