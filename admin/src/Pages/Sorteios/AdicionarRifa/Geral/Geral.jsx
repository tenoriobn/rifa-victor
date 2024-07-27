import { stateInfoRifaForm } from '../../../../common/states/atom';
import { useRecoilState } from "recoil";

export default function Geral() {
  const [formState, setFormState] = useRecoilState(stateInfoRifaForm);

  return (
    <div className="category">
      <h3>GERAL</h3>
      <label htmlFor="title">
        Título
        <input 
          type="text" 
          name="title" 
          onChange={(e) => setFormState({ ...formState, title: e.target.value })} 
          value={formState.title || ''}
          required 
        />
      </label>

      <label>
        Descrição resumida
        <input 
          id="description" 
          name="description_resume" 
          onChange={(e) => setFormState({ ...formState, description_resume: e.target.value })} 
          value={formState.description_resume || ''}

          required 
        />
      </label>

      <label htmlFor="hide">
        Mostrar no Site
        <select 
          id="hide" 
          name="show_site" 
          onChange={(e) => setFormState({ ...formState, show_site: e.target.value })} 
          value={formState.show_site || ''}
          required
        >
          <option value="sim">SIM</option>
          <option value="nao">NÃO</option>
        </select>
      </label>

      <label htmlFor="highlighted">
        Destaque
        <select 
          id="highlighted" 
          name="emphasis" 
          onChange={(e) => setFormState({ ...formState, emphasis: e.target.value })} 
          value={formState.emphasis || ''}

          required
        >
          <option value="">SELECIONE</option>
          <option value="sim">SIM</option>
          <option value="nao">NÃO</option>
        </select>
      </label>

      <label htmlFor="ranking">
        Mostrar TOP 5 Compradores
        <select 
          id="ranking" 
          name="show_top" 
          onChange={(e) => setFormState({ ...formState, show_top: e.target.value })} 
          value={formState.show_top || 'sim'}
          required
        >
          <option value="nao">NÃO</option>
          <option value="geral">Geral</option>
          <option value="diario">Diário</option>
          <option value="sim">Semanal</option>
        </select>
      </label>

      <label htmlFor="video">
        Vídeo (YOUTUBE)
        <input 
          type="text" 
          name="video" 
          onChange={(e) => setFormState({ ...formState, video: e.target.value })} 
          value={formState.video || ''}
        />
      </label>
    </div>
  );
}
