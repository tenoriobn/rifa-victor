/* eslint-disable react/prop-types */
import useFormState from "../../../../common/states/Hook/CriarRifa/CriarRifa";
import useCurrencyInput from "../../../../common/states/Hook/CriarRifa/useCurrencyInput";
import useThousandSeparator from "../../../../common/states/Hook/CriarRifa/useThousandSeparator";

export default function Cotas({ mostrarCampo, mostrarQtdNumeros }) {
  const { formState, handleChange: handleChangeFormState } = useFormState();
  
  const updateFormState = (name, formattedValue) => {
    handleChangeFormState({
      target: {
        name,
        value: formattedValue,
      }
    });
  };

  const { value: qntdCota, handleChange: handleQntdCotaChange } = useThousandSeparator(
    formState.qntd_cota,
    (formattedValue) => updateFormState('qntd_cota', formattedValue)
  );

  const { value: qntdCotaMinOrder, handleChange: handleQntdCotaMinOrderChange } = useThousandSeparator(
    formState.qntd_cota_min_order,
    (formattedValue) => updateFormState('qntd_cota_min_order', formattedValue)
  );

  const { value: qntdCotaMaxOrder, handleChange: handleQntdCotaMaxOrderChange } = useThousandSeparator(
    formState.qntd_cota_max_order,
    (formattedValue) => updateFormState('qntd_cota_max_order', formattedValue)
  );

  const { value: qntdCotaMaxClient, handleChange: handleQntdCotaMaxClientChange } = useThousandSeparator(
    formState.qntd_cota_max_client,
    (formattedValue) => updateFormState('qntd_cota_max_client', formattedValue)
  );

  const { value: qtdDigitCotas, handleChange: handleQtdDigitCotas } = useThousandSeparator(
    formState.qtd_digit_cotas,
    (formattedValue) => updateFormState('qtd_digit_cotas', formattedValue)
  );

  const handleChangePrice = (formattedValue) => {
    updateFormState('price', formattedValue);
  };

  const { value: formattedPrice, handleChange: handlePriceChange, handleBlur: handlePriceBlur } = useCurrencyInput(formState.price, handleChangePrice);

  return (
    <div className="category">
      <h3>Cotas</h3>

      <label htmlFor="number_of_numbers">
        {mostrarCampo ? 'Qtd de números' : 'Qtd de números'}  
        <input
          className="qtd"
          id="number_of_numbers"
          value={qntdCota}
          onChange={handleQntdCotaChange}
          name="qntd_cota"
          maxLength="10"
          // disabled={mostrarQtdNumeros}
          required
        />
      </label>


        {/* Somente no editar sorteio */}
        {mostrarCampo && (
          <>
            <label htmlFor="number_of_numbers">
              Qtd de digitos das cotas
              <input id="digits" name="qtd_digit_cotas" maxLength="1" 
                value={qtdDigitCotas}
                onChange={handleQtdDigitCotas}
              />
            </label>
          </>
        )}
        {/* Somente no editar sorteio */}



      <label htmlFor="price">
        Valor unitário R$
        <input
          maxLength="22"
          id="price"
          value={formattedPrice}
          onChange={handlePriceChange}
          onBlur={handlePriceBlur}
          name="price"
          className="money"
          required
        />
      </label>

      <label htmlFor="">
          Qtd cotas mínima por pedido
          <input
            className="qtd_max"
            value={qntdCotaMinOrder}
            onChange={handleQntdCotaMinOrderChange}
            name="qntd_cota_min_order"
            minLength="1"
            maxLength="6"
          />
      </label>

      <label htmlFor="">
          Qtd cotas máxima por Pedido
          <input
            className="qtd_max"
            name="qntd_cota_max_order"
            value={qntdCotaMaxOrder}
            onChange={handleQntdCotaMaxOrderChange}
            id="qntd_cota_max_order"
            maxLength="6"
            minLength="1"
          />
      </label>

      <label htmlFor="">
          Qtd cotas máxima por cliente
          <input
            className="qtd"
            name="qntd_cota_max_client"
            value={qntdCotaMaxClient}
            onChange={handleQntdCotaMaxClientChange}
            maxLength="10"
            minLength="1"
          />
      </label>
    </div>
  );
}
