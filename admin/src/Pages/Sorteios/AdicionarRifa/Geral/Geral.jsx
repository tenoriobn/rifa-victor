export default function Geral() {
  return (
    <div className="category">
      <h3>GERAL</h3>

      <label htmlFor="title">
        Título
        <input type="text" name="title" required="" />
      </label>

      <label>
          Descrição resumida
          <input id="description" name="description" required=""/>
      </label>

      <label htmlFor="">
        Mostrar no Site
        <select id="hide" name="hide" required="">
          <option value="N" selected="">SIM</option>
          <option value="Y">NÃO</option>
        </select>
      </label>

      <label htmlFor="">
          Destaque
          <select id="highlighted" name="highlighted" required="">
              <option value="">SELECIONE</option>
              <option value="Y">SIM</option>
              <option value="N">NÃO</option>
          </select>
      </label>

      <label htmlFor="">
        Mostrar TOP 5 Compradores
        <select id="ranking" name="ranking" required="">
            <option value="N" selected="">NÃO</option>
            <option value="Y">Geral</option>
            <option value="D">Diário</option>
            <option value="D">Semanal</option>
        </select>
      </label>

      <label htmlFor="video">
        Vídeo (YOUTUBE)
        <input type="text" name="video" />
      </label>
    </div>
  )
}
