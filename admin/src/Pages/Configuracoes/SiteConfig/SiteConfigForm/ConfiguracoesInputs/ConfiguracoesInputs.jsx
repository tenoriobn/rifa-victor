import { useRecoilState } from "recoil";
import { stateSiteConfig } from "../../../../../common/states/atom";

export default function ConfiguracoesInputs() {
  const [siteConfig, setSiteConfig] = useRecoilState(stateSiteConfig);

  console.log(siteConfig)

  return (
    <div className="category">
      <h3>CONFIGURAÇÕES</h3>

      <label htmlFor="app_title">
        Título do site
        <input 
          type="text" 
          name="app_title" 
          value={siteConfig.app_title || ""} 
          onChange={(e) => setSiteConfig({ ...siteConfig, app_title: e.target.value })} 
          required 
        />
      </label>

      <label htmlFor="logo">
        Logo (para fundo escuro)
        <input 
          type="text" 
          name="logo" 
          value={siteConfig.logo || ""} 
          onChange={(e) => setSiteConfig({ ...siteConfig, logo: e.target.value })} 
        />
      </label>

      <label htmlFor="logo_white">
        Logo (para fundo branco)
        <input 
          type="text" 
          name="logo_white" 
          value={siteConfig.logo_white || ""} 
          onChange={(e) => setSiteConfig({ ...siteConfig, logo_white: e.target.value })} 
        />
      </label>

      <label htmlFor="empresa">
        Empresa no rodapé
        <input 
          type="text" 
          name="empresa" 
          value={siteConfig.empresa || ""} 
          onChange={(e) => setSiteConfig({ ...siteConfig, empresa: e.target.value })} 
        />
      </label>

      <label htmlFor="analytics">
        Google Analytics
        <input 
          type="text" 
          name="analytics" 
          value={siteConfig.analytics || ""} 
          onChange={(e) => setSiteConfig({ ...siteConfig, analytics: e.target.value })} 
        />
      </label>

      <label htmlFor="webhook">
        URL Webhook
        <input 
          type="text" 
          name="webhook" 
          value={siteConfig.webhook || ""} 
          onChange={(e) => setSiteConfig({ ...siteConfig, webhook: e.target.value })} 
        />
      </label>

      <label htmlFor="product_title">
        Produto Titulo
        <input 
          type="text" 
          name="product_title" 
          value={siteConfig.product_title || ""} 
          onChange={(e) => setSiteConfig({ ...siteConfig, product_title: e.target.value })} 
        />
      </label>

      <label htmlFor="product_subtitle">
        Produto Subtitulo
        <input 
          type="text" 
          name="product_subtitle" 
          value={siteConfig.product_subtitle || ""} 
          onChange={(e) => setSiteConfig({ ...siteConfig, product_subtitle: e.target.value })} 
        />
      </label>
    </div>
  );
}
