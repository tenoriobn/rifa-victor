/* eslint-disable react/prop-types */
import { useRecoilState } from "recoil";
import styled from "styled-components"
import { stateOpenModalEditarUsuario } from "../../../../common/states/atom";

const Table = styled.table`
  width: 100%;
  font-size: .9rem;
  font-weight: 500;
  margin: 4.5rem 0 1.5rem 0;
  border-collapse: separate;
  border-spacing: 0 1em;

  tr {
    border: 0;
    margin: .3125rem;
  }

  th {
    text-align: center;
    padding-bottom: 1.25rem;
  }

  td {
    text-align: center;
    padding: .9375rem .625rem;
    background-color: #2e2e36;
    vertical-align: middle;
  }

  td:first-child {
    border-top-left-radius: .3125rem;
    border-bottom-left-radius: .3125rem;
    background-size: cover;
  }

  td:last-child {
    border-top-right-radius: .3125rem;
    border-bottom-right-radius: .3125rem;
  }

  .status-tag {
    padding: .3125rem .625rem;
    border-radius: .3125rem;
    color: white;
    font-weight: bold;
    text-align: center;
    display: inline-block;
    text-transform: uppercase;
  }

  .button-group {
    display: flex;
    gap: .3125rem;
    justify-content: center;
    align-items: center;
  }

  .status-rescued {
    background-color: #6f42c1;
  }

  .button-edit {
    background-color: #f4b400;
    color: white;
    border: none;
    border-radius: .3125rem;
    padding: .625rem .9375rem;
    cursor: pointer;
  }
  
  .button-delete {
    background-color: #e74a3b;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 10px 15px;
    cursor: pointer;
  }

  .button-group a, .button-group button {
    transition: all .3s ease-in-out;
  }

  .button-group a:hover, .button-group button:hover {
    opacity: .8;
  }

  @media (max-width: 1366px) {
    overflow-x: auto;
    white-space: nowrap;
    display: block;
  }
`;

export default function UsuariosTable() {
  const [openModalEditarUsuario, setOpenModalEditarUsuario] = useRecoilState(stateOpenModalEditarUsuario);
  
  return (
    <div className="">
      <Table>
        <thead>
          <tr>
            <th>Nome</th>
            <th align="center">Telefone</th>
            <th align="center">Email</th>
            <th align="center">Perfil</th>
            <th align="center">Criado em</th>
            <th align="center">Ações</th>
          </tr>
        </thead>

        <tbody>
        <tr className="raffle-item">
          <td>Ana Lima</td>
          <td align="center">(43) 99640-3859</td>
          <td align="center">anaplima2001@gmail.com</td>
          <td align="center">
            <span className="status-tag status-rescued">Administrador</span>                            </td>
          <td align="center">15/04/24 15:02</td>
          <td align="center">
            <div className="button-group">
              <a className="button-edit" onClick={() => setOpenModalEditarUsuario(!openModalEditarUsuario)}>
                <i className="fas fa-edit"></i> Editar
              </a>
              <a href="#" 
                className="button-delete"
              >
                <i className="fas fa-trash-alt"></i> Excluir
              </a>
            </div>
          </td>
        </tr>

        <tr className="raffle-item">
          <td>Ana Lima</td>
          <td align="center">(43) 99640-3859</td>
          <td align="center">anaplima2001@gmail.com</td>
          <td align="center">
            <span className="status-tag status-rescued">Usuário</span>                            </td>
          <td align="center">15/04/24 15:02</td>
          <td align="center">
            <div className="button-group">
              <a className="button-edit" onClick={() => setOpenModalEditarUsuario(!openModalEditarUsuario)}>
                <i className="fas fa-edit"></i> Editar
              </a>
              <a href="#" 
                className="button-delete"
              >
                <i className="fas fa-trash-alt"></i> Excluir
              </a>
            </div>
          </td>
        </tr>

        <tr className="raffle-item">
          <td>Ana Lima</td>
          <td align="center">(43) 99640-3859</td>
          <td align="center">anaplima2001@gmail.com</td>
          <td align="center">
            <span className="status-tag status-rescued">Suporte</span>                            </td>
          <td align="center">15/04/24 15:02</td>
          <td align="center">
            <div className="button-group">
              <a className="button-edit" onClick={() => setOpenModalEditarUsuario(!openModalEditarUsuario)}>
                <i className="fas fa-edit"></i> Editar
              </a>
              <a href="#" 
                className="button-delete"
              >
                <i className="fas fa-trash-alt"></i> Excluir
              </a>
            </div>
          </td>
        </tr>

        <tr className="raffle-item">
          <td>Ana Lima</td>
          <td align="center">(43) 99640-3859</td>
          <td align="center">anaplima2001@gmail.com</td>
          <td align="center">
            <span className="status-tag status-rescued">Super Adminsitrador</span>                            </td>
          <td align="center">15/04/24 15:02</td>
          <td align="center">
            <div className="button-group">
              <a className="button-edit" onClick={() => setOpenModalEditarUsuario(!openModalEditarUsuario)}>
                <i className="fas fa-edit"></i> Editar
              </a>
              <a href="#" 
                className="button-delete"
              >
                <i className="fas fa-trash-alt"></i> Excluir
              </a>
            </div>
          </td>
        </tr>
        </tbody>
      </Table>
    </div>
  )
}
