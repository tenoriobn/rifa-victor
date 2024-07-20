/* eslint-disable react/prop-types */
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { stateOpenModalVerInfoCliente, stateRankingInfoModal, stateVisibilidadeColunaTabelaRanking } from "../../../common/states/atom";

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
  const [openModalVerInfoCliente, setOpenModalVerInfoCliente] = useRecoilState(stateOpenModalVerInfoCliente);
  const setRankingInfoModal = useRecoilState(stateRankingInfoModal);

  const handleButtonId = async (id) => {
    setOpenModalVerInfoCliente(!openModalVerInfoCliente)
    // const response = await fetchDados(`admin/dashboard/pacote/${id}`);
    // setRankingInfoModal(response.data);
  }

  const dadosTabela = [
    {
      id: 1,
      posicao: "1º",
      cliente: "Rafaela Souza",
      telefone: "(43) 996XX-XX19",
      cidade: "Quatiguá/Paraná",
      sorteio: "SAVEIRO CROSS DOS SONHOS",
      quantidade: 170,
      total: "R$ 17,00",
    },
    {
      id: 2,
      posicao: "2º",
      cliente: "João Silva",
      telefone: "(43) 997XX-XX20",
      cidade: "Londrina/Paraná",
      sorteio: "CARRO DOS SONHOS",
      quantidade: 150,
      total: "R$ 15,00",
    },
    // Adicione mais objetos conforme necessário
  ];

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
          {dadosTabela.map((item) => (
            <tr key={item.id}>
              {isibilidadeColunaTabelaRanking.posicao && (
                <td align="center" className="posicao">
                  <b>{item.posicao}</b>
                </td>
              )}
              {isibilidadeColunaTabelaRanking.cliente && (
                <td align="center" className="cliente">
                  <a href={`https://dash.alimaprojetos.com/dashboard/pedidos?id_customer=${item.id}`} target="_blank" rel="noopener noreferrer">
                    {item.cliente}
                  </a>
                </td>
              )}
              {isibilidadeColunaTabelaRanking.telefone && (
                <td align="center" className="telefone">
                  {item.telefone}
                </td>
              )}
              {isibilidadeColunaTabelaRanking.cidade && (
                <td align="center" className="cidade">
                  {item.cidade}
                </td>
              )}
              {isibilidadeColunaTabelaRanking.sorteio && (
                <td align="center" className="sorteio">
                  {item.sorteio}
                </td>
              )}
              {isibilidadeColunaTabelaRanking.quantidade && (
                <td align="center" className="quantidade">
                  {item.quantidade}
                </td>
              )}
              {isibilidadeColunaTabelaRanking.total && (
                <td align="center" className="total">
                  <b>{item.total}</b>
                </td>
              )}
              {isibilidadeColunaTabelaRanking.acoes && (
                <td align="center" className="acoes">
                  <button className="button-view" onClick={() => handleButtonId(item.id)}>
                    <i className="fas fa-eye"></i> VER
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
