import CabecalhoSecao from '../../components/CabecalhoSecao/CabecalhoSecao';
import CardGanhadores from './CardGanhadores/CardGanhadores';
import EmojiFeliz from "../../assets/Icons/emoji-feliz.svg?react";

export default function Ganhadores() {
  return (
    <article className="flex justify-center flex-col">
      <CabecalhoSecao 
        subtitulo="Ganhadores" 
        paragrafo="Os sortudos!"
        Icone={EmojiFeliz}
      />

      <CardGanhadores />
    </article>
  )
}
