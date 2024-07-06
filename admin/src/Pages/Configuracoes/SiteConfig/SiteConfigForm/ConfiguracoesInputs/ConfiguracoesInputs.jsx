export default function ConfiguracoesInputs() {
  return (
    <div className="category">
      <h3>CONFIGURAÇÕES</h3>

      <label htmlFor="app_title">
        Título do site
        <input type="text" name="app_title" defaultValue="Ana Lima Prêmios" required />
      </label>

      <label htmlFor="logo">
        Logo (para fundo escuro)
        <input type="text" name="logo" defaultValue="" />
      </label>

      <label htmlFor="logo_white">
        Logo (para fundo branco)
        <input type="text" name="logo_white" defaultValue="" />
      </label>

      <label htmlFor="empresa">
        Empresa no rodapé
        <input type="text" name="empresa" defaultValue="" />
      </label>

      <label htmlFor="analytics">
        Google Analytics
        <input type="text" name="analytics" defaultValue="" />
      </label>

      <label htmlFor="webhook">
        URL Webhook
        <input type="text" name="webhook" defaultValue="" />
      </label>

      <label htmlFor="product_title">
        Protuto Titulo
        <input type="text" name="product_title" defaultValue="" />
      </label>

      <label htmlFor="product_subtitle">
        Produto Subtitulo
        <input type="text" name="product_subtitle" defaultValue="" />
      </label>
    </div>
  )
}
