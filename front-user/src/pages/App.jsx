import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import AppLayout from "../common/layouts/AppLayout";
import ContentLayout from "../common/layouts/ContentLayout";
import NotFound from "./NotFound/NotFound";
import Ganhadores from "./Ganhadores/Ganhadores";
import Produtos from "./Produtos/Produtos";
import PaginaInicial from "./PaginaInicial/PaginaInicial";
import Rifa from "./Rifa/Rifa";
import Cadastro from "../components/AcessoUsuario/AcessoUsuario";
import Usuario from "./Usuario/Usuario";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";
import MeusPedidos from "../components/MeusPedidos/MeusPedidos";
import MeusDados from "../components/MeusDados/MeusDados";
import DetalhesPedido from "../components/DetalhesPedido/DetalhesPedido";

export default function App() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
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
          </Route>

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}
