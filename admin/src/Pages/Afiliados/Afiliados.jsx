import { Main } from "../../components/AdminLayout/AdminLayout";
import Header from "../../components/Header/Header";
import Titulo from "../../components/Titulo/Titulo";
import AfiliadosForm from "./AfiliadosForm/AfiliadosForm";
import AfiliadosTable from "./AfiliadosTable/AfiliadosTable";

export default function Afiliados() {
  return (
    <section>
      <Header>
        <h2>
          <ion-icon name="accessibility-sharp" role="img" class="md hydrated"></ion-icon> AFILIADOS - SAVEIRO CROSS DOS SONHOS 
        </h2>
      </Header>

      <Main>
        <Titulo titulo="Filtros de Busca" />
        <AfiliadosForm />
        <AfiliadosTable />
      </Main>
    </section>
  )
}
