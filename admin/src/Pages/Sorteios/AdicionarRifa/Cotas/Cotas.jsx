import useFormState from "../../../../common/states/Hook/CriarRifa/CriarRifa";

export default function Cotas() {
  const { formState, handleChange } = useFormState();

  return (
    <div className="category">
      <h3>Cotas</h3>

      <label htmlFor="number_of_numbers">
          Qtd de números
          <input className="qtd" id="number_of_numbers" value={formState.qntd_cota || ''} onChange={handleChange} name="qntd_cota" maxLength="10" required />
      </label>

      <label htmlFor="price">
          Valor unitário R$
          <input maxLength="22" id="price" value={formState.price || ''} onChange={handleChange} name="price" className="money" required />
      </label>

      <label htmlFor="">
          Qtd cotas minima por pedido
          <input className="qtd_max" value={formState.qntd_cota_min_order || 1} onChange={handleChange} name="qntd_cota_min_order" minLength="1" maxLength="6" />
      </label>

      <label htmlFor="">
          Qtd cotas máxima por Pedido
          <input className="qtd_max" name="qntd_cota_max_order" value={formState.qntd_cota_max_order || ''} onChange={handleChange} id="qntd_cota_max_order" maxLength="6" minLength="1" defaultValue="1.000" />
      </label>

      <label htmlFor="">
          Qtd cotas máxima por cliente
          <input className="qtd" name="qntd_cota_max_client" value={formState.qntd_cota_max_client || ''} onChange={handleChange} maxLength="10"  minLength="1" defaultValue="20.000" />
      </label>
    </div>
  )
}
