import { useRecoilState } from "recoil";
import { stateInfoRifaForm } from '../../../../common/states/atom';

export default function Campanhas() {
  const [formState, setFormState] = useRecoilState(stateInfoRifaForm);

  return (
    <div className="category">
      <h3>CAMPANHAS</h3>
      <label htmlFor="pixels">
        Facebook Pixel
        <input 
          type="text" 
          id="pixels" 
          name="facebook_pixel" 
          onChange={(e) => setFormState({ ...formState, facebook_pixel: e.target.value })} 
          value={formState.facebook_pixel || ''}
        />
      </label>

      <label htmlFor="fb_token">
        Facebook Token
        <input 
          type="text" 
          id="fb_token" 
          name="facebook_token" 
          onChange={(e) => setFormState({ ...formState, facebook_token: e.target.value })} 
          value={formState.facebook_token || ''}
        />
      </label>

      <label htmlFor="tiktokpix">
        TikTok Pixel
        <input 
          type="text" 
          id="tiktokpix" 
          name="tiktok_pixel" 
          onChange={(e) => setFormState({ ...formState, tiktok_pixel: e.target.value })} 
          value={formState.tiktok_pixel || ''}
        />
      </label>
    </div>
  );
}
