import { useState } from "react";

const useFormatadorTelefone = () => {
  const [telefone, setTelefone] = useState("");

  const formatarTelefone = (evento) => {
    let valor = evento.target.value.replace(/\D/g, ""); // Remove tudo que não é dígito
    valor = valor.slice(0, 11); // Limita a 11 dígitos

    let valorFormatado;
    
    if (valor.length <= 10) {
      valorFormatado = valor
        .replace(/^(\d{2})(\d)/g, "($1) $2") // Formata o DDD
        .replace(/(\d{4})(\d)/, "$1-$2"); // Formata o telefone fixo
    } else {
      valorFormatado = valor
        .replace(/^(\d{2})(\d)/g, "($1) $2") // Formata o DDD
        .replace(/(\d{5})(\d)/, "$1-$2"); // Formata o celular
    }

    setTelefone(valorFormatado);
  };

  return {
    telefone,
    formatarTelefone,
  };
};

export default useFormatadorTelefone;
