import { useRecoilValue, useRecoilState } from "recoil";
import useSlideImages from "../../common/state/hooks/ImagemPremio/ImagemPremio";
import InfoPedidos from "./InfoPedidos/InfoPedidos";
import ModoPagamento from "./ModoPagamento/ModoPagamento";
import NumerosBilhetes from "./ModoPagamento/NumerosBilhetes/NumerosBilhetes";
import ResumoPedido from "./ResumoPedido/ResumoPedido";
import { estadoCheckoutId, estadoCheckoutInfo, estadoRifa } from "../../common/state/atom";
import { useEffect } from "react";
import { fetchDados } from "../../common/http/http";
import { useParams } from "react-router-dom";

export default function DetalhesPedido() {  
  const rifa = useRecoilValue(estadoRifa);
  const { imgPremioSlide } = useSlideImages(rifa);
  const checkoutReq = useRecoilValue(estadoCheckoutId);
  const [checkoutInfo, setCheckoutInfo] = useRecoilState(estadoCheckoutInfo)
  const { id } = useParams();

  useEffect(() => {
    const pegarDados = async () => {
      try {
        const checkoutId = checkoutReq.data.id;
        console.log(checkoutId)

        const response = await fetchDados(`client/pedidos/${id}`, true);

        setCheckoutInfo(response);

        console.log('checkout:', checkoutInfo)

        
        console.log('id da url: ', id)
        

        console.log(response);
      } catch (error) {
        console.error('Erro ao comprar rifa:', error);
      }
    };

    pegarDados();
  }, [])

  return (
    <>
      <div className="aspect-[16/9] mb-4">
        <img 
          src={imgPremioSlide} 
          className="w-full h-full object-cover rounded-lg mb-4"
          alt="Imagem do Prêmio" 
        />
      </div>
      <InfoPedidos />
      <ModoPagamento />
      <NumerosBilhetes />
      <ResumoPedido />
    </>
  )
}
