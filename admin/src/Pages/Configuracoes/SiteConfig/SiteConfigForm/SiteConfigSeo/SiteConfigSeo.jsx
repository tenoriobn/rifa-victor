export default function SiteConfigSeo() {
  return (
    <div className="category">
      <h3>SEO</h3>

      <label htmlFor="author">
        Autor
        <input type="text" name="author" defaultValue="Ana Lima Prêmios" />
      </label>

      <label htmlFor="tags">
        Tags
        <input type="text" name="tags" defaultValue="" />
      </label>

      <label htmlFor="og_title">
        Titulo Compartilhamento
        <input type="text" name="og_title" defaultValue="Ana Lima Prêmios" />
      </label>
      <label htmlFor="og_image">
        Imagem Compartilhamento
        <input type="text" name="og_image" defaultValue="" />
      </label>
      <label htmlFor="og_description">
        Descrição Compartilhamento
        <textarea id="og_description" name="og_description" cols="50" rows="5"></textarea>
      </label>
    </div>
  )
}
