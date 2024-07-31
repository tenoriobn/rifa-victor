import styled from 'styled-components';
import TabelaFaturamentoCidade from './TabelaFaturamentoCidade/TabelaFaturamentoCidade';
import TabelaFaturamentoPais from './TabelaFaturamentoPais/TabelaFaturamentoPais';
import TabelaFaturamentoTres from './TabelaFaturamentoTres/TabelaFaturamentoTres';
import TabelaFaturamentoQuatro from './TabelaFaturamentoQuatro/TabelaFaturamentoQuatro';

const DashboardItens = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;
`;

export const ContainerTabelas = styled.div`
  flex-grow: 1;
  flex-basis: calc(50% - 10px);
  min-height: 300px;
  background-color: #2e2e36!important;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 0px;
  box-sizing: border-box;
  padding: 20px;

  h3 {
    font-weight: 700;
  }

  @media (min-width: 992px) {
    margin-bottom: 0px;
  }
`;

export const Table = styled.table`
  width: 100%;
  font-size: .9rem;
  margin: 1.75rem 0 0rem 0;
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
    font-weight: 600;
  }

  td {
    text-align: center;
    padding: .9375rem .625rem;

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
`;

export default function VendasTabelas() {
  return (
    <DashboardItens>
      <TabelaFaturamentoTres />
      <TabelaFaturamentoQuatro />
      <TabelaFaturamentoCidade />
      <TabelaFaturamentoPais/>
    </DashboardItens>
  )
}
