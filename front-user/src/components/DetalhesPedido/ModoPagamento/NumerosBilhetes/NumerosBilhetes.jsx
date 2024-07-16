import { useRecoilValue } from "recoil";
import { estadoCheckoutInfo } from "../../../../common/state/atom";

export default function NumerosBilhetes() {
  const checkoutInfo = useRecoilValue(estadoCheckoutInfo);
  
  // Verifica se os números estão em string e tenta convertê-los em array
  let numeros = [];
  if (typeof checkoutInfo.rifa_number.numbers === 'string') {
    numeros = checkoutInfo.rifa_number.numbers.slice(1, -1).split(',').map(Number);
  } else if (Array.isArray(checkoutInfo.rifa_number.numbers)) {
    numeros = checkoutInfo.rifa_number.numbers;
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
