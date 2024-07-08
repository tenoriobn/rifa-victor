import { useRecoilState } from "recoil";
import { stateSiteConfig } from "../../../../../common/states/atom";

export default function SiteConfigSeo() {
  const [siteConfig, setSiteConfig] = useRecoilState(stateSiteConfig);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSiteConfig((prevConfig) => ({
      ...prevConfig,
      [name]: value
    }));
  };

  return (
    <div className="category">
      <h3>SEO</h3>

      <label htmlFor="author">
        Autor
        <input 
          type="text" 
          name="author" 
          defaultValue={siteConfig.author || ""} 
          onChange={handleChange} 
        />
      </label>

      <label htmlFor="tags">
        Tags
        <input 
          type="text" 
          name="tags" 
          defaultValue={siteConfig.tags || ""} 
          onChange={handleChange} 
        />
      </label>

      <label htmlFor="og_title">
        Título Compartilhamento
        <input 
          type="text" 
          name="og_title" 
          defaultValue={siteConfig.og_title || ""} 
          onChange={handleChange} 
        />
      </label>

      <label htmlFor="og_image">
        Imagem Compartilhamento
        <input 
          type="text" 
          name="og_image" 
          defaultValue={siteConfig.og_image || ""} 
          onChange={handleChange} 
        />
      </label>

      <label htmlFor="og_description">
        Descrição Compartilhamento
        <textarea 
          id="og_description" 
          name="og_description" 
          cols="50" 
          rows="5" 
          defaultValue={siteConfig.og_description || ""} 
          onChange={handleChange} 
        />
      </label>
    </div>
  );
}
