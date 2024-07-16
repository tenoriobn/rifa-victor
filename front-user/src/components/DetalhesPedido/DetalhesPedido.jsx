/* eslint-disable react-hooks/exhaustive-deps */
import { useRecoilState } from "recoil";
import InfoPedidos from "./InfoPedidos/InfoPedidos";
import ModoPagamento from "./ModoPagamento/ModoPagamento";
import NumerosBilhetes from "./ModoPagamento/NumerosBilhetes/NumerosBilhetes";
import ResumoPedido from "./ResumoPedido/ResumoPedido";
import { estadoCheckoutInfo } from "../../common/state/atom";
import { useEffect, useState } from "react";
import { fetchDados } from "../../common/http/http";
import { useParams } from "react-router-dom";
import AvisoCarregando from "../AvisoCarregando/AvisoCarregando";

export default function DetalhesPedido() {  
  const [checkoutInfo, setCheckoutInfo] = useRecoilState(estadoCheckoutInfo);
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const pegarDados = async () => {
      try {
        const response = await fetchDados(`client/checkout/pedido/${id}`, true);
        setCheckoutInfo(response.data);

        console.log('Pedidos: ', response)
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
    <>
      <div className="aspect-[16/9] mb-4">
        <img 
          src={`../../../public/imgRifas/${checkoutInfo.rifa.rifa_image[0]?.path}`}
          className="w-full h-full object-cover rounded-lg mb-4"
          alt="Imagem do Prêmio" 
        />
      </div>

        <InfoPedidos /> 

      {checkoutInfo.status === 0 &&  
        <ModoPagamento />
      }

      {checkoutInfo.status === 1 &&  
        <NumerosBilhetes />
      }

      <ResumoPedido />
    </>
  )
}
