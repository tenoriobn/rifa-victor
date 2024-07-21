import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components"
import { stateNovoUsuario, stateOpenModalAdicionarUsuario, stateUserLogin, stateUsuarioInfoTable } from "../../../../../common/states/atom";
import { postDados } from "../../../../../common/http/http";
import { PatternFormat } from "react-number-format";

const Form = styled.form`
  font-size: .9rem;
  width: 100%;

  label {
    display: block;
  }

  input {
    display: block;
    margin-bottom: 10px;
    width: 100%;
    height: 40px;
    border-radius: 5px;
    background: #41414b;
    border: none;
    outline: 0;
    margin-top: 10px;
    padding: 10px 5px;
    color: #fff;
    box-sizing: border-box;
  }

  select {
    display: block;
    margin-bottom: 10px;
    width: 100%;
    height: 40px;
    border-radius: 5px;
    background-color: #41414b;
    border: none;
    outline: 0;
    margin-top: 10px;
    padding: 10px 5px;
    color: #fff;
  }

  input[type=submit] {
    background-color: #07b353;
    color: #fff;
    font-weight: 700;
    width: 100%;
    height: 40px;
    border-radius: 5px;
    outline: 0;
    border: none;
    cursor: pointer;
    margin-top: 20px;
    transition: all .3s ease-in-out;
  }

  input[type=submit]:hover {
    opacity: .8;
  }
`;

export default function ModalNovoUsuario() {
  const setOpenModalAdicionarUsuario = useSetRecoilState(stateOpenModalAdicionarUsuario);
  const [novoUsuario, setNovoUsuario] = useRecoilState(stateNovoUsuario);
  const userLogin = useRecoilValue(stateUserLogin);
  const setUsuarioInfoTable = useSetRecoilState(stateUsuarioInfoTable);

  console.log(novoUsuario)
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await postDados('/admin/dashboard/pacote/cadastrar', novoUsuario, userLogin);
      console.log('aqui dentro', response)
      setUsuarioInfoTable(response.data)
      setOpenModalAdicionarUsuario(false)
      
    } catch (error) {
      console.error('Erro ao fazer POST:', error);
    }
  };

  return (
    <Form action="" id="frmAddPack" method="POST" onSubmit={handleSubmit}>
      <label htmlFor="name">
        Nome
        <input type="text" name="name" required 
          value={novoUsuario.name || ''} 
          onChange={(e) => setNovoUsuario({ ...novoUsuario, name: e.target.value })} 
        />
      </label>

      <label htmlFor="phone">
        Telefone
        <PatternFormat
          format="(##) #####-####"
          type="text"
          id="phone"
          name="phone"
          value={novoUsuario.cell_phone  || ''} 
          onChange={(e) => setNovoUsuario({ ...novoUsuario, cell_phone: e.target.value })} 
          required
        />
      </label>

      <label htmlFor="email">
        E-Mail
        <input type="text" name="email" required
          value={novoUsuario.email  || ''}  
          onChange={(e) => setNovoUsuario({ ...novoUsuario, email: e.target.value })} 
        />
      </label>

      <label htmlFor="password">
        Senha
        <input
          type="password"
          name="password"
          minLength="8"
          maxLength="20"
          value={novoUsuario.senha  || ''} 
          onChange={(e) => setNovoUsuario({ ...novoUsuario, senha: e.target.value })} 
          required
        />
      </label>

      <label htmlFor="access_level">
        Perfil de acesso
        <select name="access_level" id="access_level"
          value={novoUsuario.status  || ''} 
          onChange={(e) => setNovoUsuario({ ...novoUsuario, status: e.target.value })} 
          required
        >
          <option value="">Selecione</option>
          <option value="admin">Administrador</option>
          <option value="user">Usuário</option>
          <option value="support">Suporte</option>
          <option value="superadmin">Super Administrador</option>
        </select>
      </label>

      <input id="sendEditPack" type="submit" value="Adicionar" />
    </Form>
  );
}
