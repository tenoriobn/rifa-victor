import useFormState from '../../../../common/states/Hook/CriarRifa/CriarRifa';
import usePercentageInput from '../../../../common/states/Hook/CriarRifa/usePercentageMask';

export default function DataPagamento() {
  const { formState, handleChange: handleChangeFormState } = useFormState();

  const updateFormState = (name, formattedValue) => {
    handleChangeFormState({
      target: {
        name,
        value: formattedValue,
      }
    });
  };

  const { value: formattedServiceCharge, handleChange: handleServiceChargeChange } = usePercentageInput(
    formState.service_charge,
    (formattedValue) => updateFormState('service_charge', formattedValue)
  );

  return (
    <div className="category">
      <h3>DATAS E PAGAMENTO</h3>

      <label>
        Data do sorteio (Opcional)
        <input
          type="datetime-local"
          name="data_sortition"
          value={formState.data_sortition}
          onChange={handleChangeFormState}
        />
      </label>

      <label>
        Início Venda (Opcional)
        <input
          type="datetime-local"
          name="initial_sale"
          value={formState.initial_sale}
          onChange={handleChangeFormState}
        />
      </label>

      <label>
        Fim Venda (Opcional)
        <input
          type="datetime-local"
          name="end_sale"
          value={formState.end_sale}
          onChange={handleChangeFormState}
        />
      </label>

      <label htmlFor="expires_time">
        Tempo Pagto (Minutos)
        <input
          type="number"
          className="expires_time"
          name="time_pay"
          value={formState.time_pay}
          onChange={handleChangeFormState}
          required
        />
      </label>

      <label htmlFor='gateway'>
        Gateway de pagamento
        <select
          id="gateway"
          name="gateway"
          value={formState.gateway}
          onChange={handleChangeFormState}
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
          value={formattedServiceCharge}
          onChange={handleServiceChargeChange}
        />
      </label>

      <label htmlFor="text_service_charge">
        Texto Taxa de Serviço
        <input
          type="text"
          name="text_service_charge"
          maxLength="20"
          value={formState.text_service_charge}
          onChange={handleChangeFormState}
        />
      </label>
    </div>
  );
}
