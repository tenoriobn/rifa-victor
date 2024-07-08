import { useRecoilState } from "recoil";
import { stateSiteConfig } from "../../../../../common/states/atom";

export default function SuporteContato() {
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
      <h3>SUPORTE / CONTATO</h3>

      <label htmlFor="whatsapp">
        Whatsapp (Somente números)
        <input 
          type="text" 
          name="whatsapp" 
          defaultValue={siteConfig.whatsapp || ""} 
          onChange={handleChange} 
          placeholder="55XXXXXXXX" 
        />
      </label>

      <label htmlFor="whatsapp_group">
        Grupo Whatsapp (URL)
        <input 
          type="text" 
          name="whatsapp_group" 
          defaultValue={siteConfig.whatsapp_group || ""} 
          onChange={handleChange} 
        />
      </label>

      <label htmlFor="instagram">
        Instagram
        <input 
          type="text" 
          name="instagram" 
          defaultValue={siteConfig.instagram || ""} 
          onChange={handleChange} 
        />
      </label>

      <label htmlFor="helpdesk">
        Helpdesk (URL)
        <input 
          type="text" 
          name="helpdesk" 
          defaultValue={siteConfig.helpdesk || ""} 
          onChange={handleChange} 
        />
      </label>

      <label htmlFor="mail">
        E-mail
        <input 
          type="text" 
          name="mail" 
          defaultValue={siteConfig.mail || ""} 
          onChange={handleChange} 
        />
      </label>
    </div>
  );
}
