import { useRecoilValue } from "recoil";
import { stateSiteConfig } from "../../atom";
import { useEffect } from "react";

const useCompartilharRifa = () => {
  const siteConfig = useRecoilValue(stateSiteConfig);

  const atualizarMetaTags = (siteConfig) => {
    if (siteConfig) {
      document.querySelector('meta[property="og:title"]').setAttribute("content", siteConfig.share_title);
      document.querySelector('meta[property="og:description"]').setAttribute("content", siteConfig.share_description);
      document.querySelector('meta[property="og:image"]').setAttribute("content", siteConfig.share_image);
      document.querySelector('meta[property="og:url"]').setAttribute("content", window.location.href);
    }
  };

  useEffect(() => {
    atualizarMetaTags(siteConfig);
  }, [siteConfig]);

  const compartilharRifa = async () => {
    try {
      await navigator.share({
        title: siteConfig.share_title,
        text: siteConfig.share_description,
        url: `${window.location.href}`,
      });
    } catch (error) {
      alert(`Erro ao compartilhar, tente novamente!`);
    }
  };

  return {
    compartilharRifa,
  };
};

export default useCompartilharRifa;
