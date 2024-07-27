/* eslint-disable react/prop-types */
import useFormState from "../../../../common/states/Hook/CriarRifa/CriarRifa";
import useCurrencyInput from "../../../../common/states/Hook/CriarRifa/useCurrencyInput";
// import useThousandSeparator from "../../../../common/states/Hook/CriarRifa/useThousandSeparator";
import { stateInfoRifaForm } from "../../../../common/states/atom";
import { useRecoilState } from "recoil";
import { NumericFormat } from "react-number-format";

export default function Cotas({ mostrarCampo }) {
  const { formState, handleChange: handleChangeFormState } = useFormState();
  const [formStateUm, setFormState] = useRecoilState(stateInfoRifaForm);

  console.log(formState)
  
  const updateFormState = (name, formattedValue) => {
    handleChangeFormState({
      target: {
        name,
        value: formattedValue,
      }
    });
  };

  // const { value: qntdCota, handleChange: handleQntdCotaChange } = useThousandSeparator(
  //   formState.qntd_cota,
  //   (formattedValue) => updateFormState('qntd_cota', formattedValue)
  // );

  // const { value: qntdCotaMinOrder, handleChange: handleQntdCotaMinOrderChange } = useThousandSeparator(
  //   formState.qntd_cota_min_order,
  //   (formattedValue) => updateFormState('qntd_cota_min_order', formattedValue)
  // );

  // const { value: qntdCotaMaxOrder, handleChange: handleQntdCotaMaxOrderChange } = useThousandSeparator(
  //   formState.qntd_cota_max_order,
  //   (formattedValue) => updateFormState('qntd_cota_max_order', formattedValue)
  // );

  // const { value: qntdCotaMaxClient, handleChange: handleQntdCotaMaxClientChange } = useThousandSeparator(
  //   formState.qntd_cota_max_client,
  //   (formattedValue) => updateFormState('qntd_cota_max_client', formattedValue)
  // );

  // const { value: qtdDigitCotas, handleChange: handleQtdDigitCotas } = useThousandSeparator(
  //   formState.qtd_digit_cotas,
  //   (formattedValue) => updateFormState('qtd_digit_cotas', formattedValue)
  // );

  const handleChangePrice = (formattedValue) => {
    updateFormState('price', formattedValue);
  };

  const { value: formattedPrice, handleChange: handlePriceChange, handleBlur: handlePriceBlur } = useCurrencyInput(formState.price, handleChangePrice);

  return (
    <div className="category">
      <h3>Cotas</h3>

      <label htmlFor="number_of_numbers">
        {mostrarCampo ? 'Qtd de números' : 'Qtd de números'}  

        <NumericFormat
          className="qtd"
          id="number_of_numbers"
          value={formStateUm.qntd_cota || ""}
          onValueChange={(values) => setFormState((prevPacote) => ({...prevPacote, qntd_cota: values.floatValue }))}
          name="qntd_cota"
          maxLength="20"
          decimalScale={2}
          fixedDecimalScale={false}
          thousandSeparator="."
          decimalSeparator=","
          allowNegative={false}
          required
        />
      </label>

        {/* Somente no editar sorteio */}
        {/* {mostrarCampo && (
          <>
            <label htmlFor="number_of_numbers"> */}
              {/* Qtd de digitos das cotas */}
              {/* <input id="digits" name="qtd_digit_cotas" maxLength="1" 
                value={qtdDigitCotas}
                onChange={handleQtdDigitCotas}
              /> */}

              {/* <NumericFormat
                className="qtd_max"
                name="qtd_digit_cotas"
                id="qtd_digit_cotas"
                value={formStateUm.qtd_digit_cotas || ""}
                onValueChange={(values) => setFormState((prevPacote) => ({...prevPacote, qtd_digit_cotas: values.floatValue }))}
                minLength="1"
                maxLength="6"
                decimalScale={2}
                fixedDecimalScale={false}
                thousandSeparator="."
                decimalSeparator=","
                allowNegative={false}
                required
              />  

            </label>
          </>
        )} */}
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
          <NumericFormat
            className="qtd_max"
            name="qntd_cota_min_order"
            id="qntd_cota_min_order"
            value={formStateUm.qntd_cota_min_order || ""}
            onValueChange={(values) => setFormState((prevPacote) => ({...prevPacote, qntd_cota_min_order: values.floatValue }))}
            minLength="1"
            maxLength="6"
            decimalScale={2}
            fixedDecimalScale={false}
            thousandSeparator="."
            decimalSeparator=","
            allowNegative={false}
            required
          />  
      </label>

      <label htmlFor="">
          Qtd cotas máxima por Pedido
          <NumericFormat
            className="qtd_max"
            name="qntd_cota_max_order"
            id="qntd_cota_max_order"
            value={formStateUm.qntd_cota_max_order || ""}
            onValueChange={(values) => setFormState((prevPacote) => ({...prevPacote, qntd_cota_max_order: values.floatValue }))}
            maxLength="6"
            minLength="1"
            decimalScale={2}
            fixedDecimalScale={false}
            thousandSeparator="."
            decimalSeparator=","
            allowNegative={false}
            required
          />
      </label>

      <label htmlFor="">
          Qtd cotas máxima por cliente
          <NumericFormat
            className="qtd_max"
            name="qntd_cota_max_client"
            id="qntd_cota_max_client"
            value={formStateUm.qntd_cota_max_client || ""}
            onValueChange={(values) => setFormState((prevPacote) => ({...prevPacote, qntd_cota_max_client: values.floatValue }))}
            maxLength="10"
            minLength="1"
            decimalScale={2}
            fixedDecimalScale={false}
            thousandSeparator="."
            decimalSeparator=","
            allowNegative={false}
            required
          />
      </label>
    </div>
  );
}
