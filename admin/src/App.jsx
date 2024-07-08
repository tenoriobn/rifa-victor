import { ThemeProvider } from "styled-components";
import GlobalStyles from "./common/GlobalStyles/GlobalStyles";
import { RecoilRoot } from 'recoil';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLayout from "./components/AdminLayout/AdminLayout";
import Theme from "./common/GlobalStyles/Theme/Theme";
import Vendas from "./Pages/Vendas/Vendas";
import Sorteios from "./Pages/Sorteios/Sorteios";
import Pedidos from "./Pages/Pedidos/Pedidos";
import Clientes from "./Pages/Clientes/Clientes";
import Ranking from "./Pages/Ranking/Ranking";
import Ganhadores from "./Pages/Ganhadores/Ganhadores";
import Afiliados from "./Pages/Afiliados/Afiliados";
import Configuracoes from "./Pages/Configuracoes/Configuracoes";
import Login from "./components/Autenticacao/Login/Login";
import ProtectedRoute from "./components/Autenticacao/ProtectedRoute/ProtectedRoute";
import AdicionarRifa from "./Pages/Sorteios/AdicionarRifa/CriarRifa";
import ImagensRifa from "./Pages/Sorteios/AcoesSorteioModal/ImagensRifa/ImagensRifa";
import RifasCotas from "./Pages/Sorteios/AcoesSorteioModal/Cotas/Cotas";
import Pacotes from "./Pages/Sorteios/Pacotes/Pacotes";
import ConsultaCota from "./Pages/Sorteios/ConsultaCota/ConsultaCota";
import SorteioSearch from "./Pages/Sorteios/SorteioSearch/SorteioSearch";
import Upsell from "./Pages/Sorteios/Upsell/Upsell";
import Usuarios from "./Pages/Configuracoes/Usuarios/Usuarios";
import SiteConfig from "./Pages/Configuracoes/SiteConfig/SiteConfig";
import MeusDados from "./Pages/Configuracoes/MeusDados/MeusDados";
import ConfigPagamentos from "./Pages/Configuracoes/ConfigPagamentos/ConfigPagamentos";
import SuperAdmin from "./Pages/SuperAdmin/SuperAdmin";
import EditarRifa from "./Pages/Sorteios/EditarRifa/EditarRifa";

function App() {
  return (
    <ThemeProvider theme={Theme}>
      <RecoilRoot>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard/*" element={<ProtectedRoute element={<AdminLayout />} />}>
              <Route index element={<Vendas />} />

              <Route path="rifas" element={<Sorteios />} />
              <Route path="rifas/adicionar" element={<AdicionarRifa />} />
              <Route path="rifas/editar" element={<EditarRifa />} />
              <Route path="rifas/imagens" element={<ImagensRifa />} />
              <Route path="rifas/cotas" element={<RifasCotas />} />
              <Route path="rifas/packs" element={<Pacotes />} />
              <Route path="rifas/upsell" element={<Upsell />} />
              <Route path="consultaCota" element={<ConsultaCota />} />
              <Route path="sorteio" element={<SorteioSearch />} />

              <Route path="pedidos" element={<Pedidos />} />
              <Route path="clientes" element={<Clientes />} />
              <Route path="ranqueamento" element={<Ranking />} />
              <Route path="ganhadores" element={<Ganhadores />} />
              <Route path="afiliados" element={<Afiliados />} />

              <Route path="configuracoes" element={<Configuracoes />} />
              <Route path="users" element={<Usuarios />} />
              <Route path="config/site" element={<SiteConfig />} />
              <Route path="payments" element={<ConfigPagamentos />} />
              <Route path="clients/edit" element={<MeusDados />} />
              <Route path="superadmin" element={<SuperAdmin />} />
            </Route>
          </Routes>
        </Router>
        <GlobalStyles />
      </RecoilRoot>
    </ThemeProvider>
  );
}

export default App;
