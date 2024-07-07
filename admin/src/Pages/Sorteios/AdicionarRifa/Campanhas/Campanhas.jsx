import useFormState from '../../../../common/states/Hook/CriarRifa/CriarRifa';

export default function Campanhas() {
  const { formState, handleChange } = useFormState();

  return (
    <div className="category">
      <h3>CAMPANHAS</h3>
      <label htmlFor="pixels">
        Facebook Pixel
        <input type="text" id="pixels" name="facebook_pixel" value={formState.facebook_pixel} onChange={handleChange} />
      </label>

      <label htmlFor="fb_token">
        Facebook Token
        <input type="text" id="fb_token" name="facebook_token" value={formState.facebook_token} onChange={handleChange} />
      </label>

      <label htmlFor="tiktokpix">
        TikTok Pixel
        <input type="text" id="tiktokpix" name="tiktok_pixel" value={formState.tiktok_pixel} onChange={handleChange} />
      </label>
    </div>
  );
}
