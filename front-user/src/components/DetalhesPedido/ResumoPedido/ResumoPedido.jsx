import { useRecoilValue } from "recoil";
import { estadoCheckoutInfo } from "../../../common/state/atom";

export default function ResumoPedido() {
  const checkoutInfo = useRecoilValue(estadoCheckoutInfo);

  console.log(checkoutInfo)

  return (
    <div>
      <h3 className="my-2 font-semibold text-neutral-700">Resumo do Pedido</h3>

      {checkoutInfo.status !== 2 && 
        <div 
          className="mb-8 bg-amber-100 border-l-4 border-amber-500 text-amber-700 p-4 rounded" role="alert"
        >
          {checkoutInfo.status === 0 && 
            <>          
              <p className="font-bold">Pedido Gerado</p>
              <p>Aguardando confirmação de pagamento!</p>
            </>
          }

          {checkoutInfo.status === 1 && 
            <p> Pedido Aprovado em <span className="font-semibold">{checkoutInfo.updated_at}</span></p>
          }
        </div>
      }

      {checkoutInfo.status === 2 && 
          <div className="mb-8 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded" role="alert">
            <p className="font-bold">Pedido Cancelado</p>
            <p>O pedido foi cancelado!</p>
          </div>
        }
    </div>
  )
}
