/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import styled from "styled-components"
import { fetchDados } from "../../../common/http/http";
import { useEffect } from "react";
import useCurrencyFormatTable from "../../../common/states/Hook/useCurrencyFormatTable/useCurrencyFormatTable";
import { stateDadosVendas } from "../../../common/states/atom";
import { useRecoilState } from "recoil";

const DashboardItens = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  box-sizing: border-box;
  margin-top: 3.125rem;

  .dashboard-item {
    position: relative;
    width: 100%;
    height: 100px;
    border-radius: 10px;
    cursor: pointer;
    box-sizing: border-box;
  }

  .dashboard-item.profit {
    background-color: #0b400073;
    border: 1px solid #0b400073;
  }

  .dashboard-item.request {
    background-color: #234667;
    border: 1px solid #234667;
  }

  .dashboard-item.ticket-medio {
    background-color: #34a0a4;
    border: 1px solid #34a0a4;
  }

  .dashboard-item.pending_request {
    background-color: #2e3b46;
    border: 1px solid #2e3b46;
  }

  .dashboard-item.pending_entry {
    background-color: #1f3349;
    border: 1px solid #1f3349;
  }

  .dashboard-item-body {
    padding: 10px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: 1.5rem;
    box-sizing: border-box;
    line-height: 20px;
  }

  .dashboard-item-body p:first-child {
    font-size: 1.1rem;
    margin-bottom: 5px;
  }

  .dashboard-item-body p:nth-child(2) {
    font-weight: 600;
  }

  .dashboard-item-body i {
    position: absolute;
    font-size: 4rem;
    top: 15px;
    right: 11px;
    opacity: .2;
  }

  @media (min-width: 1280px) {
    justify-content: space-between;

    .dashboard-item {
      max-width: 176px;
    }
  }

  @media (min-width: 1600px) {
    justify-content: space-between;

    .dashboard-item {
      max-width: 15%;
    }
  }
`;

export default function VendasCardInfo({rotaObterDados}) {
  const [dadosVendas, setDadosVendas] = useRecoilState(stateDadosVendas);
  const { formatCurrency } = useCurrencyFormatTable();

  console.log('vendas', dadosVendas)

  const obterDados = async () => {
    const response = await fetchDados(rotaObterDados);
    setDadosVendas(response.data); 
  };

  useEffect(() => {
    obterDados();
  }, []);

  return (
    <DashboardItens>
      <div className="dashboard-item profit block-copy">
        <div className="dashboard-item-body">
          <p>Total Vendidos</p>
          <p>{formatCurrency(dadosVendas?.totalPedido)}</p>
          <i className="fa-solid fa-dollar-sign"></i>
        </div>
      </div>

      <div className="dashboard-item request block-copy">
        <div className="dashboard-item-body">
          <p>Pedidos Aprovados</p>
          <p>{dadosVendas?.pedidosAprovados}</p>
          <i className="fa-solid fa-receipt"></i>
        </div>
      </div>

      <div className="dashboard-item ticket-medio block-copy">
        <div className="dashboard-item-body">
          <p>Ticket Médio</p>
          <p>{dadosVendas?.ticketMedio}</p>
          <i className="fa-solid fa-ticket"></i>
        </div>
      </div>

      <div className="dashboard-item pending_request block-copy">
        <div className="dashboard-item-body">
          <p>Pedidos Aguardando</p>
          <p>{dadosVendas?.pedidosAguardando}</p>
          <i className="fa-solid fa-hourglass}"></i>
        </div>
      </div>

      <div className="dashboard-item pending_entry block-copy">
        <div className="dashboard-item-body">
          <p>Pagamento Pendente</p>
          <p>{formatCurrency(dadosVendas?.totalPedidoAguardando)}</p>
          <i className="fa-solid fa-dollar-sign"></i>
        </div>
      </div>
    </DashboardItens>
  )
}
