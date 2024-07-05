import Titulo from "../../components/Titulo/Titulo";
import FormularioSorteio from "./FormularioSorteio/FormularioSorteio";
import TabelaSorteio from "./TabelaSorteio/TabelaSorteio";

export default function Sorteios() {
  return (
    <div>
      <Titulo titulo={"Filtros de Busca"} />
      <FormularioSorteio />
      <TabelaSorteio />
    </div>
  )
}
