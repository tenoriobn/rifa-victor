/* eslint-disable react-hooks/exhaustive-deps */
import Footer from "../../components/Footer/Footer";
// import Header from "../../components/Header/Header";
import { Outlet } from "react-router-dom";
import Cabecalho from "../../components/Cabecalho/Cabecalho";
import { useRecoilState, useSetRecoilState } from "recoil";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { estadoUsuario, stateSiteConfig } from "../state/atom";
import { fetchDados } from "../http/http";

export default function AppLayout() {
  const setUsuario = useSetRecoilState(estadoUsuario);
  const [siteConfig, setSiteConfig] = useRecoilState(stateSiteConfig);

  const obterDados = async () => {
    const response = await fetchDados(`/dashboard/site-settings`);
    setSiteConfig(response.data);
  };

  useEffect(() => {
    obterDados();
  }, []);

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
