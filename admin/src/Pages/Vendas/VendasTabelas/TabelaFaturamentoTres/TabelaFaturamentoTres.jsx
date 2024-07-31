/* eslint-disable react/prop-types */
import { ContainerTabelas, Table } from "../VendasTabelas";

export default function TabelaFaturamentoTres() {

  return (
    <ContainerTabelas className="container-charts">
      <h3>TABELA 3</h3>

      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>COL 2</th>
            <th>COL 3</th>
            <th>COL 4</th>
            <th>COL 5</th>
            <th>COL 6</th>
            <th>COL 7</th>
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
              <td>info 7</td>
            </tr>

            <tr>
              <td>info 1</td>
              <td>info 2</td>
              <td>info 3</td>
              <td>info 4</td>
              <td>info 5</td>
              <td>info 6</td>
              <td>info 7</td>
            </tr>

            <tr>
              <td>info 1</td>
              <td>info 2</td>
              <td>info 3</td>
              <td>info 4</td>
              <td>info 5</td>
              <td>info 6</td>
              <td>info 7</td>
            </tr>
        </tbody>
      </Table>
    </ContainerTabelas>
  )
}
