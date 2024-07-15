const useCurrencyFormatTable = () => {
  const formatCurrency = (value) => {
    if (!value && value !== 0) return "";

    return Number(value).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  return { formatCurrency };
};

export default useCurrencyFormatTable;
