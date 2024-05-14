import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";
import ContentLayout from "../layouts/ContentLayout";
import Home from "./home/Home";
import NotFound from "./notFound/NotFound";
import Termos from "./termos/Termos";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route path="/" element={<ContentLayout />}>
            <Route index element={<Home />} />
            <Route path="termos-de-uso" element={<Termos />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
