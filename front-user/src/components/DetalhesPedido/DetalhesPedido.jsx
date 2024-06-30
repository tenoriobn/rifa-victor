import { useRecoilValue } from "recoil";
import useSlideImages from "../../common/state/hooks/ImagemPremio/ImagemPremio";
import InfoPedidos from "./InfoPedidos/InfoPedidos";
import ModoPagamento from "./ModoPagamento/ModoPagamento";
import NumerosBilhetes from "./ModoPagamento/NumerosBilhetes/NumerosBilhetes";
import ResumoPedido from "./ResumoPedido/ResumoPedido";
import { estadoRifa } from "../../common/state/atom";

export default function DetalhesPedido() {  
  const rifa = useRecoilValue(estadoRifa);
  const { imgPremioSlide } = useSlideImages(rifa);

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
