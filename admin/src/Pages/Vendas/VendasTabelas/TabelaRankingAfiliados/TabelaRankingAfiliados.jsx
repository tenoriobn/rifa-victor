/* eslint-disable react/prop-types */
import useCurrencyFormatTable from "../../../../common/states/Hook/useCurrencyFormatTable/useCurrencyFormatTable";
import { stateDadosVendas } from "../../../../common/states/atom";
import { ContainerTabelas, Table } from "../VendasTabelas";
import {  useRecoilValue } from "recoil";

export default function TabelaRankingAfiliados() {
  const dadosVendas = useRecoilValue(stateDadosVendas);
  const { formatCurrency } = useCurrencyFormatTable();
  const afiliados = dadosVendas?.afiliados

  return (
    <ContainerTabelas className="container-charts">
      <h3>AFILIADOS</h3>

      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>ID</th>
            <th>NOME</th>
            <th>PEDIDOS</th>
            <th>FATURAMENTO</th>
            <th>COMISSÃO</th>
          </tr>
        </thead>

        <tbody>
        {afiliados?.map((afiliado, index) => (
          <tr className="raffle-item" key={afiliado?.id}>
            <td>#{index + 1}</td>
            <td>{afiliado?.id}</td>
            <td>{afiliado?.client?.name}</td>
            <td>{afiliado?.totalPedidos}</td>
            <td>{formatCurrency(afiliado?.faturamento)}</td>
            <td>{formatCurrency(afiliado?.comissao)}</td>
          </tr>
        ))}
        </tbody>
      </Table>
    </ContainerTabelas>
  )
}
