import { useParams } from "react-router-dom";
import { Main } from "../../components/AdminLayout/AdminLayout";
import Header from "../../components/Header/Header";
import Titulo from "../../components/Titulo/Titulo";
import VendasCardInfo from "../Vendas/VendasCardInfo/VendasCardInfo";
import VendasForm from "../Vendas/VendasForm/VendasForm";
import VendasGraficos from "../Vendas/VendasGraficos/VendasGraficos";
import VendasTabelas from "../Vendas/VendasTabelas/VendasTabelas";

export default function DashboardRifa() {
  const { id } = useParams();

  return (
    <div>
      <Header>
        <h2><i className="fa-solid fa-gauge"></i> Nome da Rifa</h2>
      </Header>

      <Main>
        <Titulo titulo="Filtros" />
        <VendasForm rotaObterDados={`admin/dashboard/one/venda/filtro/${id}`} />
        <VendasCardInfo rotaObterDados={`admin/dashboard/one/venda/${id}`} />
        <VendasGraficos />
        <VendasTabelas />
      </Main>
    </div>
  )
}
