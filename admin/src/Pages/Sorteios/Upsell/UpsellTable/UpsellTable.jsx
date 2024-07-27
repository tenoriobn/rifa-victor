/* eslint-disable react/prop-types */
import styled from "styled-components";
import { stateOpenModalEditarUpsell, stateUpsellInfo, stateUpsellInfoTable } from "../../../../common/states/atom";
import { useRecoilState, useRecoilValue } from "recoil";
import useFormattedDate from "../../../../common/states/Hook/useFormattedDate";
import useCurrencyFormatTable from "../../../../common/states/Hook/useCurrencyFormatTable/useCurrencyFormatTable";

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
  const upsellInfoTable = useRecoilValue(stateUpsellInfoTable);
  const [upsellInfo, setUpsellInfo] = useRecoilState(stateUpsellInfo)
  const { formattedDate } = useFormattedDate();
  const { formatCurrency } = useCurrencyFormatTable();

  const handleModalInfo = (upsell) => {
    setUpsellInfo(upsell)
    setOpenModalEditarUpsell(!openModalEditarUpsell)
  }

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
            <th>Status</th>
            <th>Criado em</th>
            <th>Alterado em</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {upsellInfoTable && upsellInfoTable.length > 0 && (
            upsellInfoTable.map((item, index) => (
              <tr key={index} className="raffle-item">
                <td>#{index + 1}</td>
                <td>{item.id}</td>
                <td>{item.qntd_cota}</td>
                <td>{formatCurrency(item.price_total)}</td>
                <td>{formatCurrency(item.price_cota)}</td>
                <td>{item.qntd_min}</td>
                <td>{item.qntd_max}</td>
                <td>
                  <span 
                    className={`status-tag ${item.localizacao === "paid" ? 'status-pago' : item.localizacao === "checkout" ? 'status-rescued' : ''}`}
                  >
                    {
                      item.localizacao === "paid" ? "Após Pagto" 
                      : item.localizacao === "checkout" 
                      ? "No checkout" : ""
                    }
                  </span>
                </td>
                <td><span className={`status-tag ${item.status === 'ativo' ? 'status-available' : 'status-reserved'}`}>{item.status}</span></td>
                <td>{formattedDate(item.created_at)}</td>
                <td>{formattedDate(item.updated_at)}</td>
                <td>
                  <div className="button-group">
                    <a className="button-edit" onClick={() => handleModalInfo(item)}>
                      <i className="fas fa-edit"></i> Editar
                    </a>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </div>
  )
}
