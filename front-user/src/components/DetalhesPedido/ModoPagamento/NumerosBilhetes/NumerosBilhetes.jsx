import { useRecoilValue } from "recoil";
import { estadoCheckoutInfo } from "../../../../common/state/atom";

export default function NumerosBilhetes() {
  const checkoutInfo = useRecoilValue(estadoCheckoutInfo);
  
  let numeros = [];
  const numbersValue = checkoutInfo.rifa_number.numbers;

  // Verifica se os números estão em string JSON e tenta convertê-los
  if (typeof numbersValue === 'string') {
    try {
      const parsedNumbers = JSON.parse(numbersValue);
      numeros = Array.isArray(parsedNumbers) ? parsedNumbers.map(Number) : [];
    } catch (e) {
      console.error('Erro ao parsear números:', e);
    }
  } else if (Array.isArray(numbersValue)) {
    numeros = numbersValue;
  }
  
  return (
    <div className="flex flex-col gap-2 mt-4">
      <p className="font-bold whitespace-nowrap text-neutral-700">Seus números:</p>

      <div className="flex flex-wrap gap-2">
        {numeros.map((valor, index) => (
          <div 
            key={index}
            className="bg-green-100 border font-semibold border-green-400 text-green-700 px-3 py-2 rounded relative" 
            role="alert"
          >
            {valor}
          </div>
        ))}
      </div>
    </div>
  );
}
