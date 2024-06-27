import { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { estadoRifa, estadoValorCompra, estadoValorRange } from '../../atom';

const useValorCompra = () => {
  const valorRange = useRecoilValue(estadoValorRange);
  const setValorCompra = useSetRecoilState(estadoValorCompra);
  const rifa = useRecoilValue(estadoRifa)

  const precoUnidade = valorRange >= 1000 ? '0,15' : valorRange >= 500 ? '0,19' : `${rifa.price}`;
  const precoUnidadeNumero = parseFloat(precoUnidade.replace(',', '.'));
  const calcularValorCompra = valorRange * precoUnidadeNumero;
  const valorCompraFormatado = calcularValorCompra.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  useEffect(() => {
    setValorCompra(valorCompraFormatado);
  }, [setValorCompra, valorCompraFormatado]);

  return {
    valorCompraFormatado
  };
};

export default useValorCompra;
