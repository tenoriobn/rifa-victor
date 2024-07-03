import { useRecoilValue } from "recoil";
import Estrela from "../../../assets/Icons/estrela.svg?react";
import { estadoRifa } from "../../../common/state/atom";

export default function CardCotasAtivas() {
  const rifa = useRecoilValue(estadoRifa);
  const dados = rifa?.awarded_quota?.package_awarded_number || '{"numbers": [], "price": [], "status": []}';
  
  const { numbers, price, status } = JSON.parse(dados);

  const cotasAtivas = numbers.map((number, index) => ({
    number,
    price: price[index],
    status: status[index]
  })).filter(cota => cota.status === "ativo");

  return (
    <div className='grid grid-cols-2 md:grid-cols-3 gap-4 mt-4'>
      {cotasAtivas.map((cotaAtiva, index) => (
        <article 
          key={index} 
          className='bg-sky-200 border border-solid border-sky-400 p-1 rounded-lg text-center'
        >
          <div className='flex items-center justify-center gap-1 text-lg font-bold'>
            <Estrela className="icon stroke-amber-500" />
            <p className='text-neutral-700'>{cotaAtiva.number}</p>
          </div>
          <p className="text-neutral-700 mt-1">{cotaAtiva.price}</p>
        </article>
      ))}
    </div>
  );
}
