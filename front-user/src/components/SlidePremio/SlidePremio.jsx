import { useRecoilValue } from 'recoil';
import { estadoProdutos, estadoRenderizaComponenteCadastro, estadoRenderizaComponenteLogin, estadoRenderizaInfoUsuario, estadoRifa } from '../../common/state/atom';
// import useSlideImages from '../../common/state/hooks/ImagemPremio/ImagemPremio';
import { motion } from 'framer-motion';
import { transicaoAnimada } from '../../common/util/transicaoAnimada';
import { useState, useEffect } from 'react';

export default function SlidePremio() {
  const renderizaComponenteCadastro = useRecoilValue(estadoRenderizaComponenteCadastro);
  const renderizaComponenteLogin = useRecoilValue(estadoRenderizaComponenteLogin);
  const renderizaInfoUsuario = useRecoilValue(estadoRenderizaInfoUsuario);
  const rifa = useRecoilValue(estadoRifa);
  const produto= useRecoilValue(estadoProdutos);
  const renderizaComponente = produto.status === "ativas";
  const [imgPremioSlide, setImgPremioSlide] = useState(null);

  const animacao = transicaoAnimada();
  
  const imagensRifa = rifa.rifa_image;
  console.log('rifa: ', rifa)

  useEffect(() => {
    setImgPremioSlide(imagensRifa[0]?.path)
  }, [])


  return (
    <motion.div
      {...animacao}
    >
      <div className="aspect-[16/9] mb-4">
        {imgPremioSlide && (
          <img 
            src={`../../../public/imgRifas/${imgPremioSlide}`}
            className="w-full h-full object-cover rounded-lg mb-4"
            alt="Imagem do Prêmio" 
          />
        )}
      </div>

      {!renderizaComponenteCadastro && !renderizaComponenteLogin && !renderizaInfoUsuario && renderizaComponente && (
        <div className="flex flex-wrap gap-4 justify-center my-2">
          {imagensRifa.map((imagem, index) => (
            <img 
              key={index}
              src={`../../../public/imgRifas/${imagem.path}`}
              className={`w-16 h-16 object-cover rounded-lg mb-4 transition-all duration-300 cursor-pointer ${imagem.id !== index ? 'hover:scale-110' : ''}`}
              alt={`Miniatura ${index}`}
              onClick={() => setImgPremioSlide(imagem.path)}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}
