/* eslint-disable react/prop-types */
import styled from "styled-components";
import { stateOpenModalEditarUpsell } from "../../../../common/states/atom";
import { useRecoilState } from "recoil";

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

  .button-edit {
    background-color: #f4b400;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 10px 15px;
    cursor: pointer;
  }

  .action-button:hover {
    opacity: .8;
  }

  .button-view {
    background-color: #4e73df;
  }

  .status-pago {
    background-color: #28a745;
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

export default function UpsellTable() {
  const [openModalEditarUpsell, setOpenModalEditarUpsell] = useRecoilState(stateOpenModalEditarUpsell);

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
            <th>Qtd. Min.</th>
            <th>Qtd. Máx.</th>
            <th>Localização</th>
            <th>Státus</th>
            <th>Criado em</th>
            <th>Alterado em</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
        <tr className="raffle-item">
          <td>#1</td>
          <td>148</td>
          <td>100</td>
          <td>R$ 25,00</td>
          <td>R$ 0,25</td>
          <td>30</td>
          <td>300</td>
          <td><span className="status-tag status-rescued">Após Pagto</span></td>
          <td><span className="status-tag status-pago">Ativo</span></td>
          <td>15/04/24 16:07</td>
          <td>21/04/24 16:18</td>
          <td>
            <div className="button-group">
              <a className="button-edit" onClick={() => setOpenModalEditarUpsell(!openModalEditarUpsell)}>
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
