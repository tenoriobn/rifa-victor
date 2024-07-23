import { useRecoilState } from "recoil";
import { stateSiteConfig } from "../../../../../common/states/atom";
import { PatternFormat } from "react-number-format";

export default function SuporteContato() {
  const [siteConfig, setSiteConfig] = useRecoilState(stateSiteConfig);

  console.log('siteconfig', siteConfig)

  return (
    <div className="category">
      <h3>SUPORTE / CONTATO</h3>

      <label htmlFor="whatsapp">
        Whatsapp (Somente números)
        <PatternFormat
          format="(##) #####-####" 
          type="text" 
          name="whatsapp" 
          value={siteConfig?.whatsapp || ""} 
          onChange={(e) => setSiteConfig({ ...siteConfig, whatsapp: e.target.value })}
          placeholder="55XXXXXXXX" 
        />
      </label>

      <label htmlFor="whatsapp_group_url">
        Grupo Whatsapp (URL)
        <input 
          type="text" 
          name="whatsapp_group_url" 
          value={siteConfig?.whatsapp_group_url || ""} 
          onChange={(e) => setSiteConfig({ ...siteConfig, whatsapp_group_url: e.target.value })}
        />
      </label>

      <label htmlFor="instagram">
        Instagram
        <input 
          type="text" 
          name="instagram" 
          value={siteConfig?.instagram || ""} 
          onChange={(e) => setSiteConfig({ ...siteConfig, instagram: e.target.value })}
        />
      </label>

      <label htmlFor="helpdesk_url">
        Helpdesk (URL)
        <input 
          type="text" 
          name="helpdesk_url" 
          value={siteConfig?.helpdesk_url || ""} 
          onChange={(e) => setSiteConfig({ ...siteConfig, helpdesk_url: e.target.value })}
        />
      </label>

      <label htmlFor="mail">
        E-mail
        <input 
          type="email" 
          name="email" 
          value={siteConfig?.email || ""} 
          onChange={(e) => setSiteConfig({ ...siteConfig, email: e.target.value })}
        />
      </label>
    </div>
  );
}
