import EmojiFeliz from "../../../assets/Icons/emoji-feliz.svg?react";
import { useRecoilValue } from "recoil";
import { estadoRifa } from "../../../common/state/atom";
import CardAviso from "../../CardAviso/CardAviso";

export default function CardCotasResgatadas() {
  const rifa = useRecoilValue(estadoRifa);
  const cotasResgatadas = rifa?.awarded_quota?.filter(cota => cota.status === 'resgatada' && cota.show_site === 'sim');

  return (
    // <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
    <div className={`${cotasResgatadas.length > 0 ? 'grid grid-cols-2 md:grid-cols-3' : ''} gap-4 mt-4`}>
      {cotasResgatadas.length > 0 ? (
        cotasResgatadas.map((cotaResgatada) => (
          <article 
            key={cotaResgatada.id} 
            className="bg-green-200 border border-solid border-green-400 p-1 rounded-lg text-center"
          >
            <div className="flex items-center justify-center gap-1 text-lg font-bold">
              <EmojiFeliz className="icon stroke-amber-500" />
              <p className='text-neutral-700'> {cotaResgatada.client.name}</p>
            </div>
  
            <p className="text-neutral-700 mt-1">{cotaResgatada.award}</p>
  
            <p className="text-sm text-neutral-700 mt-1">
              Nº Premiado: 
              <span className="font-bold"> {cotaResgatada.number_cota}</span>
            </p>
          </article>
        ))) :
        (
          <CardAviso
            classes="border-sky-400 bg-sky-100 text-sky-400"
            subtitulo="Nenhum ainda!"
            mensagem=" Significa que você pode ser o primeiro!"
          />
        )
      }
    </div>
  )
}
