/* eslint-disable react/prop-types */
import styled from "styled-components"
import { stateEditarUsuario, stateOpenModalEditarUsuario, stateUserLogin } from "../../../../../common/states/atom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { putDados } from "../../../../../common/http/http";
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

export default function ModalEditarUsuario({setAtualizaTabela}) {
  const [editarUsuario, setEditarUsuario] = useRecoilState(stateEditarUsuario);
  const setOpenModalEditarUsuario = useSetRecoilState(stateOpenModalEditarUsuario);
  const userLogin = useSetRecoilState(stateUserLogin);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await putDados(`admin/dashboard/usuarios/editar`, editarUsuario, userLogin);
      setOpenModalEditarUsuario(false);
      setAtualizaTabela(true);

    } catch (error) {
      console.error("Erro ao enviar dados:", error);
    }
  };

  return (
    <Form action="" id="frmAddPack" method="POST" onSubmit={handleSubmit}>
      <label htmlFor="name">
        Nome
        <input
          type="text"
          name="name"
          value={editarUsuario.name || ''}
          onChange={(e) => setEditarUsuario({ ...editarUsuario, name: e.target.value })} 
          required
        />
      </label>

      <label htmlFor="phone">
        Telefone
        <PatternFormat
          format="(##) #####-####"
          type="text"
          id="phone"
          name="phone"
          value={editarUsuario.cellphone || ''}
          onChange={(e) => setEditarUsuario({ ...editarUsuario, cellphone: e.target.value })} 
          required
        />
      </label>

      <label htmlFor="email">
        E-Mail
        <input
          type="text"
          name="email"
          value={editarUsuario.email || ''}
          onChange={(e) => setEditarUsuario({ ...editarUsuario, email : e.target.value })} 
          required
        />
      </label>

      <label htmlFor="password">
        Senha
        <input
          type="password"
          name="password"
          minLength="8"
          maxLength="20"
          value={editarUsuario.password || ''}
          onChange={(e) => setEditarUsuario({ ...editarUsuario, password: e.target.value })} 
        />
      </label>

      <label htmlFor="access_level">
        Perfil de acesso
        <select
          name="access_level"
          id="access_level"
          value={editarUsuario.role || ''}
          onChange={(e) => setEditarUsuario({ ...editarUsuario, role: e.target.value })} 
        >
          <option value="admin">Administrador</option>
          <option value="user">Usuário</option>
          <option value="support">Suporte</option>
          <option value="superadmin">Super Administrador</option>
        </select>
      </label>

      <input id="sendEditPack" type="submit" value="Atualizar" />
    </Form>
  );
}