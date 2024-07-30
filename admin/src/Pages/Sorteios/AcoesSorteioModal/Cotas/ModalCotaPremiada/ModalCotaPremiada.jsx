import styled from "styled-components"
import { stateIdModal } from "../../../../../common/states/atom";
import { useRecoilValue } from "recoil";
import useFormattedDate from "../../../../../common/states/Hook/useFormattedDate";

const Table = styled.table`
  border-collapse: separate;
  border-spacing: 0 1em;
  width: 100%;
  font-size: .9rem;
  box-sizing: border-box;

  tr {
    border: 0;
    margin: 5px;
  }

  b {
    font-weight: 600;
  } 
  
  td {
      padding: 2px 8px;
      border-bottom: 1px solid #444;
      text-transform: uppercase;
  }

  .status-tag {
    padding: 5px 10px;
    border-radius: 5px;
    color: white;
    font-weight: bold;
    text-align: center;
    display: inline-block;
    box-sizing: border-box;
    text-transform: uppercase;
  }

  .status-rescued {
    background-color: #6f42c1;
  }
`;

export default function ModalCotaPremiada() {
  const modalInfo = useRecoilValue(stateIdModal);
  const { formattedDate } = useFormattedDate();

  console.log('modalInfo', modalInfo)

  return (
    <Table>
      <tbody>
        <tr>
          <td align="center" colSpan="2"><br/><b>COTA</b></td>
        </tr>
        <tr>
          <td width="30%"><b>ID:</b></td>
          <td width="70%"><p name="cotaID" id="cotaID">{modalInfo.client_id}</p></td>
        </tr>
        <tr>
          <td><b>Numero:</b></td>
          <td><p name="cotaNumero" id="cotaNumero">{modalInfo.number_cota}</p></td>
        </tr>
        <tr>
          <td><b>Status:</b></td>
          <td><span name="cotaSt" id="cotaSt" className="status-tag status-rescued">{modalInfo.status}</span></td>
        </tr>
        <tr>
          <td><b>Resgatada em:</b></td>
          <td><span name="cotaUpdate" id="cotaUpdate">{formattedDate(modalInfo.created_at)}</span></td>
        </tr>
        <tr>
          <td align="center" colSpan="2"><br/><b>CLIENTE</b></td>
        </tr>
        <tr>
          <td><b>Nome:</b></td>
          <td><p name="cotaCustomer" id="cotaCustomer">{modalInfo.client.name} {modalInfo.client.surname}</p></td>
        </tr>
        <tr>
          <td><b>Telefone:</b></td>
          <td><a id="whplnk" href="https://wa.me/5543991040203" target="_blank"><i className="fa-brands fa-whatsapp"></i></a> <span name="cotaCustomerPhone" id="cotaCustomerPhone">{modalInfo.client.cellphone}</span></td>
        </tr>
        <tr>
            <td align="center" colSpan="2"><br/><b>PEDIDO</b></td>
        </tr>
        <tr>
          <td><b>Data:</b></td>
          <td><p name="cotaPedidoData" id="cotaPedidoData">{modalInfo.rifa_pay.created_at}</p></td>
          {/* <td><p name="cotaPedidoData" id="cotaPedidoData"></p></td> */}
        </tr>
        <tr>
          <td><b>Pago em:</b></td>
          <td><p name="cotaPedidoPaid" id="cotaPedidoPaid">{modalInfo.rifa_pay.updated_at}</p></td>
          {/* <td><p name="cotaPedidoPaid" id="cotaPedidoPaid"></p></td> */}
        </tr>
        <tr>
          <td><b>Total:</b></td>
          <td><p name="cotaPedidoPrice" id="cotaPedidoPrice">{modalInfo.rifa_pay.value}</p></td>
          {/* <td><p name="cotaPedidoPrice" id="cotaPedidoPrice"></p></td> */}
        </tr>
        <tr>
          <td><b>Quantidade:</b></td>
          <td><p name="cotaPedidoQuantidade" id="cotaPedidoQuantidade">{modalInfo.rifa_pay.qntd_number}</p></td>
          <td><p name="cotaPedidoQuantidade" id="cotaPedidoQuantidade"></p></td>
        </tr>
      </tbody>
    </Table>
  )
}
