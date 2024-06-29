import Footer from "../../components/Footer/Footer";
// import Header from "../../components/Header/Header";
import { Outlet } from "react-router-dom";
import Cabecalho from "../../components/Cabecalho/Cabecalho";
import { useSetRecoilState } from "recoil";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { estadoUsuario } from "../state/atom";

export default function AppLayout() {
  const setUsuario = useSetRecoilState(estadoUsuario);

  useEffect(() => {
    const verificarTokenJWT = async () => {
      const token = localStorage.getItem('access_token');
      if (token) {
        try {
          const decoded = jwtDecode(token);
          setUsuario(decoded);
        } catch (error) {
          console.error('Erro ao decodificar token:', error);
          setUsuario(null);
        }
      }
    };

    verificarTokenJWT();
  }, [setUsuario]);

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
