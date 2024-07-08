import { useRecoilState } from "recoil";
import { stateSiteConfig } from "../../../../../common/states/atom";

export default function ConfiguracoesInputs() {
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
      <h3>CONFIGURAÇÕES</h3>

      <label htmlFor="app_title">
        Título do site
        <input 
          type="text" 
          name="app_title" 
          defaultValue={siteConfig.app_title || ""} 
          onChange={handleChange} 
          required 
        />
      </label>

      <label htmlFor="logo">
        Logo (para fundo escuro)
        <input 
          type="text" 
          name="logo" 
          defaultValue={siteConfig.logo || ""} 
          onChange={handleChange} 
        />
      </label>

      <label htmlFor="logo_white">
        Logo (para fundo branco)
        <input 
          type="text" 
          name="logo_white" 
          defaultValue={siteConfig.logo_white || ""} 
          onChange={handleChange} 
        />
      </label>

      <label htmlFor="empresa">
        Empresa no rodapé
        <input 
          type="text" 
          name="empresa" 
          defaultValue={siteConfig.empresa || ""} 
          onChange={handleChange} 
        />
      </label>

      <label htmlFor="analytics">
        Google Analytics
        <input 
          type="text" 
          name="analytics" 
          defaultValue={siteConfig.analytics || ""} 
          onChange={handleChange} 
        />
      </label>

      <label htmlFor="webhook">
        URL Webhook
        <input 
          type="text" 
          name="webhook" 
          defaultValue={siteConfig.webhook || ""} 
          onChange={handleChange} 
        />
      </label>

      <label htmlFor="product_title">
        Produto Titulo
        <input 
          type="text" 
          name="product_title" 
          defaultValue={siteConfig.product_title || ""} 
          onChange={handleChange} 
        />
      </label>

      <label htmlFor="product_subtitle">
        Produto Subtitulo
        <input 
          type="text" 
          name="product_subtitle" 
          defaultValue={siteConfig.product_subtitle || ""} 
          onChange={handleChange} 
        />
      </label>
    </div>
  );
}
