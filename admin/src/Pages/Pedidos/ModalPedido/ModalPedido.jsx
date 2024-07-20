import styled from "styled-components"
// import { useRecoilValue } from "recoil";
// import { statePedidosInfoModal } from "../../../common/states/atom";

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
  }

  .numbers .number {
    background: #034b2a;
    padding: 5px;
    border-radius: 5px;
    margin-right: 10px;
    margin-bottom: 10px;
    min-width: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .numbers {
    display: flex;
    flex-wrap: wrap;
  }

  #pedidoNumeros {
    max-height: 150px;
    overflow-y: auto;
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
`;

export default function ModalCotaPremiada() {
  // const pedidosInfoModal = useRecoilValue(statePedidosInfoModal);

  const pedidosInfoModal = {
    id: "2386050",
    data: "07/07 16:50",
    cliente: "Vanessa Aparecida dos Santos de Souza",
    gatewayPagamento: "mercadopago",
    transacao: "82285938684",
    sorteio: "SAVEIRO CROSS DOS SONHOS",
    quantidade: 70,
    total: "R$ 7,00",
    dataPagamento: "07/07 16:52",
    cotas: [
      "261288", "113772", "421120", "611708",
      "261288", "113772", "421120", "611708"
    ],
    status: "aprovado"
  };

  return (
    <Table>
      <tbody>
        <tr>
          <td id="itens-titulo"><b>ID</b></td>
          <td><p name="pedidoID" id="pedidoID">{pedidosInfoModal.id}</p></td>
        </tr>
        <tr>
          <td id="itens-titulo"><b>Data</b></td>
          <td><p name="pedidoData" id="pedidoData">{pedidosInfoModal.data}</p></td>
        </tr>
        <tr>
          <td id="itens-titulo"><b>Cliente</b></td>
          <td><p name="pedidoCustomer" id="pedidoCustomer">{pedidosInfoModal.cliente}</p></td>
        </tr>
        {pedidosInfoModal.status.toLowerCase() === "aprovado" &&
          <>
            <tr>
              <td><b>Gateway Pagamento</b></td>
              <td><p name="pedidoGateway" id="pedidoGateway">{pedidosInfoModal.gatewayPagamento}</p></td>
            </tr>

            <tr>
              <td><b>Transação</b></td>
              <td><p name="pedidoPaymentReference" id="pedidoPaymentReference">{pedidosInfoModal.transacao}</p></td>
            </tr>
          </>
        }
        <tr>
          <td><b>Sorteio</b></td>
          <td><p name="pedidoSorteio" id="pedidoSorteio">{pedidosInfoModal.sorteio}</p></td>
        </tr>
        <tr>
          <td><b>Quantidade</b></td>
          <td><p name="pedidoQuantidade" id="pedidoQuantidade">{pedidosInfoModal.quantidade}</p></td>
        </tr>
        <tr>
          <td><b>Total</b></td>
          <td><p name="pedidoPrice" id="pedidoPrice">{pedidosInfoModal.total}</p></td>
        </tr>
        {pedidosInfoModal.status.toLowerCase() === "aprovado" &&
            <>
            <tr>
              <td><b>Data Pagamento</b></td>
              <td><p name="pedidoPagto" id="pedidoPagto">{pedidosInfoModal.dataPagamento}</p></td>
            </tr>

            <tr>
              <td id="itens-titulo"><b>Cotas</b></td>
              <td id="pedidoNumeros" className="numbers">
                {pedidosInfoModal.cotas.map((cota, index) => (
                  <div key={index} className="number">{cota}</div>
                ))}
              </td>
            </tr>
          </>
        }
        <tr>
          <td><b>Status</b></td>
          <td>
            <span 
              name="pedidoStatus" 
              id="pedidoStatus" 
              className={`status-tag ${
                pedidosInfoModal.status === 'aprovado' ? 'status-pago' :
                pedidosInfoModal.status === 'divergente' ? 'button-dashboard' :
                pedidosInfoModal.status === 'pendente' ? 'button-divergente' :
                pedidosInfoModal.status === 'cancelado' ? 'status-cancelado' :
                ''
              }`}
            >
              {pedidosInfoModal.status}
            </span>
          </td>
        </tr>
      </tbody>
    </Table>
  )
}
