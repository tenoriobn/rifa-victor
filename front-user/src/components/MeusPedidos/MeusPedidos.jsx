// import CardAviso from "../CardAviso/CardAviso";
import Paginacao from "./Paginacao/Paginacao";
import TabelaPedidos from "./Tabela/TabelaPedidos";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from "react";
import { fetchDados } from "../../common/http/http";
import { useRecoilValue, useSetRecoilState } from "recoil";
import AvisoCarregando from "../AvisoCarregando/AvisoCarregando";
import {  estadoPedidosUsuario, estadoUsuario } from "../../common/state/atom.ts";

export default function MeusPedidos() {
  const setPedidosUsuario = useSetRecoilState(estadoPedidosUsuario);
  const [isLoading, setIsLoading] = useState(true);
  const notify = () => toast.error('Erro ao carregar pedidos...');
  const usuario = useRecoilValue(estadoUsuario);

  useEffect(() => {
    const pegarDados = async () => {
      try {
        const response = await fetchDados(`client/meus-pedidos/sorteios/${usuario.id}`, true);
        console.log('response', response)
        setPedidosUsuario(response.data)

      } catch (error) {
        console.error('Erro ao comprar rifa:', error);
      } finally {
        setIsLoading(false);
      }
    };

    pegarDados();
  }, []);

  if (isLoading) {
    return <AvisoCarregando />; 
  }

  return (
    <div 
      className="rounded-lg ring-1 ring-gray-200 shadow bg-white w-full mt-4 mb-8 px-4 py-5 sm:px-6"
    >
      <Paginacao />

      <TabelaPedidos />

      <Paginacao />

      <div>
        <button className="bg-slate-600" onClick={notify}>Notify!</button>
        <ToastContainer />
      </div>

      {/* <CardAviso
        classes="bg-red-50 text-red-500"
        subtitulo="Opa!"
        mensagem=" Não foi possível carregar os pedidos. Atualize a página para tentar novamente."
      /> */}
    </div>
  )
}
