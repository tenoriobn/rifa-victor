import { Main } from "../../components/AdminLayout/AdminLayout";
import Header from "../../components/Header/Header";
import Titulo from "../../components/Titulo/Titulo";
import VendasCardInfo from "./VendasCardInfo/VendasCardInfo";
import VendasForm from "./VendasForm/VendasForm";
import VendasGraficos from "./VendasGraficos/VendasGraficos";

export default function Vendas() {
  return (
    <div>
      <Header>
        <h2><i className="fa-solid fa-gauge"></i> VENDAS</h2>
      </Header>

      <Main>
        <Titulo titulo="Filtros" />
        <VendasForm />
        <VendasCardInfo />
        <VendasGraficos />
      </Main>
    </div>
  )
}
