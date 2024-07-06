import { Main } from "../../components/AdminLayout/AdminLayout";
import Header from "../../components/Header/Header";
import Titulo from "../../components/Titulo/Titulo";
import ClientesForm from "./ClientesForm/ClientesForm";
import ClientesTable from "./ClientesTable/ClientesTable";

export default function Clientes() {
  return (
    <section>
      <Header>
        <h2><i className="fa-solid fa-users"></i> CLIENTES</h2>
      </Header>

      <Main>
        <Titulo titulo="Filtros de Busca" />
        <ClientesForm />
        <ClientesTable />
      </Main>
    </section>
  )
}
