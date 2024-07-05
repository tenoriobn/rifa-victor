export default function Promocoes() {
  return (
    <div className="category">
      <h3>PROMOÇÕES</h3>

      <label id="promotion_title">
          Titulo Cotas Premiadas
          <input type="text" name="promotion_title" maxLength="50" />
      </label>

      <label id="promotion_description">
          Descrição Cotas Premiadas
          <input type="text" name="promotion_description" maxLength="500" />
      </label>

      <label id="upsell_title">
          Titulo Upsell (Checkout)
          <input type="text" name="upsell_title" maxLength="50" />
      </label>

      <label id="upsell_description">
          Descrição Upsell (Checkout)
          <input type="text" name="upsell_description" maxLength="500" />
      </label>
    </div>
  )
}
