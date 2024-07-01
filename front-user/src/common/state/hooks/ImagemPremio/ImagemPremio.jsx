import { useState, useEffect } from 'react';

// Hook customizado para gerenciar as imagens de slide
function useSlideImages(initialRifa) {
  const [imgPremioSlide, setImgPremioSlide] = useState(null);

  useEffect(() => {
    // Parse the 'img' JSON string into an array of URLs
    if (initialRifa && initialRifa.img) {
      const imgUrls = JSON.parse(initialRifa.img);
      if (imgUrls && imgUrls.length > 0) {
        setImgPremioSlide(imgUrls[0]); // Set initial slide image
      }
    }
  }, [initialRifa]);

  return { imgPremioSlide, setImgPremioSlide };
}

export default useSlideImages;
