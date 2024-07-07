import { useState } from 'react';

const useThousandSeparator = (initialValue = '', onChangeCallback) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (event) => {
    const inputValue = event.target.value;

    const numericValue = inputValue.replace(/[^\d]/g, '');
    const formattedValue = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    // Atualiza o estado apenas se o valor formatado mudar
    if (formattedValue !== value) {
      setValue(formattedValue);
      if (onChangeCallback) {
        onChangeCallback(formattedValue);
      }
    }
  };

  return {
    value,
    handleChange,
  };
};

export default useThousandSeparator;
