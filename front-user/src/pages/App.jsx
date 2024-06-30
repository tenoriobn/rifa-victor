import { RecoilRoot } from "recoil";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "../common/layouts/AppLayout";
import ContentLayout from "../common/layouts/ContentLayout";
import NotFound from "./NotFound/NotFound";
import Termos from "../../public/componentesAnteriores/Termos/Termos";
import { ConfigProvider } from "../context/ConfigContext";
import Ganhadores from "./Ganhadores/Ganhadores";
import { PayProvider } from "../context/PayContext";
import Produtos from "./Produtos/Produtos";
import PaginaInicial from "./PaginaInicial/PaginaInicial";
import MeusNumeros from "../../public/componentesAnteriores/meusNumeros/MeusNumeros";
import Rifa from "./Rifa/Rifa";
import Cadastro from "../components/AcessoUsuario/AcessoUsuario";
import Usuario from "./Usuario/Usuario";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";
import MeusPedidos from "../components/MeusPedidos/MeusPedidos";
import MeusDados from "../components/MeusDados/MeusDados";
import DetalhesPedido from "../components/DetalhesPedido/DetalhesPedido";
// import Home from "./home/Home";

export default function App() {
  return (
    <RecoilRoot>
      <ConfigProvider>
        <PayProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<AppLayout />}>
                <Route path="/" element={<ContentLayout />}>
                  <Route index element={<PaginaInicial />} />
                  <Route path="produtos" element={<Produtos />} />
                  <Route path="ganhadores" element={<Ganhadores />} />
                  <Route path=":slug/:id" element={<Rifa />} />
                  <Route path="cadastro" element={<Cadastro />} />

                  <Route path="usuario" element={<ProtectedRoute element={<Usuario />} />}>
                    <Route index element={<MeusDados />} />
                    <Route path="meu-perfil" element={<MeusDados />} />
                    <Route path="meus-pedidos" element={<MeusPedidos />} />
                  </Route>

                  <Route path="checkout" element={<ProtectedRoute element={<DetalhesPedido />} />} />
                  
                  {/* Em Desuso */}
                  <Route path="termos-de-uso" element={<Termos />} />
                  <Route path="meus-numeros" element={<MeusNumeros />} />
                  {/* Em Desuso */}
                </Route>

                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </PayProvider>
      </ConfigProvider>
    </RecoilRoot>
  );
}
