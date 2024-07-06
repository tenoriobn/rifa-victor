import { Main } from "../../../components/AdminLayout/AdminLayout";
import Header from "../../../components/Header/Header";
import MeusDadosForm from "./MeusDadosForm/MeusDadosForm";

export default function MeusDados() {
  return (
    <div>
      <Header>
        <h2><i className="fas fa-desktop"></i> Meus Dados</h2>
      </Header>

      <Main>
        <MeusDadosForm />
      </Main>
    </div>
  )
}
