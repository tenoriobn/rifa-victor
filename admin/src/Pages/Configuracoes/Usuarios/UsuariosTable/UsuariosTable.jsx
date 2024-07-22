/* eslint-disable react/prop-types */
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components"
import { stateEditarUsuario, stateOpenModalEditarUsuario, stateUsuarioInfoTable } from "../../../../common/states/atom";

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
    text-transform: uppercase;
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

  .status-pago {
    background-color: #28a745;
  }

  .status-rescued {
    background-color: #6f42c1;
  }

  
  .button-divergente {
    background-color: #0d6efd;
  }

  .button-dashboard {
    background-color: #1cc88a;
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
  const novoUsuarioInfoTable = useRecoilValue(stateUsuarioInfoTable);
  const setEditarUsuario  = useSetRecoilState(stateEditarUsuario);

  //   {
  //     name: "Ana Lima",
  //     phone: "(43) 99640-3859",
  //     email: "anaplima2001@gmail.com",
  //     status: "administrador",
  //     date: "15/04/24 15:02"
  //   },
  //   {
  //     name: "Ana Lima",
  //     phone: "(43) 99640-3859",
  //     email: "anaplima2001@gmail.com",
  //     status: "usuario",
  //     date: "15/04/24 15:02"
  //   },
  //   {
  //     name: "Ana Lima",
  //     phone: "(43) 99640-3859",
  //     email: "anaplima2001@gmail.com",
  //     status: "suporte",
  //     date: "15/04/24 15:02"
  //   },
  //   {
  //     name: "Ana Lima",
  //     phone: "(43) 99640-3859",
  //     email: "anaplima2001@gmail.com",
  //     status: "superadmin",
  //     date: "15/04/24 15:02"
  //   }
  // ];
  
  const handleModalId = (cliente) => {
    setEditarUsuario(cliente);
    setOpenModalEditarUsuario(!openModalEditarUsuario)
  }
  
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
          {novoUsuarioInfoTable.map((item, index) => (
            <tr key={index} className="raffle-item">
              <td>{item.name}</td>
              <td align="center">{item.phone}</td>
              <td align="center">{item.email}</td>
              <td align="center">
                <span 
                  className={`status-tag ${
                    item.status === 'admin' ? 'status-pago' :
                    item.status === 'user' ? 'status-rescued' :
                    item.status === 'support' ? 'button-dashboard' :
                    item.status === 'superadmin' ? 'button-divergente' :
                    ''
                  }`}
                >
                  {/* {item.status} */}

                  {
                    item.status === 'admin' ? 'ADMINISTRADOR' :
                    item.status === 'user' ? 'USUÁRIO' :
                    item.status === 'support' ? 'SUPORTE' :
                    item.status === 'superadmin' ? 'SUPER ADMINISTRADOR' :
                    ''
                  }
                </span>
              </td>
              <td align="center">{item.date}</td>
              <td align="center">
                <div className="button-group">
                  <a
                    className="button-edit"
                    onClick={() => handleModalId(item)}
                  >
                    <i className="fas fa-edit"></i> Editar
                  </a>
                  <a href="#" className="button-delete">
                    <i className="fas fa-trash-alt"></i> Excluir
                  </a>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}
