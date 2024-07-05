export default function Outros() {
  return (
    <div className="category">
      <h3>OUTROS</h3>

      <label>
          Grupo WhatsApp
          <input id="wp_group" name="wp_group" />
      </label>

      <label id="link_download">
          Link do E-Book
          <input type="text" name="link_download" />
      </label>

      <label htmlFor="emit_nf">
        Emite Nota Fiscal
        <select id="emit_nf" name="emit_nf" required="">
            <option value="Y">SIM</option>
            <option value="N" selected="">NÃO</option>
        </select>
      </label>
    </div>
  )
}
