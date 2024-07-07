/* eslint-disable react/prop-types */
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { stateOpenModalVerCota } from "../../../common/states/atom";

export const Table = styled.table`
  width: 100%;
  font-size: .9rem;
  font-weight: 400;
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

  .status-tag {
    padding: 5px 10px;
    border-radius: 5px;
    color: white;
    font-weight: bold;
    text-align: center;
    display: inline-block;
  }

  .status-pago {
    background-color: #28a745;
  }

  .status-cancelado {
    background-color: #dc3545;
  }

  .button-group {
    display: flex;
    gap: 5px;
    justify-content: center;
    align-items: center;
  }

  .button-view {
    background-color: #4e73df;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 10px 15px;
    cursor: pointer;
    height: 52px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 2px;
  }

  .button-delete {
    background-color: #e74a3b;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 10px 15px;
    cursor: pointer;
    box-sizing: border-box;
    height: 52px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 2px;
  }

  .action-button:hover {
    opacity: .8;
  }

  @media (max-width: 1366px) {
    overflow-x: auto;
    white-space: nowrap;
    display: block;
  }
`;

export default function PedidosTable() {
  const [openModalVerCota, setOpenModalVerCota] = useRecoilState(stateOpenModalVerCota);

  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th></th>
            <th><b>ID</b></th>
            <th><b>Cliente</b></th>
            <th><b>Sorteio</b></th>
            <th><b>Cotas</b></th>
            <th><b>Total</b></th>
            <th><b>Data</b></th>
            <th><b>Pagto</b></th>
            <th><b>Status</b></th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          <tr className="raffle-item">
            <td>#1</td>
            <td>2386050</td>
            <td>
              <a href="#">Vanessa Aparecida dos Santos de Souza </a>
              <a id="whplnk" href="https://api.whatsapp.com/send?phone=5543988066387" target="_blank">
                <i className="fa-brands fa-whatsapp"></i>
              </a>
            </td>
            <td>SAVEIRO CROSS DOS SONHOS</td>
            <td>70</td>
            <td> R$ 7,00</td>
            <td> 07/07 16:50</td>
            <td> 07/07 16:52</td>
            <td> <span className="status-tag status-pago">Aprovado</span></td>
            <td>
              <div className="button-group">
                <button className="button-view" onClick={() => setOpenModalVerCota(!openModalVerCota)}>
                  <i className="fas fa-eye"></i> VER
                </button>
                <a href="http://localhost/dashboard/pedidos/cancelar/2386050" className="button-delete">
                  <i className="fas fa-ban"></i> Cancelar
                </a>
              </div>
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  )
}
