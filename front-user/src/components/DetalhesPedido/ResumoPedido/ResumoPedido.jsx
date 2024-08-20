import { useRecoilValue } from "recoil";
import { estadoCheckoutInfo } from "../../../common/state/atom";
import useFormattedDate from "../../../common/state/hooks/useFormattedDate/useFormattedDate ";

export default function ResumoPedido() {
  const checkoutInfo = useRecoilValue(estadoCheckoutInfo);
  const { formattedDate } = useFormattedDate();

  return (
    <div>
      <h3 className="my-2 font-semibold text-neutral-700">Resumo do Pedido</h3>

      {checkoutInfo?.status === 0 && 
        <div 
          className="mb-8 bg-amber-100 border-l-4 border-amber-500 text-amber-700 p-4 rounded" role="alert"
        >
          <p className="font-bold">Pedido Gerado</p>
          <p>Aguardando confirmação de pagamento!</p>
        </div>
      }

        {checkoutInfo?.status === 1 && 
          <div 
            className="mb-8 bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded" role="alert"
          >
            <p className="font-bold">Pedido Finalizado</p>
            <p> Pedido Aprovado em <span className="font-semibold">{formattedDate(checkoutInfo.updated_at)}</span></p>
          </div>
        }


      {checkoutInfo?.status === 2 && 
          <div className="mb-8 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded" role="alert">
            <p className="font-bold">Pedido Cancelado</p>
            <p>O pedido foi cancelado!</p>
          </div>
        }
    </div>
  )
}
