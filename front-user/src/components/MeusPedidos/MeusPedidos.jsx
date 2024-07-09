import CardNotificacaoErroPedidos from "../CardNotificacaoErroPedidos/CardNotificacaoErroPedidos";
import Paginacao from "./Paginacao/Paginacao";
import TabelaPedidos from "./Tabela/TabelaPedidos";

export default function MeusPedidos() {
  return (
    <div 
      className="rounded-lg ring-1 ring-gray-200 shadow bg-white w-full mt-4 mb-8 px-4 py-5 sm:px-6"
    >
      <Paginacao />

      <TabelaPedidos />

      <Paginacao />

      <CardNotificacaoErroPedidos />
    </div>
  )
}
