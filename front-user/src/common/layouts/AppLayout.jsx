import Footer from "../../components/Footer/Footer";
// import Header from "../../components/Header/Header";
import { Outlet } from "react-router-dom";
import Cabecalho from "../../components/Cabecalho/Cabecalho";

export default function AppLayout() {
  return (
    <>
      <Cabecalho />

      <main>
        <Outlet />
      </main>

      <Footer />
    </>
  );
}
