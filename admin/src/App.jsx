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
              <Route path="pedidos" element={<Pedidos />} />
              <Route path="clientes" element={<Clientes />} />
              <Route path="ranqueamento" element={<Ranking />} />
              <Route path="ganhadores" element={<Ganhadores />} />
              <Route path="afiliados" element={<Afiliados />} />
              <Route path="configuracoes" element={<Configuracoes />} />
            </Route>
          </Routes>
        </Router>
        <GlobalStyles />
      </RecoilRoot>
    </ThemeProvider>
  );
}

export default App;
