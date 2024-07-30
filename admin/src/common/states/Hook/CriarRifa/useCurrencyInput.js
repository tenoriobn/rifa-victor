import { useState, useEffect } from 'react';

const useCurrencyInput = (initialValue = '', onChangeCallback) => {
  // Função para formatar o valor como moeda
  const formatCurrency = (value) => {
    if (value === '' || isNaN(value)) return 'R$ 0,00';

    // Converte o valor para float e formata
    const amount = parseFloat(value);
    return amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  // Função para extrair valor numérico do input
  const parseValue = (value) => {
    // Remove caracteres não numéricos e converte para float
    return parseFloat(value.replace(/[^\d]/g, '')) / 100 || 0;
  };

  const [value, setValue] = useState(formatCurrency(initialValue));

  useEffect(() => {
    setValue(formatCurrency(initialValue));
  }, [initialValue]);

  const handleChange = (event) => {
    const inputValue = event.target.value;

    // Remove caracteres não numéricos e calcula o valor numérico
    const numericValue = parseValue(inputValue);

    // Atualiza o estado com o valor numérico
    setValue(formatCurrency(numericValue * 100));

    // Callback para atualizar o estado fora do hook, se fornecido
    if (onChangeCallback) {
      onChangeCallback(numericValue); // Envia o valor numérico para o callback
    }
  };

  const handleBlur = () => {
    // Limpar o valor se estiver vazio ou apenas com zeros
    if (value === 'R$ 0,00' || value === '') {
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
