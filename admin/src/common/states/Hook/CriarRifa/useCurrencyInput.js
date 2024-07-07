import { useState } from 'react';

const useCurrencyInput = (initialValue = '', onChangeCallback) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (event) => {
    const inputValue = event.target.value;

    // Remove non-numeric characters
    const numericValue = inputValue.replace(/[^\d]/g, '');

    // Format with currency symbol and commas
    const formattedValue = formatCurrency(numericValue);

    setValue(formattedValue);

    // Callback para atualizar o estado fora do hook, se fornecido
    if (onChangeCallback) {
      onChangeCallback(formattedValue);
    }
  };

  const handleBlur = () => {
    // Limpar o valor se estiver vazio ou apenas com zeros
    if (value === 'R$ 0,00' || value === '0' || value === '') {
      setValue('');
    }
  };

  const formatCurrency = (value) => {
    if (!value) return 'R$ 0,00';

    // Format with currency symbol and decimals
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
