/* eslint-disable react/prop-types */
import { stateInfoRifaForm } from "../../../../common/states/atom";
import { useRecoilState } from "recoil";

export default function Promocoes({ mostrarCampo }) {
  const [formState, setFormState] = useRecoilState(stateInfoRifaForm);

  return (
    <div className="category">
      <h3>PROMOÇÕES</h3>

      {/* Somente no EDITAR sorteio */}
      {mostrarCampo && (
        <>        
          <label id="double_quota">
            Cotas Dobradas
            <select 
              id="highlighted" 
              name="cotas_double" 
              required
              onChange={(e) => setFormState({ ...formState, cotas_double: e.target.value })} 
              value={formState.cotas_double || 'nao'}
            >
              <option value="sim">SIM</option>
              <option value="nao" selected>NAO</option>
            </select>
          </label>
    
          <label id="double_quota_text">
            Texto Cotas Dobradas
            <input 
              type="text" 
              name="text_cotas_double" 
              maxLength="500"
              onChange={(e) => setFormState({ ...formState, text_cotas_double: e.target.value })} 
              value={formState.text_cotas_double || ''}
            />
          </label>
        </>
      )}
      {/* Somente no EDITAR sorteio */}

      <label id="promotion_title">
        Título Cotas Premiadas
        <input
          type="text"
          name="title_cotas_awarded"
          onChange={(e) => setFormState({ ...formState, title_cotas_awarded: e.target.value })} 
          value={formState.title_cotas_awarded || ''}

          maxLength="50"
        />
      </label>

      <label id="promotion_description">
        Descrição Cotas Premiadas
        <input
          type="text"
          name="description_cotas_awarded"
          onChange={(e) => setFormState({ ...formState, description_cotas_awarded: e.target.value })} 
          value={formState.description_cotas_awarded || ''}
          maxLength="500"
        />
      </label>

      <label id="upsell_title">
        Título Upsell (Checkout)
        <input
          type="text"
          name="title_upsell"
          onChange={(e) => setFormState({ ...formState, title_upsell: e.target.value })} 
          value={formState.title_upsell || ''}
          
          maxLength="50"
        />
      </label>

      <label id="upsell_description">
        Descrição Upsell (Checkout)
        <input
          type="text"
          name="description_upsell"
          onChange={(e) => setFormState({ ...formState, description_upsell: e.target.value })} 
          value={formState.description_upsell || ''}

          maxLength="500"
        />
      </label>
    </div>
  );
}

