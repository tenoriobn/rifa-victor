import { useEffect } from 'react';
import { estadoFormularioPreenchido } from '../../atom';
import { useSetRecoilState } from 'recoil';
import useFormatadorTelefone from './useFormatadorTelefone';

const useValidarFormulario = (nome, sobrenome) => {
  const { telefone, formatarTelefone } = useFormatadorTelefone();
  const setCamposPreenchidos = useSetRecoilState(estadoFormularioPreenchido);

  useEffect(() => {
    const isValid = nome.trim() !== "" && sobrenome.trim() !== "" && telefone.trim() !== "";
    setCamposPreenchidos(isValid);
  }, [nome, sobrenome, telefone, setCamposPreenchidos]);

  return {
    telefone,
    formatarTelefone
  };
};

export default useValidarFormulario;
