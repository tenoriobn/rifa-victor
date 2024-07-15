import { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { estadoValorCompra, estadoValorPacotePromocional, estadoValorRange } from '../../atom';

const useValorCompra = () => {
  const valorRange = useRecoilValue(estadoValorRange);
  const setValorCompra = useSetRecoilState(estadoValorCompra);
  const valorPacotePromocional = useRecoilValue(estadoValorPacotePromocional);

  const calcularValorCompra = valorRange * valorPacotePromocional;
  const valorCompraFormatado = calcularValorCompra.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  useEffect(() => {
    setValorCompra(valorCompraFormatado);
  }, [setValorCompra, valorCompraFormatado]);

  return {
    valorCompraFormatado
  };
};

export default useValorCompra;
