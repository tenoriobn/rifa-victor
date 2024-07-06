export default function Cotas() {
  return (
    <div className="category">
      <h3>Cotas</h3>

      <label htmlFor="number_of_numbers">
          Qtd de números
          <input className="qtd" id="number_of_numbers" name="number_of_numbers" maxLength="10" required />
      </label>

      <label htmlFor="price">
          Valor unitário R$
          <input maxLength="22" id="price" name="price" className="money" required />
      </label>

      <label htmlFor="">
          Qtd cotas máxima por Pedido
          <input className="qtd_max" name="max_amount" id="max_amount" maxLength="6" minLength="1" defaultValue="1.000" />
      </label>

      <label htmlFor="">
          Qtd cotas máxima por cliente
          <input className="qtd" name="max_amount_person" maxLength="10"  minLength="1" defaultValue="20.000" />
      </label>
    </div>
  )
}
