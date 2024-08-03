/* eslint-disable react/prop-types */
import { ContainerTabelas, Table } from "../VendasTabelas";

export default function TabelaRankingAfiliados() {

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
            <tr>
            <td>#1</td>
              <td>77</td>
              <td>ANA</td>
              <td>300</td>
              <td>R$ 8.400,00</td>
              <td>R$ 1.008,00</td>
            </tr>

            <tr>
              <td>#2</td>
              <td>75</td>
              <td>JESSICA</td>
              <td>188</td>
              <td>R$ 4.361,53</td>
              <td>R$ 654,23</td>
            </tr>

            <tr>
              <td>#3</td>
              <td>76</td>
              <td>CARLOS</td>
              <td>250	</td>
              <td>R$ 7.200,00</td>
              <td>R$ 720,00</td>
            </tr>
        </tbody>
      </Table>
    </ContainerTabelas>
  )
}
