import EmojiFeliz from "../../../assets/Icons/emoji-feliz.svg?react";
import { useRecoilValue } from "recoil";
import { estadoRifa } from "../../../common/state/atom";

export default function CardCotasResgatadas() {
  const rifa = useRecoilValue(estadoRifa);
  const cotasResgatadas = rifa.awarded_quota_client;


  // const cotasResgatadas = [
  //   { id: '1', nome: 'Maria Romanisio', valor: '500,00', numeroPremiado: '054524' },
  //   { id: '2', nome: 'Yohrana Adam', valor: '500,00', numeroPremiado: '054524' },
  //   { id: '3', nome: 'João Pereira', valor: '100,00', numeroPremiado: '054524' },
  //   { id: '4', nome: 'Elielsio medeiros', valor: '100,00', numeroPremiado: '054524' },
  //   { id: '5', nome: 'Alessandra Assis', valor: '100,00', numeroPremiado: '054524' },
  //   { id: '6', nome: 'Pamela Melo', valor: '1.000,00', numeroPremiado: '054524' },
  //   { id: '7', nome: 'Abner mello', valor: '100,00', numeroPremiado: '054524' },
  //   { id: '8', nome: 'Helvécio Benevuto', valor: '1.000,00', numeroPremiado: '054524' },
  //   { id: '9', nome: 'Rodrigo Moraes', valor: '100,00', numeroPremiado: '054524' },
  //   { id: '10', nome: 'Cleder boff', valor: '100,00', numeroPremiado: '054524' },
  //   { id: '11', nome: 'Lucas Moreira', valor: '100,00', numeroPremiado: '054524' },
  //   { id: '12', nome: 'Áquila Sutil', valor: '100,00', numeroPremiado: '054524' },
  //   { id: '13', nome: 'Izaquel Ito', valor: '300,00', numeroPremiado: '054524' },
  // ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
      {cotasResgatadas.map((cotaResgatada) => (
        <article 
          key={cotaResgatada.id} 
          className="bg-green-200 border border-solid border-green-400 p-1 rounded-lg text-center"
        >
          <div className="flex items-center justify-center gap-1 text-lg font-bold">
            <EmojiFeliz className="icon stroke-amber-500" />
            <p className='text-neutral-700'>{cotaResgatada.client.name}</p>
          </div>

          <p className="text-neutral-700 mt-1">{cotaResgatada.price_awarded_quota}</p>

          <p className="text-sm text-neutral-700 mt-1">
            Nº Premiado: 
            <span className="font-bold">{cotaResgatada.awarded_number}</span>
          </p>
        </article>
      ))}
    </div>
  )
}
