import { Main } from "../../../components/AdminLayout/AdminLayout";
import Header from "../../../components/Header/Header";
import SiteConfigForm from "./SiteConfigForm/SiteConfigForm";

export default function SiteConfig() {
  return (
    <div>
      <Header>
        <h2><i className="fas fa-desktop"></i> Configurações do Site</h2>
      </Header>

      <Main>
        <SiteConfigForm />
      </Main>
    </div>
  )
}
