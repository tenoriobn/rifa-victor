import { useRecoilValue } from 'recoil';
import { estadoProdutos, estadoRenderizaComponenteCadastro, estadoRenderizaComponenteLogin, estadoRenderizaInfoUsuario, estadoRifa } from '../../common/state/atom';
import useSlideImages from '../../common/state/hooks/ImagemPremio/ImagemPremio';
import { motion } from 'framer-motion';
import { transicaoAnimada } from '../../common/util/transicaoAnimada';

export default function SlidePremio() {
  const renderizaComponenteCadastro = useRecoilValue(estadoRenderizaComponenteCadastro);
  const renderizaComponenteLogin = useRecoilValue(estadoRenderizaComponenteLogin);
  const renderizaInfoUsuario = useRecoilValue(estadoRenderizaInfoUsuario);
  const rifa = useRecoilValue(estadoRifa);
  const produto= useRecoilValue(estadoProdutos);
  const renderizaComponente = produto.status === "ativas";

  const { imgPremioSlide, setImgPremioSlide } = useSlideImages(rifa);
  const animacao = transicaoAnimada();

  return (
    <motion.div
      {...animacao}
    >
      <div className="aspect-[16/9] mb-4">
        {imgPremioSlide && (
          <img 
            src={imgPremioSlide} 
            className="w-full h-full object-cover rounded-lg mb-4"
            alt="Imagem do Prêmio" 
          />
        )}
      </div>

      {!renderizaComponenteCadastro && !renderizaComponenteLogin && !renderizaInfoUsuario && renderizaComponente && (
        <div className="flex flex-wrap gap-4 justify-center my-2">
          {rifa && rifa.img && JSON.parse(rifa.img).map((url, index) => (
            <img 
              key={index}
              src={"https://img.freepik.com/fotos-gratis/carro-luxuoso-estacionado-na-estrada-com-um-farol-iluminado-ao-por-do-sol_181624-60607.jpg?size=626&ext=jpg&ga=GA1.1.672697106.1717632000&semt=ais_user"}
              className={`w-16 h-16 object-cover rounded-lg mb-4 transition-all duration-300 cursor-pointer ${imgPremioSlide !== url ? 'hover:scale-110' : ''}`}
              alt={`Miniatura ${index}`}
              onClick={() => setImgPremioSlide(url)}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}
