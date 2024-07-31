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
            <th>COL 2</th>
            <th>COL 3</th>
            <th>COL 4</th>
          </tr>
        </thead>

        <tbody>
            <tr>
              <td>info 1</td>
              <td>info 2</td>
              <td>info 3</td>
              <td>info 4</td>
            </tr>

            <tr>
              <td>info 1</td>
              <td>info 2</td>
              <td>info 3</td>
              <td>info 4</td>
            </tr>

            <tr>
              <td>info 1</td>
              <td>info 2</td>
              <td>info 3</td>
              <td>info 4</td>
            </tr>
        </tbody>
      </Table>
    </ContainerTabelas>
  )
}
