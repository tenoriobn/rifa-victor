import { useMemo } from "react";

export default function useFormatarUsuario(usuario) {
  const formatarNome = (nome) => {
    if (!nome) return "";
    return nome.charAt(0).toUpperCase() + nome.slice(1);
  };

  const primeiraLetraMaiuscula = (nome) => {
    if (!nome) return "";
    return nome.charAt(0).toUpperCase();
  };

  const nomeFormatado = useMemo(() => formatarNome(usuario?.name), [usuario]);
  const inicialNome = useMemo(() => primeiraLetraMaiuscula(usuario?.name), [usuario]);

  return { nomeFormatado, inicialNome };
}
