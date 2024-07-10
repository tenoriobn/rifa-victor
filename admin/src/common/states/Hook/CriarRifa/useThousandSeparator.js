import { useState, useEffect } from 'react';

const useCurrencyInput = (initialValue, onChangeCallback) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const handleChange = (event) => {
    const inputValue = event.target.value;

    const numericValue = inputValue.replace(/[^\d]/g, '');
    const formattedValue = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    setValue(formattedValue);
    if (onChangeCallback) {
      onChangeCallback(formattedValue);
    }
  };

  const handleBlur = () => {
  };

  return {
    value,
    handleChange,
    handleBlur,
  };
};

export default useCurrencyInput;
