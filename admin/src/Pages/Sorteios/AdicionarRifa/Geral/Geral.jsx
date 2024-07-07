import useFormState from '../../../../common/states/Hook/CriarRifa/CriarRifa';

export default function Geral() {
  const { formState, handleChange } = useFormState();

  return (
    <div className="category">
      <h3>GERAL</h3>
      <label htmlFor="title">
        Título
        <input type="text" name="title" value={formState.title} onChange={handleChange} required />
      </label>

      <label>
        Descrição resumida
        <input id="description" name="description_resume" value={formState.description_resume} onChange={handleChange} required />
      </label>

      <label htmlFor="hide">
        Mostrar no Site
        <select id="hide" name="show_site" value={formState.show_site} onChange={handleChange} required>
          <option value="sim">SIM</option>
          <option value="nao">NÃO</option>
        </select>
      </label>

      <label htmlFor="highlighted">
        Destaque
        <select id="highlighted" name="emphasis" value={formState.emphasis} onChange={handleChange} required>
          <option value="">SELECIONE</option>
          <option value="sim">SIM</option>
          <option value="nao">NÃO</option>
        </select>
      </label>

      <label htmlFor="ranking">
        Mostrar TOP 5 Compradores
        <select id="ranking" name="show_top" value={formState.show_top} onChange={handleChange} required>
          <option value="nao">NÃO</option>
          <option value="geral">Geral</option>
          <option value="diario">Diário</option>
          <option value="sim">Semanal</option>
        </select>
      </label>

      <label htmlFor="video">
        Vídeo (YOUTUBE)
        <input type="text" name="video" value={formState.video} onChange={handleChange} />
      </label>
    </div>
  );
}
