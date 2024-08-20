/* eslint-disable react-hooks/exhaustive-deps */
import Medidor from "../../assets/Icons/medidor.svg?react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { estadoPacoteSelecionado, estadoRenderizaComponenteCadastro, estadoRenderizaInfoUsuario, estadoRifa, estadoUsuario, estadoValorCompra, estadoValorRange, estadoProdutos, estadoValorPacotePromocional } from "../../common/state/atom";
import useOperacoesInputRange from "../../common/state/hooks/inputRange/useOperacoesInputRange";
import useCurrencyFormat from "../../common/state/hooks/useCurrencyFormat/useCurrencyFormat";
import { useEffect } from "react";

export default function PacotesPromocionais() {
  const produto = useRecoilValue(estadoProdutos);
  const precoAntigo =  produto.price;
  const { formatCurrency } = useCurrencyFormat();
  const { adicionarValorPromocional } = useOperacoesInputRange();
  const valorRange = useRecoilValue(estadoValorRange);
  const pacoteSelecionado = useRecoilValue(estadoPacoteSelecionado);
  const [valorPacotePromocional, setValorPacotePromocional] = useRecoilState(estadoValorPacotePromocional);
  const valorCompra = useRecoilValue(estadoValorCompra);
  const setRenderizaComponenteCadastro = useSetRecoilState(estadoRenderizaComponenteCadastro);
  const setRenderizaInfoUsuario = useSetRecoilState(estadoRenderizaInfoUsuario);
  const rifa = useRecoilValue(estadoRifa);
  const usuario = useRecoilValue(estadoUsuario);
  
  let pacotes = produto.discount_package.slice();
  pacotes.sort((a, b) => a.qntd_cota - b.qntd_cota);

  useEffect(() => {
    const pacoteEncontrado = pacotes
      .filter(pacote => pacote.qntd_cota <= valorRange)
      .reduce((prev, current) => (prev.qntd_cota > current.qntd_cota ? prev : current), {});

    setValorPacotePromocional(pacoteEncontrado.value_cota ? pacoteEncontrado.value_cota : precoAntigo);
  }, [valorRange, pacotes]);

  const handlePacoteSelecionado = (pacote) => {
    adicionarValorPromocional(pacote);
    setValorPacotePromocional(pacote.value)
  }
  
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
              pacote.popular === "sim" ? 'border-green-400' : 'border-transparent'} 
              ${pacoteSelecionado.id === pacote.id ? 'bg-green-200 text-neutral-700' : 'bg-gray-100 text-black'}
              ${pacoteSelecionado.id === pacote.id ? '' : 'hover:bg-gray-200'}`
            }
            onClick={() => handlePacoteSelecionado(pacote)}
          >
            {pacote.popular === "sim"  && (
              <div className="flex gap-2 absolute -top-5 left-1/2 -translate-x-1/2 z-[998]">
                <p className="px-4 py-0.5 rounded-t-2xl text-[10px] text-emerald-50 whitespace-nowrap bg-green-400">
                  Mais popular
                </p>
              </div>
            )}
            <p className="font-bold">{pacote.qntd_cota}</p>
            {precoAntigo !== pacote.value_cota && (
              <p className="text-xs text-red-600 line-through">
                {formatCurrency(precoAntigo * pacote.qntd_cota)}
              </p>
            )}
            <p className={`text-base ${pacote.popular === "sim" ? 'text-neutral-700' : 'text-green-700'}`}>
              {formatCurrency(pacote.valor_total)}
            </p>

            {/* Number(pacote.value_cota.toFixed(2)).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) */}
          </button>
        ))}
      </div>

      <div className='flex flex-col md:flex-row gap-4 items-center justify-between mt-6'>
        <div>
          <p 
            className={`font-bold transition-all duration-300 ${valorPacotePromocional < precoAntigo ? 'text-sm line-through text-neutral-400' : 'text-xl'}`}>
            Preço Unit:
            
            <span className="font-normal">
              &nbsp;R$ {Number(rifa.price).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </p>

          {
            valorPacotePromocional < precoAntigo && (
              <p className='text-xl text-emerald-600 transition-all duration-300 font-bold'>
                Preço Promocional:
    
                <span className="font-normal"> {formatCurrency(valorPacotePromocional)}</span>
              </p>
            )
          }
        </div>

        <button 
          className="rounded-full px-8 py-4 bg-green-500 ring-1 ring-green-700 ring-offset-4 hover:bg-green-600 transition-all duration-300 disabled:bg-neutral-400 text-white"
          onClick={handleClick}
        >
          Comprar por <span className="font-bold">R$&nbsp;{valorCompra}</span>
        </button>
      </div>
    </>
  )
}
