import { useState } from 'react';

const ReverseCurrencyInput = () => {
  const [value, setValue] = useState('0,00');

  const handleChange = (e) => {
    let input = e.target.value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
    input = input.padStart(3, '0'); // Garante pelo menos três dígitos
    const integerPart = input.slice(0, -2);
    const decimalPart = input.slice(-2);
    const formatted = `${parseInt(integerPart, 10).toLocaleString('pt-BR')},${decimalPart}`;
    setValue(formatted);
  };

  const handleBlur = () => {
    if (value === '0,00') setValue('0,00'); // Reseta para '0,00' se o valor estiver vazio
  };

  return (
    <input 
      type="text" 
      value={value} 
      onChange={handleChange} 
      onBlur={handleBlur} 
      placeholder="0,00" 
    />
  );
};

export default ReverseCurrencyInput;
