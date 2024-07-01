import Medidor from "../../assets/Icons/medidor.svg?react";
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { estadoPacoteSelecionado, estadoRenderizaComponenteCadastro, estadoRenderizaInfoUsuario, estadoRifa, estadoUsuario, estadoValorCompra, estadoValorRange } from "../../common/state/atom";
import useOperacoesInputRange from "../../common/state/hooks/inputRange/useOperacoesInputRange";

export default function PacotesPromocionais() {
  const valorRange = useRecoilValue(estadoValorRange);
  const pacoteSelecionado = useRecoilValue(estadoPacoteSelecionado);
  const valorCompra = useRecoilValue(estadoValorCompra);
  const setRenderizaComponenteCadastro = useSetRecoilState(estadoRenderizaComponenteCadastro);
  const setRenderizaInfoUsuario = useSetRecoilState(estadoRenderizaInfoUsuario);
  const { adicionarValorPromocional } = useOperacoesInputRange();
  const rifa = useRecoilValue(estadoRifa)
  const precoUnidade = valorRange >= 1000 ? '0,15' : valorRange >= 500 ? '0,19' : '0,20';
  const usuario = useRecoilValue(estadoUsuario)


  const pacotes = [
    { id: 1, valor: 250, precoNovo: 50.00, maisPopular: true },
    { id: 2, valor: 500, precoAntigo: 100.00, precoNovo: 95.00, maisPopular: false },
    { id: 3, valor: 1000, precoAntigo: 200.00, precoNovo: 150.00, maisPopular: false },
    { id: 4, valor: 2000, precoAntigo: 400.00, precoNovo: 300.00, maisPopular: false }
  ];

  const handleClick = () => {
    if (usuario) {
      setRenderizaInfoUsuario(true)
    } else {
      setRenderizaComponenteCadastro(true)
    }
  }

  return (
    <>    
      <h3 className="flex items-center gap-2 font-semibold mb-5 text-lg">
        <Medidor />
        <span className="text-neutral-700">Pacotes Promocionais </span>
      </h3>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 my-2">
        {pacotes.map((pacote) => (
          <button
            key={pacote.id}
            className={`relative rounded px-2 py-1 transition-all duration-300 cursor-pointer text-center border-2 border-solid ${
              pacote.id === 1 ? 'border-emerald-700' : 'border-transparent'} 
              ${pacoteSelecionado.id === pacote.id ? 'bg-green-200 text-neutral-700' : 'bg-slate-300 text-black'}
              ${pacoteSelecionado.id === pacote.id ? '' : 'hover:bg-slate-400'}`
            }
            onClick={() => adicionarValorPromocional(pacote)}
          >
            {pacote.maisPopular && (
              <div className="flex gap-2 absolute -top-5 left-1/2 -translate-x-1/2 z-[999]">
                <p className="px-4 py-0.5 rounded-t-2xl text-[10px] text-emerald-50 whitespace-nowrap bg-emerald-700">
                  Mais popular
                </p>
              </div>
            )}
            <p className="font-bold">{pacote.valor}</p>
            {pacote.precoAntigo && (
              <p className="text-xs text-red-600 line-through">
                R$&nbsp;{Number(pacote.precoAntigo.toFixed(2)).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            )}
            <p className={`text-sm ${pacote.maisPopular ? 'text-neutral-700' : 'text-green-700'}`}>
              R$ {Number(pacote.precoNovo.toFixed(2)).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </button>
        ))}
      </div>

      <div className='flex flex-col md:flex-row gap-4 items-center justify-between mt-6'>
        <div>
          <p 
            className={`font-bold transition-all duration-300 ${valorRange >= 500 ? 'text-sm line-through text-neutral-400' : 'text-xl'}`}>
            Preço Unit:
            
            <span className="font-normal">
              &nbsp;R$ {Number(rifa.price).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </p>

          {
            valorRange >= 500 && (
              <p className='text-xl text-emerald-600 transition-all duration-300 font-bold'>
                Preço Promocional:
    
                <span className="font-normal"> R$&nbsp;{precoUnidade}</span>
              </p>
            )
          }
        </div>

        <button 
          className="rounded-full px-8 py-4 bg-amber-500 ring-1 ring-amber-800 ring-offset-4 hover:bg-amber-600 transition-all duration-300 disabled:bg-neutral-400 text-white"
          onClick={handleClick}
        >
          Comprar por <span className="font-bold">R$&nbsp;{valorCompra}</span>
        </button>
      </div>
    </>
  )
}
