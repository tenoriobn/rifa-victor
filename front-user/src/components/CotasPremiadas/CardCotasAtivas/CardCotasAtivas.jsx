import { useRecoilValue } from "recoil";
import Estrela from "../../../assets/Icons/estrela.svg?react";
import { estadoRifa } from "../../../common/state/atom";
import CardAviso from "../../CardAviso/CardAviso";

export default function CardCotasAtivas() {
  const rifa = useRecoilValue(estadoRifa);
  const cotasAtivas = rifa?.awarded_quota?.filter(cota => cota.status !== 'resgatada' && cota.show_site === 'sim');

  return (
    <div className={`${cotasAtivas.length > 0 ? 'grid grid-cols-2 md:grid-cols-3' : ''} gap-4 mt-4`}>
      {
        cotasAtivas.length > 0 ? (
          cotasAtivas.map((cotaAtiva, index) => (
            <article
              key={index}
              className='bg-sky-200 border border-solid border-sky-400 p-1 rounded-lg text-center'
            >
              <div className='flex items-center justify-center gap-1 text-lg font-bold'>
                <Estrela className="icon stroke-amber-500" />
                <p className='text-neutral-700'>{cotaAtiva.number_cota}</p>
              </div>
              <p className="text-neutral-700 mt-1">{cotaAtiva.award}</p>
            </article>
          ))
        ) :
        (
          <CardAviso
            classes="border-yellow-600 bg-yellow-100 text-yellow-700"
            subtitulo="Nada aqui..."
            mensagem="Parece que estamos sem ofertas disponíveis no momento, mas não se preocupe, em breve teremos novidades! Fique ligado!"
          />
        )
      }
    </div>
  );
}
