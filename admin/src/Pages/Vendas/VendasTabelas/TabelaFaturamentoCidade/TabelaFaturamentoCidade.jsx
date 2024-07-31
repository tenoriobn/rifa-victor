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
            <th>COL 2</th>
            <th>COL 3</th>
            <th>COL 4</th>
            <th>COL 5</th>
          </tr>
        </thead>

        <tbody>
            <tr>
              <td>info 1</td>
              <td>info 2</td>
              <td>info 3</td>
              <td>info 4</td>
              <td>info 5</td>
            </tr>

            <tr>
              <td>info 1</td>
              <td>info 2</td>
              <td>info 3</td>
              <td>info 4</td>
              <td>info 5</td>
            </tr>

            <tr>
              <td>info 1</td>
              <td>info 2</td>
              <td>info 3</td>
              <td>info 4</td>
              <td>info 5</td>
            </tr>
        </tbody>
      </Table>
    </ContainerTabelas>
  )
}
