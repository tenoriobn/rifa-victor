import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { estadoPacoteSelecionado, estadoRifa, estadoValorRange } from "../../atom";
import useValorCompra from "../pacotesPromocionais/useValorCompra";

const useOperacoesInputRange = () => {
  const [valorRange, setValorRange] = useRecoilState(estadoValorRange);
  const setPacoteSelecionado = useSetRecoilState(estadoPacoteSelecionado);
  const rifa = useRecoilValue(estadoRifa)

  const calcularPorcentagem = (valor, min, max) => {
    return ((valor - min) / (max - min)) * 100;
  };

  const decrementarValor = (quantidade) => {
    setValorRange((valorAnterior) => {
      const novoValor = Number(valorAnterior) - quantidade;
      return novoValor >= `${rifa.cota.qntd_cota_min_order}` ? novoValor : `${rifa.cota.qntd_cota_min_order}`;
    });
  };

  const incrementarValor = (quantidade) => {
    setValorRange((valorAnterior) => {
      const novoValor = Number(valorAnterior) + quantidade;
      return novoValor <= `${rifa.cota.qntd_cota_max_order}` ? novoValor : `${rifa.cota.qntd_cota_max_order}`;
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
