import { useState, useEffect } from 'react';
import { statePacote } from '../atom';
import { useSetRecoilState } from 'recoil';

const useCurrencyInput = (initialValue = '', onChangeCallback) => {
  const [value, setValue] = useState(initialValue);
  const setPacote = useSetRecoilState(statePacote)

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const handleChange = (event) => {
    const inputValue = event.target.value;
    const numericValue = inputValue.replace(/[^\d]/g, '');
    const formattedValue = formatCurrency(numericValue);
    setValue(formattedValue);

    //Atualiza o Estado no formato número
    const numberValue = Number(formattedValue.replace('R$', '').trim().replace(',', '.'));
    setPacote((prevPacote) => ({...prevPacote, value_cota: numberValue}))

    console.log(formattedValue)
    if (onChangeCallback) {
      onChangeCallback(formattedValue);
    }
  };

  const handleBlur = () => {
    if (value === 'R$ 0,00' || value === '0' || value === '') {
      setValue('');
    }
  };

  //Lembrar que aqui Formata com símbolo de moeda e decimais
  const formatCurrency = (value) => {
    if (!value) return 'R$ 0,00';
    const amount = parseFloat(value.replace(/\D/g, '')) / 100;
    const formatted = amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    return formatted;
  };

  return {
    value: value || 'R$ 0,00', // Garante que o valor inicial seja 'R$ 0,00' se estiver vazio
    handleChange,
    handleBlur,
  };
};

export default useCurrencyInput;
