/* eslint-disable react/prop-types */
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { stateVisibilidadeColunaTabelaRanking } from "../../../common/states/atom";

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

  .button-view {
    background-color: #4e73df;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 10px 15px;
    cursor: pointer;
  }

  @media (max-width: 1366px) {
    overflow-x: auto;
    white-space: nowrap;
    display: block;
  }
`;

export default function RankingTable() {
  const isibilidadeColunaTabelaRanking = useRecoilValue(stateVisibilidadeColunaTabelaRanking);

  return (
    <div>
      <Table>
        <thead>
          <tr>
            {isibilidadeColunaTabelaRanking.posicao && <th className="posicao">Posição</th>}
            {isibilidadeColunaTabelaRanking.cliente && <th className="cliente">Cliente</th>}
            {isibilidadeColunaTabelaRanking.telefone && <th className="telefone">Telefone</th>}
            {isibilidadeColunaTabelaRanking.cidade && <th className="cidade">Cidade</th>}
            {isibilidadeColunaTabelaRanking.sorteio && <th className="sorteio">Sorteio</th>}
            {isibilidadeColunaTabelaRanking.quantidade && <th className="quantidade">Quantidade</th>}
            {isibilidadeColunaTabelaRanking.total && <th className="total">Total</th>}
            {isibilidadeColunaTabelaRanking.acoes && <th className="acoes">Ações</th>}
          </tr>
        </thead>

        <tbody>
          <tr>
            {isibilidadeColunaTabelaRanking.posicao && (
              <td align="center" className="posicao">
                <b>1º</b>
              </td>
            )}
            {isibilidadeColunaTabelaRanking.cliente && (
              <td align="center" className="cliente">
                <a href="https://dash.alimaprojetos.com/dashboard/pedidos?id_customer=265287" target="_blank">
                  Rafaela Souza
                </a>
              </td>
            )}
            {isibilidadeColunaTabelaRanking.telefone && (
              <td align="center" className="telefone">
                (43) 996XX-XX19
              </td>
            )}
            {isibilidadeColunaTabelaRanking.cidade && (
              <td align="center" className="cidade">
                Quatiguá/Paraná
              </td>
            )}
            {isibilidadeColunaTabelaRanking.sorteio && (
              <td align="center" className="sorteio">
                SAVEIRO CROSS DOS SONHOS
              </td>
            )}
            {isibilidadeColunaTabelaRanking.quantidade && (
              <td align="center" className="quantidade">
                170
              </td>
            )}
            {isibilidadeColunaTabelaRanking.total && (
              <td align="center" className="total">
                <b>R$ 17,00</b>
              </td>
            )}
            {isibilidadeColunaTabelaRanking.acoes && (
              <td align="center" className="acoes">
                <button className="button-view">
                  <i className="fas fa-eye"></i> VER
                </button>
              </td>
            )}
          </tr>
        </tbody>
      </Table>
    </div>
  );
}
