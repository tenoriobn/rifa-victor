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
          value={siteConfig.author || ""} 
          onChange={(e) => setSiteConfig({ ...siteConfig, author: e.target.value })} 
        />
      </label>

      <label htmlFor="tags">
        Tags
        <input 
          type="text" 
          name="tags" 
          value={siteConfig.tags || ""} 
          onChange={(e) => setSiteConfig({ ...siteConfig, tags: e.target.value })} 
        />
      </label>

      <label htmlFor="og_title">
        Título Compartilhamento
        <input 
          type="text" 
          name="og_title" 
          value={siteConfig.og_title || ""} 
          onChange={(e) => setSiteConfig({ ...siteConfig, og_title: e.target.value })} 
        />
      </label>

      <label htmlFor="og_image">
        Imagem Compartilhamento
        <input 
          type="text" 
          name="og_image" 
          value={siteConfig.og_image || ""} 
          onChange={(e) => setSiteConfig({ ...siteConfig, og_image: e.target.value })} 
        />
      </label>

      <label htmlFor="og_description">
        Descrição Compartilhamento
        <textarea 
          id="og_description" 
          name="og_description" 
          cols="50" 
          rows="5" 
          value={siteConfig.og_description || ""} 
          onChange={(e) => setSiteConfig({ ...siteConfig, og_description: e.target.value })} 
        />
      </label>
    </div>
  );
}
