import useFormState from "../../../../common/states/Hook/CriarRifa/CriarRifa";

export default function Promocoes() {
  const { formState, handleChange } = useFormState();

  return (
    <div className="category">
      <h3>PROMOÇÕES</h3>

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

