import { useRecoilState } from "recoil";
import { stateSiteConfig } from "../../../../../common/states/atom";
import { PatternFormat } from "react-number-format";

export default function SuporteContato() {
  const [siteConfig, setSiteConfig] = useRecoilState(stateSiteConfig);

  return (
    <div className="category">
      <h3>SUPORTE / CONTATO</h3>

      <label htmlFor="whatsapp">
        Whatsapp (Somente números)
        <PatternFormat
          format="(##) #####-####" 
          type="text" 
          name="whatsapp" 
          value={siteConfig.whatsapp || ""} 
          onChange={(e) => setSiteConfig({ ...siteConfig, whatsapp: e.target.value })}
          placeholder="55XXXXXXXX" 
        />
      </label>

      <label htmlFor="whatsapp_group">
        Grupo Whatsapp (URL)
        <input 
          type="text" 
          name="whatsapp_group" 
          value={siteConfig.whatsapp_group || ""} 
          onChange={(e) => setSiteConfig({ ...siteConfig, whatsapp_group: e.target.value })}
        />
      </label>

      <label htmlFor="instagram">
        Instagram
        <input 
          type="text" 
          name="instagram" 
          value={siteConfig.instagram || ""} 
          onChange={(e) => setSiteConfig({ ...siteConfig, instagram: e.target.value })}
        />
      </label>

      <label htmlFor="helpdesk">
        Helpdesk (URL)
        <input 
          type="text" 
          name="helpdesk" 
          value={siteConfig.helpdesk || ""} 
          onChange={(e) => setSiteConfig({ ...siteConfig, helpdesk: e.target.value })}
        />
      </label>

      <label htmlFor="mail">
        E-mail
        <input 
          type="email" 
          name="email" 
          value={siteConfig.email || ""} 
          onChange={(e) => setSiteConfig({ ...siteConfig, email: e.target.value })}
        />
      </label>
    </div>
  );
}
