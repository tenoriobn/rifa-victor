import { useState, useEffect } from 'react';

const usePercentageInput = (initialValue = '', onChangeCallback) => {
  const [value, setValue] = useState(initialValue);
  
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const handleChange = (event) => {
    if (!event || !event.target || !event.target.value) {
      setValue('0,00%');
      if (onChangeCallback) {
        onChangeCallback('0,00%');
      }
      return;
    }

    let inputValue = event.target.value;

    if (event.nativeEvent.inputType === 'deleteContentBackward') {
      // Handle backspace
      if (inputValue.endsWith('%')) {
        inputValue = inputValue.slice(0, -1); // Remove temporarily the '%' to handle backspace
      }
      inputValue = inputValue.slice(0, -1); // Remove the character before '%'
      inputValue += '%'; // Add '%' back
    }

    // Remove non-numeric characters except the last percent sign (%) and commas
    const numericValue = inputValue.replace(/[^\d,.%]/g, '');

    // Format with percentage symbol and commas
    const formattedValue = formatPercentage(numericValue);

    setValue(formattedValue);

    // Callback para atualizar o estado fora do hook, se fornecido
    if (onChangeCallback) {
      onChangeCallback(formattedValue);
    }
  };

  const formatPercentage = (value) => {
    if (!value) return '0,00%';

    // Remove any existing percent sign (%) before formatting
    const amount = parseFloat(value.replace(/%/g, '').replace(/\D/g, '')) / 100;
    const formatted = amount.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + '%';

    return formatted;
  };

  return {
    value: value || '0,00%', // Garante que o valor inicial seja '0,00%' se estiver vazio
    handleChange,
  };
};

export default usePercentageInput;
