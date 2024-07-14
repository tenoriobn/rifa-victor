import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { statePacote } from '../../atom';

function useCalculateTotalValue(value_cota, qntd_cota) {
  const [pacote, setPacote] = useRecoilState(statePacote);

  useEffect(() => {
    if (value_cota && qntd_cota) {
      const total = parseFloat(value_cota) * parseInt(qntd_cota);
      setPacote((prevPacote) => ({
        ...prevPacote,
        valor_total: total.toFixed(2),
      }));
    }
  }, [value_cota, qntd_cota, setPacote]);

  return pacote.valor_total || "";
}

export default useCalculateTotalValue;
