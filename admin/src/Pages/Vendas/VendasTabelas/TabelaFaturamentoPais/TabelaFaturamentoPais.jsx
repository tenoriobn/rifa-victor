/* eslint-disable react/prop-types */
import { ContainerTabelas, Table } from "../VendasTabelas";

export default function TabelaFaturamentoPais() {

  return (
    <ContainerTabelas className="container-charts">
      <h3>FATURAMENTO POR PAÍS</h3>

      <Table>
      <thead>
          <tr>
            <th>#</th>
            <th>PAÍS</th>
            <th>QNTD</th>
            <th>MÉDIA</th>
            <th>VALOR</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>#1</td>
            <td>Brasil</td>
            <td>98.000</td>
            <td>98%</td>
            <td>R$ 98.000,00</td>
          </tr>
          <tr>
            <td>#2</td>
            <td>Argentina</td>
            <td>1.000</td>
            <td>1%</td>
            <td>R$ 1.000,00</td>
          </tr>
          <tr>
            <td>#3</td>
            <td>Portugal</td>
            <td>1.000</td>
            <td>1%</td>
            <td>R$ 1.000,00</td>
          </tr>
        </tbody>
      </Table>
    </ContainerTabelas>
  )
}
