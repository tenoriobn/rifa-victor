import { PatternFormat } from 'react-number-format';
import { useRecoilState } from "recoil";
import { stateInfoRifaForm } from '../../../../common/states/atom';

export default function Outros() {
  const [formState, setFormState] = useRecoilState(stateInfoRifaForm);

  return (
    <div className="category">
      <h3>OUTROS</h3>

      <label htmlFor="wp_group">
        Grupo WhatsApp
        <PatternFormat 
          format="(##) #####-####"
          type="text" 
          id="wp_group" 
          name="whatsapp_group"
          onChange={(e) => setFormState({ ...formState, whatsapp_group: e.target.value })} 
          value={formState.whatsapp_group || ''}
        />
      </label>

      <label htmlFor="link_download">
        Link do E-Book
        <input 
          type="text" 
          id="link_download" 
          name="link_ebook" 
          onChange={(e) => setFormState({ ...formState, link_ebook: e.target.value })} 
          value={formState.link_ebook || ''}
        />
      </label>

      <label htmlFor="emit_nf">
        Emite Nota Fiscal
        <select 
          id="emit_nf" 
          name="nota_fiscal" 
          onChange={(e) => setFormState({ ...formState, nota_fiscal: e.target.value })} 
          value={formState.nota_fiscal || 'nao'}
          required
        >
          <option value="sim">SIM</option>
          <option value="nao">NÃO</option>
        </select>
      </label>
    </div>
  );
}
