import styled from 'styled-components';
import GraficoFaturamentoDiario from './GraficoFaturamentoDiario/GraficoFaturamentoDiario';

const DashboardItens = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;
`;

export default function VendasGraficos() {
  return (
    <DashboardItens>
      <GraficoFaturamentoDiario />
    </DashboardItens>
  )
}
