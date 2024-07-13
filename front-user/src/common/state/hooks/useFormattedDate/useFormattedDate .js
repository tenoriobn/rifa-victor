import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const useFormattedDate = () => {
  const formattedDate = (dateString) => {
    if (!dateString) return "";

    const date = new Date(dateString);
    return format(date, "dd/MM/yyyy, HH:mm", { locale: ptBR });
  };

  return { formattedDate };
};

export default useFormattedDate;
