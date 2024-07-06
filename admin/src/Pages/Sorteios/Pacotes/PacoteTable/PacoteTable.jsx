/* eslint-disable react/prop-types */
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { stateOpenModalEditarPacote } from "../../../../common/states/atom";

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
    border-spacing: 0 1em;
  }

  th {
    text-align: center;
    padding-bottom: 1.25rem;
    font-weight: 500;
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
    padding: .3125rem .625rem;
    border-radius: .3125rem;
    color: white;
    font-weight: bold;
    text-align: center;
    display: inline-block;
  }
  .status-inconsistente {
    background-color: #17a2b8;
  }

  .status-cancelado {
    background-color: #dc3545;
  }

  .button-group {
    display: flex;
    gap: .3125rem;
    justify-content: center;
    align-items: center;
  }

  .button-edit {
    background-color: #f4b400;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 10px 15px;
    cursor: pointer;
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

export default function PacoteTable() {
  const [openModalEditarPacote, setOpenModalEditarPacote] = useRecoilState(stateOpenModalEditarPacote);

  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>ID</th>
            <th>Quantidade</th>
            <th>$ Total</th>
            <th>$ Cota</th>
            <th>Popular</th>
            <th>Cod. Promocional</th>
            <th>Faturado</th>
            <th>Státus</th>
            <th>Criado em</th>
            <th>Alterado em</th>
            <th>Ações</th>
        </tr>
        </thead>

        <tbody>
          <tr className="raffle-item">
            <td align="center">#1</td>
            <td align="center">344</td>
            <td align="center">52</td>
            <td align="center">R$ 15,08</td>
            <td align="center">R$ 0,29</td>
            <td align="center"><span className="status-tag status-inconsistente">NÃO</span></td>
            <td align="center"></td>
            <td align="center">R$&nbsp;0,00</td>
            <td align="center"><span className="status-tag status-cancelado">Finalizado</span></td>
            <td align="center">15/04 16:08</td>
            <td align="center">16/04 09:54</td>
            <td align="center">
              <div className="button-group">
                <a className="button-edit" onClick={() => setOpenModalEditarPacote(!openModalEditarPacote)}>
                  <i className="fas fa-edit"></i> Editar
                </a>
              </div>
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  )
}
