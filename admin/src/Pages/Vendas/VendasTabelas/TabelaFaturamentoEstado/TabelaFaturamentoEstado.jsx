/* eslint-disable react/prop-types */
import { ContainerTabelas, Table } from "../VendasTabelas";

export default function TabelaFaturamentoEstado() {

  return (
    <ContainerTabelas className="container-charts">
      <h3>FATURAMENTO POR ESTADO</h3>

      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>CIDADE</th>
            <th>QNTD</th>
            <th>MÉDIA</th>
            <th>VALOR</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>#1</td>
            <td>Minas Gerais</td>
            <td>50.000</td>
            <td>40%</td>
            <td>R$ 29.358,25</td>
          </tr>
          <tr>
            <td>#2</td>
            <td>Goiás</td>
            <td>30.000</td>
            <td>30%</td>
            <td>R$ 22.035,10</td>
          </tr>
          <tr>
            <td>#3</td>
            <td>São Paulo</td>
            <td>20.000</td>
            <td>25%</td>
            <td>R$ 16.123,20</td>
          </tr>
        </tbody>
      </Table>
    </ContainerTabelas>
  )
}
