import { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { estadoRenderizaComponenteCadastro, estadoRenderizaComponenteLogin, estadoRifa } from '../../common/state/atom';

export default function SlidePremio() {
  const renderizaComponenteCadastro = useRecoilValue(estadoRenderizaComponenteCadastro);
  const renderizaComponenteLogin = useRecoilValue(estadoRenderizaComponenteLogin);
  const rifa = useRecoilValue(estadoRifa);
  const [imgPremioSlide, setImgPremioSlide] = useState(null);

  useEffect(() => {
    // Parse the 'img' JSON string into an array of URLs
    if (rifa && rifa.img) {
      const imgUrls = JSON.parse(rifa.img);
      if (imgUrls && imgUrls.length > 0) {
        setImgPremioSlide(imgUrls[0]); // Set initial slide image
      }
    }
  }, [rifa]);

  return (
    <>
      <div className="aspect-[16/9] mb-4">
        {imgPremioSlide && (
          <img 
            src={imgPremioSlide} 
            className="w-full h-full object-cover rounded-lg mb-4"
            alt="Imagem do Prêmio" 
          />
        )}
      </div>

      {!renderizaComponenteCadastro && !renderizaComponenteLogin && (
        <div className="flex flex-wrap gap-4 justify-center my-2">
          {rifa && rifa.img && JSON.parse(rifa.img).map((url, index) => (
            <img 
              key={index}
              src={url}
              className={`w-16 h-16 object-cover rounded-lg mb-4 transition-all cursor-pointer ${imgPremioSlide !== url ? 'hover:scale-110' : ''}`}
              alt={`Miniatura ${index}`}
              onClick={() => setImgPremioSlide(url)}
            />
          ))}
        </div>
      )}
    </>
  );
}
