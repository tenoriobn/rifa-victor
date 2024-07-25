import { useRecoilValue } from "recoil";
import { stateSiteConfig } from "../../atom";

const useCompartilharRifa = () => {
  const siteConfig = useRecoilValue(stateSiteConfig);

  console.log('rifa', siteConfig.share_title)

  const compartilharRifa = async () => {
    try {
      await navigator.share({
        title: siteConfig.share_title,
        text: siteConfig.share_description,
        image: siteConfig.share_image,
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
