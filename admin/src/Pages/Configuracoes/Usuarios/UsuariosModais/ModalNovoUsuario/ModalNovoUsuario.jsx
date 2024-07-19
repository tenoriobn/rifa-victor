import { useRecoilState } from "recoil";
import styled from "styled-components"
import { stateNovoUsuario } from "../../../../../common/states/atom";

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
  const [novoUsuario, setNovoUsuario] = useRecoilState(stateNovoUsuario);


  // Função para atualizar o estado do formulário ao digitar nos inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNovoUsuario((prevFormState) => ({
      ...prevFormState,
      [name]: value,
    }));
  };

  // Função para lidar com o envio do formulário
  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui você pode enviar os dados para o backend, utilizar o novoUsuario
    // Lógica para enviar para o backend aqui
  };

  return (
    <Form action="" id="frmAddPack" method="POST" onSubmit={handleSubmit}>
      <label htmlFor="name">
        Nome
        <input type="text" name="name" onChange={handleChange} required />
      </label>

      <label htmlFor="phone">
        Telefone
        <input
          type="text"
          id="phone"
          name="phone"
          maxLength="15"
          onChange={handleChange}
          required
        />
      </label>

      <label htmlFor="email">
        E-Mail
        <input type="text" name="email" onChange={handleChange} required />
      </label>

      <label htmlFor="password">
        Senha
        <input
          type="password"
          name="password"
          minLength="8"
          maxLength="20"
          onChange={handleChange}
          required
        />
      </label>

      <label htmlFor="access_level">
        Perfil de acesso
        <select name="access_level" id="access_level" onChange={handleChange}>
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
