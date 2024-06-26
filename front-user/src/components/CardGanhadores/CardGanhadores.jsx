import { Link } from 'react-router-dom';
import Bilhete from "../../assets/Icons/bilhete.svg?react";
import Calendario from "../../assets/Icons/calendario.svg?react";
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { estadoProdutoSelecionado, estadoProdutos } from '../../common/state/atom';

export default function CardGanhadores() {
  const produtos = useRecoilValue(estadoProdutos);
  const ganhadoresFiltrados = produtos.filter(produto => produto.categoria === "ganhadores");
  const setProdutoSelecionado = useSetRecoilState(estadoProdutoSelecionado);

  return (
    <>
      {ganhadoresFiltrados.map(ganhadores => (
        <div key={ganhadores.id} className="flex flex-col gap-4">
          <Link 
            className="flex w-auto overflow-hidden rounded-lg bg-neutral-200 hover:shadow-[4px_4px_4px_#0002] border border-solid border-neutral-400 ring-0 ring-amber-500/60 hover:ring-offset-4 hover:ring-2 transition-all"
            to={`/${ganhadores.slug}`}
            onClick={() => setProdutoSelecionado(ganhadores)}
          >
            <img 
              className="w-[80px] m-2 rounded-lg object-cover transition-all" 
              src="https://imagedelivery.net/TuyDlh37fwpu3jSKwZ3-9g/06f43084-aa29-480e-c4d9-36dfaaab8f00/winnerThumb" 
              alt="Foto do ganhador"
            />

            <div className="flex grow flex-col bg-neutral-100 overflow-hidden p-2">
              <p className="text-lg w-full font-semibold text-neutral-900 text-left truncate">
                Juliano Oliveira Amaral
              </p>

              <p className="text-sm w-full text-neutral-600 text-left truncate">F250 OU 50K NO PIX</p>

              <div className='flex items-center gap-2'>
                <Bilhete className="icon text-emerald-500" />
                <p className="text-sm text-neutral-600 text-left truncate">Bilhete da Sorte: </p>
                <p className="text-sm font-semibold text-zinc-700">123456</p>
              </div>

              <div className='flex items-center gap-2'>
                <Calendario className="icon text-amber-500" />
                <p className="text-sm text-neutral-600 text-left truncate">Data do Sorteio: </p>
                <p className="text-sm font-semibold text-zinc-700">13/04/2024</p>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </>
  );
}
