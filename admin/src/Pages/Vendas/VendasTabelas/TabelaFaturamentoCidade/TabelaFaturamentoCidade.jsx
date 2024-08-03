/* eslint-disable react/prop-types */
import { ContainerTabelas, Table } from "../VendasTabelas";

export default function TabelaFaturamentoCidade() {

  return (
    <ContainerTabelas className="container-charts">
      <h3>FATURAMENTO POR CIDADE</h3>

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
              <td>Belo Horizonte</td>
              <td>25.000</td>
              <td>50%</td>
              <td>R$ 12.500,00</td>
            </tr>
            <tr>
              <td>#2</td>
              <td>Uberlândia</td>
              <td>18.000</td>
              <td>36%</td>
              <td>R$ 9.000,00</td>
            </tr>
            <tr>
              <td>#3</td>
              <td>Anápolis</td>
              <td>10.000</td>
              <td>20%</td>
              <td>R$ 5.000,00</td>
            </tr>
          </tbody>
      </Table>
    </ContainerTabelas>
  )
}
