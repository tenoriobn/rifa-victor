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

export default function App() {
  return (
    <ConfigProvider>
      <PayProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AppLayout />}>
              <Route path="/" element={<ContentLayout />}>
                <Route index element={<Home />} />
                <Route path="meus-numeros" element={<MeusNumeros />} />
                <Route path="ganhadores" element={<Ganhadores />} />
                <Route path="termos-de-uso" element={<Termos />} />
              </Route>

              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </PayProvider>
    </ConfigProvider>
  );
}
