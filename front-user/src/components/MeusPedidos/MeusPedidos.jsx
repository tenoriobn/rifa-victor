// import CardAviso from "../CardAviso/CardAviso";
import Paginacao from "./Paginacao/Paginacao";
import TabelaPedidos from "./Tabela/TabelaPedidos";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function MeusPedidos() {
  const notify = () => toast.error('Erro ao carregar pedidos...');

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
