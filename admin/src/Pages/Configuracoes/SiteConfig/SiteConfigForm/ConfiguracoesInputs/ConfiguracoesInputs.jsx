import { useRecoilState } from "recoil";
import { stateSiteConfig } from "../../../../../common/states/atom";

export default function ConfiguracoesInputs() {
  const [siteConfig, setSiteConfig] = useRecoilState(stateSiteConfig);

  return (
    <div className="category">
      <h3>CONFIGURAÇÕES</h3>

      <label htmlFor="site_title">
        Título do site
        <input 
          type="text" 
          name="site_title" 
          value={siteConfig.site_title || ""} 
          onChange={(e) => setSiteConfig({ ...siteConfig, site_title: e.target.value })} 
          required 
        />
      </label>

      <label htmlFor="logo_dark">
        Logo (para fundo escuro)
        <input 
          type="text" 
          name="logo_dark" 
          value={siteConfig.logo_dark || ""} 
          onChange={(e) => setSiteConfig({ ...siteConfig, logo_dark: e.target.value })} 
        />
      </label>

      <label htmlFor="logo_light">
        Logo (para fundo branco)
        <input 
          type="text" 
          name="logo_light" 
          value={siteConfig.logo_light || ""} 
          onChange={(e) => setSiteConfig({ ...siteConfig, logo_light: e.target.value })} 
        />
      </label>

      <label htmlFor="footer_company">
        Empresa no rodapé
        <input 
          type="text" 
          name="footer_company" 
          value={siteConfig.footer_company || ""} 
          onChange={(e) => setSiteConfig({ ...siteConfig, footer_company: e.target.value })} 
        />
      </label>

      <label htmlFor="google_analytics">
        Google Analytics
        <input 
          type="text" 
          name="google_analytics" 
          value={siteConfig.google_analytics || ""} 
          onChange={(e) => setSiteConfig({ ...siteConfig, google_analytics: e.target.value })} 
        />
      </label>

      <label htmlFor="webhook_url">
        URL Webhook
        <input 
          type="text" 
          name="webhook_url" 
          value={siteConfig.webhook_url || ""} 
          onChange={(e) => setSiteConfig({ ...siteConfig, webhook_url: e.target.value })} 
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
