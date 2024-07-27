// import useFormState from '../../../../common/states/Hook/CriarRifa/CriarRifa';
// import usePercentageInput from '../../../../common/states/Hook/CriarRifa/usePercentageMask';
import { useRecoilState } from "recoil";
import { stateInfoRifaForm } from '../../../../common/states/atom';
import { NumericFormat } from 'react-number-format';

export default function DataPagamento() {
  const [formStateUm, setFormState] = useRecoilState(stateInfoRifaForm);
  // const { formState, handleChange: handleChangeFormState } = useFormState();

  // const updateFormState = (name, formattedValue) => {
  //   handleChangeFormState({
  //     target: {
  //       name,
  //       value: formattedValue,
  //     }
  //   });
  // };

  // const { value: formattedServiceCharge, handleChange: handleServiceChargeChange } = usePercentageInput(
  //   formState.service_charge, (formattedValue) => updateFormState('service_charge', formattedValue)
  // );

  return (
    <div className="category">
      <h3>DATAS E PAGAMENTO</h3>

      <label>
        Data do sorteio (Opcional)
        <input
          type="datetime-local"
          name="data_sortition"
          onChange={(e) => setFormState({ ...formStateUm, data_sortition: e.target.value })} 
          value={formStateUm.data_sortition || ''}
        />
      </label>

      <label>
        Início Venda (Opcional)
        <input
          type="datetime-local"
          name="initial_sale"
          onChange={(e) => setFormState({ ...formStateUm, initial_sale: e.target.value })} 
          value={formStateUm.initial_sale || ''}
        />
      </label>

      <label>
        Fim Venda (Opcional)
        <input
          type="datetime-local"
          name="end_sale"
          onChange={(e) => setFormState({ ...formStateUm, end_sale: e.target.value })} 
          value={formStateUm.end_sale || ''}
        />
      </label>

      <label htmlFor="expires_time">
        Tempo Pagto (Minutos)
        <input
          type="number"
          className="expires_time"
          name="time_pay"
          onChange={(e) => setFormState({ ...formStateUm, rifa_payment: {...formStateUm?.rifa_payment, time_pay: e.target.value} })} 
          value={formStateUm?.rifa_payment?.time_pay || ''}

          required
        />
      </label>

      <label htmlFor='gateway'>
        Gateway de pagamento
        <select
          id="gateway"
          name="gateway"
          onChange={(e) => setFormState({ ...formStateUm, rifa_payment: {...formStateUm?.rifa_payment , gateway: e.target.value} })} 
          value={formStateUm?.rifa_payment?.gateway || 'mercadopago'}

          required
        >
          <option value="mercadopago">MercadoPago</option>
        </select>
      </label>

      <label htmlFor="tax">
        Taxa de Serviço
        <NumericFormat
          type="text"
          className="tax"
          name="service_charge"
          id="tax"
          suffix="%"
          decimalSeparator=","
          thousandSeparator="."
          fixedDecimalScale
          allowNegative={false}
          onValueChange={(values) => setFormState((prevPacote) => ({...prevPacote, rifa_payment: {...prevPacote?.rifa_payment, service_charge: values.floatValue} }))}
          value={formStateUm?.rifa_payment?.service_charge || ''}
        />
      </label>

      <label htmlFor="text_service_charge">
        Texto Taxa de Serviço
        <input
          type="text"
          name="text_service_charge"
          maxLength="20"
          // onChange={(e) => setFormState({ ...formStateUm, text_service_charge: e.target.value })} 
          value={formStateUm?.rifa_payment?.text_service_charge || ''}

          onChange={(e) => setFormState({ ...formStateUm, rifa_payment: {...formStateUm?.rifa_payment, text_service_charge : e.target.value} })} 
        />
      </label>
    </div>
  );
}
