import { useState, useEffect } from 'react';

const useCurrencyInput = (initialValue = '', onChangeCallback) => {
    const formatCurrency = (value) => {
    if (!value) return 'R$ 0,00';

    // Convert the value to float and format
    const amount = parseFloat(value) / 100;
    return amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };
  const [value, setValue] = useState(formatCurrency(initialValue));

  useEffect(() => {
    setValue(formatCurrency(initialValue));
  }, [initialValue]);

  const handleChange = (event) => {
    const inputValue = event.target.value;

    // Remove non-numeric characters
    const numericValue = inputValue.replace(/[^\d]/g, '');

    // Format with currency symbol and commas
    const formattedValue = formatCurrency(numericValue);

    console.log('numericValue', inputValue)

    setValue(formattedValue);

    // Callback para atualizar o estado fora do hook, se fornecido
    if (onChangeCallback) {
      onChangeCallback(numericValue); // Envia o valor numérico para o callback
    }
  };

  const handleBlur = () => {
    // Limpar o valor se estiver vazio ou apenas com zeros
    if (value === 'R$ 0,00' || value === '0' || value === '') {
      setValue('');
    }
  };

  return {
    value: value || 'R$ 0,00', // Garante que o valor inicial seja 'R$ 0,00' se estiver vazio
    handleChange,
    handleBlur,
  };
};

export default useCurrencyInput;
