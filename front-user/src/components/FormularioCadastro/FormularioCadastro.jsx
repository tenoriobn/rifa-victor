import { useState, useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import useValidarFormulario from '../../common/state/hooks/FormularioCadastro/useValidarFormulario';
import { estadoErroCadastro, estadoFinalizarPedido } from '../../common/state/atom';
import { postDados } from '../../common/http/http';
import useLogin from '../../common/state/hooks/FormulariosAcesso/useLogarUsuario';
import { motion } from 'framer-motion';
import { transicaoAnimada } from '../../common/util/transicaoAnimada';

export default function FormularioCadastro() {
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const { telefone, formatarTelefone } = useValidarFormulario(nome, sobrenome);
  const login = useLogin();
  const [finalizarPedido, setFinalizarPedido] = useRecoilState(estadoFinalizarPedido);
  const setErroCadastro = useSetRecoilState(estadoErroCadastro);

  const cadastrarUsuario = async (dadosUsuario) => {
    try {
      const dadosParaEnviar = {
        name: dadosUsuario.name,
        surname: dadosUsuario.surname,
        cellphone: dadosUsuario.cellphone,
      };

      await postDados('client/cadastro', dadosParaEnviar);

      await login(dadosParaEnviar.cellphone);

      setErroCadastro(false);

    } catch (error) {
      setFinalizarPedido(false);
      setErroCadastro(true);
      console.error('Erro no cadastro:', error.response || error.message || error);
    }
  };

  useEffect(() => {
    if (finalizarPedido) {
      cadastrarUsuario({
        name: nome,
        surname: sobrenome,
        cellphone: telefone,
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finalizarPedido, nome, sobrenome, telefone]);

  const animacao = transicaoAnimada();

  return (
    <motion.form className="space-y-4" action="" {...animacao}>
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="w-full">
          <label htmlFor="name" className="block mb-1 text-sm font-medium text-neutral-900">
            Nome
          </label>
          <input 
            type="text" 
            name="name" 
            id="name" 
            className="border text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full px-2 py-1 bg-gray-100 border-gray-500 placeholder-gray-400 text-neutral-900" 
            placeholder="Nome" 
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required=""
          />
        </div>

        <div className="w-full">
          <label htmlFor="sobrenome" className="block mb-1 text-sm font-medium text-neutral-900">
            Sobrenome
          </label>
          <input 
            type="text" 
            name="surname" 
            id="sobrenome" 
            className="border text-sm rounded focus:ring-blue-500 focus:border-blue-500 w-full block px-2 py-1 bg-gray-100 border-gray-500 placeholder-gray-400 text-neutral-900" 
            placeholder="Sobrenome" 
            value={sobrenome}
            onChange={(e) => setSobrenome(e.target.value)}
            required=""
          />
        </div>
      </div>

      <div>
        <label htmlFor="phone" className="block mb-1 text-sm font-medium text-neutral-900">
          Seu telefone
        </label>
        <input 
          id="phone" 
          className="border text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full px-2 py-1 bg-gray-100 border-gray-500 placeholder-gray-400 text-neutral-900" 
          placeholder="N. Telefone" 
          name="cellphone"
          value={telefone}
          onChange={formatarTelefone}
          required="" 
        />
      </div>
    </motion.form>
  );
}
