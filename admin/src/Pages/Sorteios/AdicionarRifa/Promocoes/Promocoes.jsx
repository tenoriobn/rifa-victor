/* eslint-disable react/prop-types */
import useFormState from "../../../../common/states/Hook/CriarRifa/CriarRifa";

export default function Promocoes({ mostrarCampo }) {
  const { formState, handleChange } = useFormState();

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
              name="double_quota" 
              required
              value={formState.double_quota}
              onChange={handleChange}
            >
              <option value="sim">SIM</option>
              <option value="nao" selected>NAO</option>
            </select>
          </label>
    
          <label id="double_quota_text">
            Texto Cotas Dobradas
            <input 
              type="text" 
              name="double_quota_text" 
              maxLength="500"
              value={formState.double_quota_text}
              onChange={handleChange}
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
          value={formState.title_cotas_awarded}
          onChange={handleChange}
          maxLength="50"
        />
      </label>

      <label id="promotion_description">
        Descrição Cotas Premiadas
        <input
          type="text"
          name="description_cotas_awarded"
          value={formState.description_cotas_awarded}
          onChange={handleChange}
          maxLength="500"
        />
      </label>

      <label id="upsell_title">
        Título Upsell (Checkout)
        <input
          type="text"
          name="title_upsell"
          value={formState.title_upsell}
          onChange={handleChange}
          maxLength="50"
        />
      </label>

      <label id="upsell_description">
        Descrição Upsell (Checkout)
        <input
          type="text"
          name="description_upsell"
          value={formState.description_upsell}
          onChange={handleChange}
          maxLength="500"
        />
      </label>
    </div>
  );
}

