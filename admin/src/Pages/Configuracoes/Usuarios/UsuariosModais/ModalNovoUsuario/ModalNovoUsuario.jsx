import styled from "styled-components"

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
    background: #41414b;
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
  return (
    <Form action="" id="frmAddPack" method="POST">
      <label htmlFor="">
        Nome
        <input type="text" name="name" required />
      </label>

      <label htmlFor="">
        Telefone
        <input type="text" id="phone" name="phone" maxLength="15" required="" />
      </label>
      <label htmlFor="">
        E-Mail
        <input type="text" name="email" required="" />
      </label>

      <label htmlFor="">
        Senha
        <input type="password" name="password" minLength="8" maxLength="20" required />
      </label>

      <label htmlFor="">
        Perfil de acesso
        <select name="access_level" id="access_level">
          <option value="admin">Administrador</option>
          <option value="user">Usuário</option>
          <option value="support">Suporte</option>
          <option value="superadmin">Super Administrador</option>
        </select>
      </label>

      <input id="sendEditPack" type="submit" value="Adicionar" />
    </Form>
  )
}
