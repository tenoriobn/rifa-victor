import styled from "styled-components"

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

const dashboardData = {
  totalVendidos: {
    title: "Total Vendidos",
    value: "R$ 3.345,40",
    iconClass: "fa-dollar-sign",
    className: "profit"
  },
  pedidosAprovados: {
    title: "Pedidos Aprovados",
    value: "204",
    iconClass: "fa-receipt",
    className: "request"
  },
  ticketMedio: {
    title: "Ticket Médio",
    value: "R$ 16,40",
    iconClass: "fa-ticket",
    className: "ticket-medio"
  },
  pedidosAguardando: {
    title: "Pedidos Aguardando",
    value: "0",
    iconClass: "fa-hourglass",
    className: "pending_request"
  },
  pagamentoPendente: {
    title: "Pagamento Pendente",
    value: "R$ 0,00",
    iconClass: "fa-dollar-sign",
    className: "pending_entry"
  }
};

export default function VendasCardInfo() {
  return (
    <DashboardItens>
      <div className={`dashboard-item ${dashboardData.totalVendidos.className} block-copy`}>
        <div className="dashboard-item-body">
          <p>{dashboardData.totalVendidos.title}</p>
          <p>{dashboardData.totalVendidos.value}</p>
          <i className={`fa-solid ${dashboardData.totalVendidos.iconClass}`}></i>
        </div>
      </div>

      <div className={`dashboard-item ${dashboardData.pedidosAprovados.className} block-copy`}>
        <div className="dashboard-item-body">
          <p>{dashboardData.pedidosAprovados.title}</p>
          <p>{dashboardData.pedidosAprovados.value}</p>
          <i className={`fa-solid ${dashboardData.pedidosAprovados.iconClass}`}></i>
        </div>
      </div>

      <div className={`dashboard-item ${dashboardData.ticketMedio.className} block-copy`}>
        <div className="dashboard-item-body">
          <p>{dashboardData.ticketMedio.title}</p>
          <p>{dashboardData.ticketMedio.value}</p>
          <i className={`fa-solid ${dashboardData.ticketMedio.iconClass}`}></i>
        </div>
      </div>

      <div className={`dashboard-item ${dashboardData.pedidosAguardando.className} block-copy`}>
        <div className="dashboard-item-body">
          <p>{dashboardData.pedidosAguardando.title}</p>
          <p>{dashboardData.pedidosAguardando.value}</p>
          <i className={`fa-solid ${dashboardData.pedidosAguardando.iconClass}`}></i>
        </div>
      </div>

      <div className={`dashboard-item ${dashboardData.pagamentoPendente.className} block-copy`}>
        <div className="dashboard-item-body">
          <p>{dashboardData.pagamentoPendente.title}</p>
          <p>{dashboardData.pagamentoPendente.value}</p>
          <i className={`fa-solid ${dashboardData.pagamentoPendente.iconClass}`}></i>
        </div>
      </div>
    </DashboardItens>
  )
}
