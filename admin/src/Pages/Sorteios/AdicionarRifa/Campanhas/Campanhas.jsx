export default function Campanhas() {
  return (
    <div className="category">
      <h3>CAMPANHAS</h3>
      <label id="pixels">
        Facebook Pixel
        <input type="text" name="pixels" />
      </label>

      <label id="fb_token">
        Facebook Token
        <input type="text" name="fb_token" />
      </label>

      <label id="tiktokpix">
        TikTok Pixel
        <input type="text" name="tiktokpix" />
      </label>

    </div>
  )
}
