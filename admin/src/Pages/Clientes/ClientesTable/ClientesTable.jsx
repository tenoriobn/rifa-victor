/* eslint-disable react/prop-types */
import { useRecoilState, useSetRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { stateClientesInfo, stateOpenModalEditarInfoCliente, stateOpenModalVerInfoCliente, stateClienteInfoModal } from "../../../common/states/atom";

export const Table = styled.table`
  width: 100%;
  font-size: .9rem;
  font-weight: 500;
  margin: 4.5rem 0 1.5rem 0;
  border-collapse: separate;
  border-spacing: 0 1em;

  tr {
    border: 0;
    margin: .3125rem;
    border-spacing: 0 1em;
  }

  th {
    text-align: center;
    padding-bottom: 1.25rem;
    font-weight: bold;
  }

  .spacing {
    width: 100px;
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

  .status-rescued {
    background-color: #6f42c1;
}

  .status-tag {
    padding: 5px 10px;
    border-radius: 5px;
    color: white;
    font-weight: bold;
    text-align: center;
    display: inline-block;
    text-transform: uppercase;
  }

  .status-rescued {
    background-color: #6f42c1;
  }

  .status-reserved {
    background-color: #dc3545;
  }

  .status-available {
    background-color: #28a745;
  }

  .button-group {
    display: flex;
    gap: 5px;
    justify-content: center;
    align-items: center;
  }

  .action-button {
    border: none;
    border-radius: .3125rem;
    padding: .625rem .9375rem;
    cursor: pointer;
    color: white;
    transition: all .3s ease-in-out;
  }

  .action-button:hover {
    opacity: .8;
  }

  .button-view {
    background-color: #4e73df;
  }

  .button-edit {
    background-color: #f4b400;
}

  @media (max-width: 1366px) {
    overflow-x: auto;
    white-space: nowrap;
    display: block;
  }
`;

export default function ClientesTable() {
  const [openModalVerInfoCliente, setOpenModalVerInfoCliente] = useRecoilState(stateOpenModalVerInfoCliente);
  const [openModalEditarInfoCliente, setOpenModalEditarInfoCliente] = useRecoilState(stateOpenModalEditarInfoCliente);
  const clientesInfo = useRecoilValue(stateClientesInfo);
  const setClienteInfoModal = useSetRecoilState(stateClienteInfoModal);

  console.log(clientesInfo)

  const handleButtonId = async (cliente) => {
    setOpenModalVerInfoCliente(!openModalVerInfoCliente)
    setClienteInfoModal(cliente);
  }

  const handleModalId = (cliente) => {
    setClienteInfoModal(cliente);
    setOpenModalEditarInfoCliente(!openModalEditarInfoCliente)
  }

  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Nome</th>
            <th>Telefone</th>
            {/* <th>Cadastrado</th> */}
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {clientesInfo.map((cliente, index) => (
            <tr key={index} className="raffle-item">
              <td>#{cliente.id}</td>
              <td>{cliente?.name} {cliente?.surname}</td>
              <td>{cliente.cellphone}</td>
              {/* <td>
                <span 
                  className={`status-tag ${
                    cliente.status === 'sim' ? 'status-available' :
                    cliente.status === 'nao' ? 'status-reserved' :
                    ''
                  }`}
                >
                  {cliente.status}
                </span>
              </td> */}
              <td>
                <div className="button-group">
                  <button 
                    className="action-button button-view" 
                    onClick={() => handleButtonId(cliente)}
                  >
                    <i className="fas fa-eye"></i> VER
                  </button>
                  <button className="action-button button-edit" onClick={() => handleModalId(cliente)}>
                    <i className="fas fa-edit"></i> Editar
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}
