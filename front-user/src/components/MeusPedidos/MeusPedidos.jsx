/* eslint-disable react-hooks/exhaustive-deps */
import Paginacao from "./Paginacao/Paginacao";
import TabelaPedidos from "./Tabela/TabelaPedidos";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from "react";
import { fetchDados } from "../../common/http/http";
import { useRecoilState, useRecoilValue } from "recoil";
import AvisoCarregando from "../AvisoCarregando/AvisoCarregando";
import { estadoPedidosUsuario, estadoUsuario } from "../../common/state/atom.ts";
import CardAviso from "../CardAviso/CardAviso.jsx";

export default function MeusPedidos() {
  const [pedidosUsuario, setPedidosUsuario] = useRecoilState(estadoPedidosUsuario);
  const [isLoading, setIsLoading] = useState(true);
  const usuario = useRecoilValue(estadoUsuario);
  const [erroConexao, setErroConexao] = useState(false);
  const [pagination, setPagination] = useState(null)
  const [currentPage, setCurrentPage] = useState(1);
  
  const notify = () => toast.error('Erro ao carregar pedidos...');

  const pegarDados = async (page = 1) => {
    try {
      const response = await fetchDados(`client/meus-pedidos/sorteios/${usuario.id}?page=${page}`, true);
      setPedidosUsuario(response.data.data)
      setPagination(response.data);
      setErroConexao(false);
    } catch (error) {
      setErroConexao(true);
      notify();
      console.error('Erro ao comprar rifa:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    pegarDados(currentPage);
  }, [currentPage]);

  if (isLoading) {
    return <AvisoCarregando />; 
  }

  return (
    <div 
      className="rounded-lg ring-1 ring-gray-200 shadow bg-white w-full mt-4 mb-8 p-4"
    >
      {
        !erroConexao ? (
          pedidosUsuario && pedidosUsuario.length > 0 ? (
            <>
              <Paginacao 
                pagination={pagination} 
                onPageChange={(page) => setCurrentPage(page)}
              />
              <TabelaPedidos />

              <div className="mt-5">
                <Paginacao 
                  pagination={pagination} 
                  onPageChange={(page) => setCurrentPage(page)}
                />
              </div>

            </>
          ) : (
            <CardAviso 
              classes="border-yellow-600 bg-yellow-100 text-yellow-700"
              subtitulo="Nada aqui..."
              mensagem="Parece que você ainda não tem pedidos!"
            />
          )
        ) : (
          <>
            <ToastContainer />
            <CardAviso 
              classes="border-red-600 bg-red-100 text-red-700"
              subtitulo="Erro de conexão"
              mensagem=" Não foi possível conectar ao servidor. Verifique sua conexão com a internet."
            />
          </>
        )
      }
    </div>
  )
}
