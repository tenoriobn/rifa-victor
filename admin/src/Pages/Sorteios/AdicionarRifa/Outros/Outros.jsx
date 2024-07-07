import useFormState from '../../../../common/states/Hook/CriarRifa/CriarRifa';

export default function Outros() {
  const { formState, handleChange } = useFormState();

  return (
    <div className="category">
      <h3>OUTROS</h3>

      <label htmlFor="wp_group">
        Grupo WhatsApp
        <input type="text" id="wp_group" name="whatsapp_group" value={formState.whatsapp_group} onChange={handleChange} />
      </label>

      <label htmlFor="link_download">
        Link do E-Book
        <input type="text" id="link_download" name="link_ebook" value={formState.link_ebook} onChange={handleChange} />
      </label>

      <label htmlFor="emit_nf">
        Emite Nota Fiscal
        <select id="emit_nf" name="nota_fiscal" value={formState.nota_fiscal} onChange={handleChange} required>
          <option value="sim">SIM</option>
          <option value="nao">NÃO</option>
        </select>
      </label>
    </div>
  );
}
