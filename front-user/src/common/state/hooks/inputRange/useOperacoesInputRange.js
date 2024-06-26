import { useRecoilState, useSetRecoilState } from "recoil";
import { estadoPacoteSelecionado, estadoValorRange } from "../../atom";
import useValorCompra from "../pacotesPromocionais/useValorCompra";

const useOperacoesInputRange = () => {
  const [valorRange, setValorRange] = useRecoilState(estadoValorRange);
  const setPacoteSelecionado = useSetRecoilState(estadoPacoteSelecionado);

  const calcularPorcentagem = (valor) => {
    const valorMaximo = 10000;
    return (valor / valorMaximo) * 100;
  };

  const decrementarValor = (quantidade) => {
    setValorRange((valorAnterior) => {
      const novoValor = Number(valorAnterior) - quantidade;
      return novoValor >= 35 ? novoValor : 35;
    });
  };

  const incrementarValor = (quantidade) => {
    setValorRange((valorAnterior) => {
      const novoValor = Number(valorAnterior) + quantidade;
      return novoValor <= 10000 ? novoValor : 10000;
    });
  };

  const adicionarValorPromocional = (pacote) => {
    setPacoteSelecionado(pacote);
    setValorRange(pacote.valor);
  }

  useValorCompra();

  return {
    valorRange,
    calcularPorcentagem,
    decrementarValor,
    incrementarValor,
    adicionarValorPromocional
  };
};

export default useOperacoesInputRange;
