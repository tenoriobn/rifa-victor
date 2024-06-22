import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";
import ContentLayout from "../layouts/ContentLayout";
import Home from "./home/Home";
import NotFound from "./notFound/NotFound";
import Termos from "./termos/Termos";
import { ConfigProvider } from "../context/ConfigContext";
import MeusNumeros from "./meusNumeros/MeusNumeros";
import Ganhadores from "./ganhadores/Ganhadores";
import { PayProvider } from "../context/PayContext";
import MeuPerfil from "./MeuPerfil/MeuPerfil";
import Produtos from "./Produtos/Produtos";
import HomePage from "./HomePage/HomePage";

export default function App() {
  return (
    <ConfigProvider>
      <PayProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AppLayout />}>
              <Route path="/" element={<ContentLayout />}>
                <Route index element={<HomePage />} />
                <Route path="meus-numeros" element={<MeusNumeros />} />
                <Route path="produtos" element={<Produtos />} />
                <Route path="ganhadores" element={<Ganhadores />} />
                <Route path="meu-perfil" element={<MeuPerfil />} />
                <Route path="meus-pedidos" element={<MeuPerfil />} />
                <Route path="termos-de-uso" element={<Termos />} />
                <Route path="produto/:slug" element={<Home />} />
              </Route>

              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </PayProvider>
    </ConfigProvider>
  );
}
