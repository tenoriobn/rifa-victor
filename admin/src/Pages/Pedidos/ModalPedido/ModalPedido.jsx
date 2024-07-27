import styled from "styled-components"
import { statePedidosInfoModal } from "../../../common/states/atom";
import { useRecoilValue } from "recoil";
import useFormattedDate from "../../../common/states/Hook/useFormattedDate";
import useCurrencyFormatTable from "../../../common/states/Hook/useCurrencyFormatTable/useCurrencyFormatTable";
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
      text-transform: uppercase;
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
  const pedidosInfoModal = useRecoilValue(statePedidosInfoModal);
  const { formattedDate } = useFormattedDate();
  const { formatCurrency } = useCurrencyFormatTable();

  const numbersArray = (() => {
    try {
      // Verifica se `pedidosInfoModal.rifa_number.numbers` é uma string e não é `null` ou `undefined`
      if (typeof pedidosInfoModal?.rifa_number?.numbers === 'string') {
        return JSON.parse(pedidosInfoModal.rifa_number.numbers);
      }
      return []; // Retorna um array vazio se não for uma string
    } catch (e) {
      console.error('Erro ao analisar a string JSON:', e);
      return []; // Retorna um array vazio em caso de erro de análise
    }
  })();

  return (
    <Table>
      <tbody>
        <tr>
          <td id="itens-titulo"><b>ID</b></td>
          <td><p name="pedidoID" id="pedidoID">{pedidosInfoModal.id}</p></td>
        </tr>
        <tr>
          <td id="itens-titulo"><b>Data</b></td>
          <td><p name="pedidoData" id="pedidoData">{formattedDate(pedidosInfoModal.created_at)}</p></td>
        </tr>
        <tr>
          <td id="itens-titulo"><b>Cliente</b></td>
          <td><p name="pedidoCustomer" id="pedidoCustomer">{pedidosInfoModal?.client?.name} {pedidosInfoModal?.client?.surname}</p></td>
        </tr>
        {pedidosInfoModal.status === 1 &&
          <>
            <tr>
              <td><b>Gateway Pagamento</b></td>
              <td><p name="pedidoGateway" id="pedidoGateway">{pedidosInfoModal.rifa?.rifa_payment?.gateway}</p></td>
            </tr>

            <tr>
              <td><b>Transação</b></td>
              <td><p name="pedidoPaymentReference" id="pedidoPaymentReference">{pedidosInfoModal.pix_id}</p></td>
            </tr>
          </>
        }
        <tr>
          <td><b>Sorteio</b></td>
          <td><p name="pedidoSorteio" id="pedidoSorteio">{pedidosInfoModal?.rifa?.title}</p></td>
        </tr>
        <tr>
          <td><b>Quantidade</b></td>
          <td><p name="pedidoQuantidade" id="pedidoQuantidade">{pedidosInfoModal?.qntd_number}</p></td>
        </tr>
        <tr>
          <td><b>Total</b></td>
          <td><p name="pedidoPrice" id="pedidoPrice">{formatCurrency(pedidosInfoModal?.value)}</p></td>
        </tr>
        {pedidosInfoModal.status === 1 &&
            <>
            <tr>
              <td><b>Data Pagamento</b></td>
              <td><p name="pedidoPagto" id="pedidoPagto">{formattedDate(pedidosInfoModal.updated_at)}</p></td>
            </tr>

            <tr>
              <td id="itens-titulo"><b>Cotas</b></td>
              <td id="pedidoNumeros" className="numbers">
                {numbersArray.length > 0 ? (
                  numbersArray.map((cota, index) => (
                    <div key={index} className="number">{cota}</div>
                  ))
                ) : (
                  <div>Nenhuma cota disponível</div>
                )}
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
                pedidosInfoModal.status === 1 ? 'status-pago' :
                pedidosInfoModal.status === 'divergente' ? 'button-dashboard' :
                pedidosInfoModal.status === 0 ? 'button-divergente' :
                pedidosInfoModal.status === 2 ? 'status-cancelado' :
                ''
              }`}
            >
              {
                pedidosInfoModal.status === 1 ? 'Aprovado' :
                pedidosInfoModal.status === 'divergente' ? 'button-dashboard' :
                pedidosInfoModal.status === 0 ? 'Pendente' :
                pedidosInfoModal.status === 2 ? 'Cancelado' : ''
              }
            </span>
          </td>
        </tr>
      </tbody>
    </Table>
  )
}
