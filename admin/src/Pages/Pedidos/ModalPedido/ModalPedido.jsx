import styled from "styled-components"

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
`;

export default function ModalCotaPremiada() {
  return (
    <Table>
        <tbody>
          <tr>
              <td id="itens-titulo"><b>ID</b></td>
              <td><p name="pedidoID" id="pedidoID">2386050</p></td>
          </tr>
          <tr>
              <td id="itens-titulo"><b>Data</b></td>
              <td><p name="pedidoData" id="pedidoData">07/07 16:50</p></td>
          </tr>
          <tr>
              <td id="itens-titulo"><b>Cliente</b></td>
              <td><p name="pedidoCustomer" id="pedidoCustomer">Vanessa Aparecida dos Santos de Souza</p></td>
          </tr>
          <tr>
              <td><b>Gateway Pagamento</b></td>
              <td><p name="pedidoGateway" id="pedidoGateway">mercadopago</p></td>
          </tr>
          <tr>
              <td><b>Transação</b></td>
              <td><p name="pedidoPaymentReference" id="pedidoPaymentReference">82285938684</p></td>
          </tr>
          <tr>
              <td><b>Sorteio</b></td>
              <td><p name="pedidoSorteio" id="pedidoSorteio">SAVEIRO CROSS DOS SONHOS </p></td>
          </tr>
          <tr>
              <td><b>Quantidade</b></td>
              <td><p name="pedidoQuantidade" id="pedidoQuantidade">70</p></td>
          </tr>
          <tr>
              <td><b>Total</b></td>
              <td><p name="pedidoPrice" id="pedidoPrice">R$&nbsp;7,00</p></td>
          </tr>
          <tr>
              <td><b>Data Pagamento</b></td>
              <td><p name="pedidoPagto" id="pedidoPagto">07/07 16:52</p></td>
          </tr>
          <tr>
              <td id="itens-titulo"><b>Cotas</b></td>
              <td id="pedidoNumeros" className="numbers">
                <div className="number">261288</div>
                <div className="number">113772</div>
                <div className="number">421120</div>
                <div className="number">611708</div>
                <div className="number">261288</div>
                <div className="number">113772</div>
                <div className="number">421120</div>
                <div className="number">611708</div>
              </td>
          </tr>
          <tr>
              <td><b>Status</b></td>
              <td><span name="pedidoStatus" id="pedidoStatus" className="status-tag status-pago">Aprovado</span></td>
          </tr>
      </tbody>
    </Table>
  )
}
