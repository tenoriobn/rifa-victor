export default function SuporteContato() {
  return (
    <div className="category">
      <h3>SUPORTE / CONTATO</h3>

      <label htmlFor="whatsapp">
        Whatsapp (Somente numeros)
        <input type="text" name="whatsapp" placeholder="55XXXXXXXX" defaultValue="5543996403859" />
      </label>

      <label htmlFor="whatsapp_group">
        Grupo Whatsapp (URL)
        <input type="text" name="whatsapp_group" defaultValue="" />
      </label>

      <label htmlFor="instagram">
        Instagram
        <input type="text" name="instagram" defaultValue="ana_limapremios" />
      </label>

      <label htmlFor="helpdesk">
        Helpdesk (URL)
        <input type="text" name="helpdesk" defaultValue="" />
      </label>

      <label htmlFor="mail">
        E-mail
        <input type="text" name="mail" defaultValue="" />
      </label>
    </div>
  )
}
