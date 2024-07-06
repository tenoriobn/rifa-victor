export default function Geral() {
  return (
    <div className="category">
      <h3>GERAL</h3>

      <label htmlFor="title">
        Título
        <input type="text" name="title" required />
      </label>

      <label>
          Descrição resumida
          <input id="description" name="description" required/>
      </label>

      <label htmlFor="">
        Mostrar no Site
        <select id="hide" name="hide" required>
          <option defaultValue="N" selected>SIM</option>
          <option defaultValue="Y">NÃO</option>
        </select>
      </label>

      <label htmlFor="">
          Destaque
          <select id="highlighted" name="highlighted" required>
              <option defaultValue="">SELECIONE</option>
              <option defaultValue="Y">SIM</option>
              <option defaultValue="N">NÃO</option>
          </select>
      </label>

      <label htmlFor="">
        Mostrar TOP 5 Compradores
        <select id="ranking" name="ranking" required>
            <option defaultValue="N" selected>NÃO</option>
            <option defaultValue="Y">Geral</option>
            <option defaultValue="D">Diário</option>
            <option defaultValue="D">Semanal</option>
        </select>
      </label>

      <label htmlFor="video">
        Vídeo (YOUTUBE)
        <input type="text" name="video" />
      </label>
    </div>
  )
}
