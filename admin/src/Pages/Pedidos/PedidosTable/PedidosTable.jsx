/* eslint-disable react/prop-types */
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { stateOpenModalVerCota, statePedidosInfoModal, statePedidosInfo } from "../../../common/states/atom";
import { deleteDados } from "../../../common/http/http";
import useFormattedDate from "../../../common/states/Hook/useFormattedDate";
import useCurrencyFormatTable from "../../../common/states/Hook/useCurrencyFormatTable/useCurrencyFormatTable";

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
    text-transform: uppercase;
  }

  .status-pago {
    background-color: #28a745;
  }

  .status-cancelado {
    background-color: #dc3545;
  }

  .button-divergente {
    background-color: #0d6efd;
  }

  .button-dashboard {
    background-color: #1cc88a;
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
  const setPedidosInfoModal = useSetRecoilState(statePedidosInfoModal);
  const pedidosInfo =  useRecoilValue(statePedidosInfo);
  const { formattedDate } = useFormattedDate();
  const { formatCurrency } = useCurrencyFormatTable();

  const formatPhoneNumber = (number) => {
    if (!number) return '';
    // Remove tudo que não é número
    const cleanedNumber = number.replace(/\D/g, '');
  
    // Adiciona o código do país (ex: 55 para Brasil)
    return `55${cleanedNumber}`;
  };

  const handleButtonId = async (item) => {
    setOpenModalVerCota(!openModalVerCota)

    // const response = await fetchDados(`admin/dashboard/pacote/${id}`);
    setPedidosInfoModal(item);
  }

  const handleDeletar = async (idPedido) => {
    // const response = await deleteDados(`admin/dashboard/bilhete-premiado/delete/${idPedido}/${id}`, userLogin);
    // setTabelaCotasInfo(response.data);
  }

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
          {pedidosInfo.map(item => (
            <tr key={item.id} className="raffle-item">
              <td>#{item.id}</td>
              <td>{item.pix_id}</td>
              <td>
                <a href={`https://api.whatsapp.com/send?phone=${formatPhoneNumber(item?.client?.cellphone)}`} target="_blank">{item?.client?.name} {item?.client?.surname}</a>
                <a id="whplnk" href={`https://api.whatsapp.com/send?phone=${formatPhoneNumber(item?.client?.cellphone)}`} target="_blank">&nbsp;
                  &nbsp;<i className="fa-brands fa-whatsapp"></i>
                </a>
              </td>
              <td>{item?.rifa?.title}</td>
              <td>{item?.qntd_number}</td>
              <td>{formatCurrency(item?.value)}</td>
              <td>{formattedDate(item.created_at)}</td>
              <td>{formattedDate(item.updated_at)}</td>
              <td>
                <span 
                  // className={`status-tag status-${item.status.toLowerCase()}`}
                  className={`status-tag ${
                    item.status === '1' ? 'status-pago' :
                    item.status === 'divergente' ? 'status-cancelado' :
                    item.status === '0' ? 'button-divergente' :
                    item.status === '2' ? 'button-dashboard' :
                    ''
                  }`}
                >
                  {item.status}
                </span>
              </td>
              <td>
                <div className="button-group">
                  <button className="button-view" onClick={() => handleButtonId(item)}>
                    <i className="fas fa-eye"></i> VER
                  </button>
                  <a href={item.cancelUrl} className="button-delete" onClick={() => handleDeletar(item.id)}>
                    <i className="fas fa-ban"></i> Cancelar
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
