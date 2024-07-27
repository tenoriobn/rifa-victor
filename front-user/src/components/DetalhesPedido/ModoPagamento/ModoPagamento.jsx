import ModalPix from "./ModalPix/ModalPix";
import { useRecoilValue } from "recoil";
import { estadoCheckoutInfo } from "../../../common/state/atom";

export default function ModoPagamento() {
  const checkoutInfo = useRecoilValue(estadoCheckoutInfo);

  return (
    <div className="my-4 bg-sky-100 border-l-4 border-sky-500 text-sky-700 p-4 rounded">
      <div className="flex gap-2 justify-between items-center">
        <div>
          <h4 className="font-semibold">Clique no botão &quot;Pagar&quot; para gerar o PIX e concluir sua compra.</h4>
          <p>Após o pagamento, confira seu e-mail para detalhes da compra e cotas adquiridas.</p>
          <p>Você pode verificar seu pedido em acessos futuros acessando &quot;Meus Pedidos&quot; no menu ou clicando no seu nome.</p>
        </div>

        {checkoutInfo?.status !== 2 &&
          <ModalPix />
        }
      </div>


      {checkoutInfo?.status === 2 &&
        <div className="mt-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded">
          <h4 className="font-bold">Falha!</h4>
          <p>Pedido expirado, refaça o pedido. (2194)</p>
          <p className="text-sm">Tente novamente em alguns instantes</p>
        </div>
      }
    </div>
  )
}
