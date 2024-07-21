import { Main } from "../../components/AdminLayout/AdminLayout";
import Header from "../../components/Header/Header";
import Titulo from "../../components/Titulo/Titulo";
import VendasCardInfo from "../Vendas/VendasCardInfo/VendasCardInfo";
import VendasForm from "../Vendas/VendasForm/VendasForm";
import VendasGraficos from "../Vendas/VendasGraficos/VendasGraficos";

export default function DashboardRifa() {
  return (
    <div>
      <Header>
        <h2><i className="fa-solid fa-gauge"></i> Nome da Rifa</h2>
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
