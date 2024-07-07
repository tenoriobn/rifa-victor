import useFormState from '../../../../common/states/Hook/CriarRifa/CriarRifa';

export default function DataPagamento() {
  const { formState, handleChange } = useFormState();

  return (
    <div className="category">
      <h3>DATAS E PAGAMENTO</h3>

      <label>
        Data do sorteio (Opcional)
        <input
          type="datetime-local"
          name="data_sortition"
          value={formState.data_sortition || ''}
          onChange={handleChange}
        />
      </label>

      <label>
        Início Venda (Opcional)
        <input
          type="datetime-local"
          name="initial_sale"
          value={formState.initial_sale || ''}
          onChange={handleChange}
        />
      </label>

      <label>
        Fim Venda (Opcional)
        <input
          type="datetime-local"
          name="end_sale"
          value={formState.end_sale || ''}
          onChange={handleChange}
        />
      </label>

      <label htmlFor="expires_time">
        Tempo Pagto (Minutos)
        <input
          type="number"
          className="expires_time"
          name="time_pay"
          value={formState.time_pay || '30'}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Gateway de pagamento
        <select
          name="gateway"
          value={formState.gateway || 'mercadopago'}
          onChange={handleChange}
          required
        >
          <option value="mercadopago">MercadoPago</option>
        </select>
      </label>

      <label htmlFor="tax">
        Taxa de Serviço
        <input
          type="text"
          className="tax"
          name="service_charge"
          id="tax"
          value={formState.service_charge || '0,00%'}
          onChange={handleChange}
        />
      </label>

      <label htmlFor="text_service_charge">
        Texto Taxa de Serviço
        <input
          type="text"
          name="text_service_charge"
          maxLength="20"
          value={formState.text_service_charge || ''}
          onChange={handleChange}
        />
      </label>
    </div>
  );
}
