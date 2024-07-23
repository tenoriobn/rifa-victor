import { useRecoilState } from "recoil";
import { stateSiteConfig } from "../../../../../common/states/atom";

export default function SiteConfigSeo() {
  const [siteConfig, setSiteConfig] = useRecoilState(stateSiteConfig);

  return (
    <div className="category">
      <h3>SEO</h3>

      <label htmlFor="author">
        Autor
        <input 
          type="text" 
          name="author" 
          value={siteConfig?.author || ""} 
          onChange={(e) => setSiteConfig({ ...siteConfig, author: e.target.value })} 
        />
      </label>

      <label htmlFor="tags">
        Tags
        <input 
          type="text" 
          name="tags" 
          value={siteConfig?.tags || ""} 
          onChange={(e) => setSiteConfig({ ...siteConfig, tags: e.target.value })} 
        />
      </label>

      <label htmlFor="share_title">
        Título Compartilhamento
        <input 
          type="text" 
          name="share_title" 
          value={siteConfig?.share_title || ""} 
          onChange={(e) => setSiteConfig({ ...siteConfig, share_title: e.target.value })} 
        />
      </label>

      <label htmlFor="share_image">
        Imagem Compartilhamento
        <input 
          type="text" 
          name="share_image" 
          value={siteConfig?.share_image || ""} 
          onChange={(e) => setSiteConfig({ ...siteConfig, share_image: e.target.value })} 
        />
      </label>

      <label htmlFor="share_description">
        Descrição Compartilhamento
        <textarea 
          id="share_description" 
          name="share_description" 
          cols="50" 
          rows="5" 
          value={siteConfig?.share_description || ""} 
          onChange={(e) => setSiteConfig({ ...siteConfig, share_description: e.target.value })} 
        />
      </label>
    </div>
  );
}
