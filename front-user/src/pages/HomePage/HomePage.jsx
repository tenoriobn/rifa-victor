import CabecalhoSecao from "../../components/CabecalhoSecao/CabecalhoSecao"
import CardGanhadores from "../ganhadores/CardGanhadores/CardGanhadores"
import CardDestaques from "./CardDestaques/CardDestaques"
import CardDuvidas from "./CardDuvidas/CardDuvidas"
import Estrela from "../../assets/Icons/estrela.svg?react";
import EmojiFeliz from "../../assets/Icons/emoji-feliz.svg?react";

export default function HomePage() {
  return (
    <div>
      <CabecalhoSecao 
        subtitulo="Produtos" 
        paragrafo=" Escolha sua sorte!"
        Icone={Estrela}
      />

      <h2 className="text-lg text-neutral-600 mb-2">Destaques</h2>

      <CardDestaques />

      <CardDuvidas />

      <CabecalhoSecao 
        subtitulo="Ganhadores" 
        paragrafo="Os sortudos!"
        Icone={EmojiFeliz}
      />

      <CardGanhadores />
    </div>
  )
}
