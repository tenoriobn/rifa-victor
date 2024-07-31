/* eslint-disable react/prop-types */
import { ContainerTabelas, Table } from "../VendasTabelas";

export default function TabelaFaturamentoQuatro() {

  return (
    <ContainerTabelas className="container-charts">
      <h3>TABELA 4</h3>

      <Table>
      <thead>
          <tr>
            <th>#</th>
            <th>COL 2</th>
            <th>COL 3</th>
            <th>COL 4</th>
            <th>COL 5</th>
            <th>COL 6</th>
          </tr>
        </thead>

        <tbody>
            <tr>
              <td>info 1</td>
              <td>info 2</td>
              <td>info 3</td>
              <td>info 4</td>
              <td>info 5</td>
              <td>info 6</td>
            </tr>

            <tr>
              <td>info 1</td>
              <td>info 2</td>
              <td>info 3</td>
              <td>info 4</td>
              <td>info 5</td>
              <td>info 6</td>
            </tr>

            <tr>
              <td>info 1</td>
              <td>info 2</td>
              <td>info 3</td>
              <td>info 4</td>
              <td>info 5</td>
              <td>info 6</td>
            </tr>
        </tbody>
      </Table>
    </ContainerTabelas>
  )
}
