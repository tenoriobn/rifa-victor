import styled from "styled-components"

const Table = styled.table`
  width: 100%;
  font-size: .9rem;
  font-weight: 500;
  margin: 4.5rem 0 1.5rem 0;

  @media (max-width: 1366px) {
    overflow-x: auto;
    white-space: nowrap;
    display: block;
  }

  tr {
    border: 0;
    margin: .3125rem;
  }

  th {
    text-align: center;
    padding-bottom: 2.5rem;
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

  td img {
    width: 80px;
  }

  .status-tag {
    background-color: #28a745;
    padding: .3125rem .625rem;
    border-radius: .3125rem;
    color: white;
    font-weight: bold;
    text-align: center;
    display: inline-block;
  }

  .button-group {
    display: flex;
    gap: .3125rem;
    justify-content: center;
    align-items: center;
  }

  .button-delete {
    background-color: #e74a3b;
    color: white;
    border: none;
    border-radius: .3125rem;
    padding: .625rem .9375rem;
    cursor: pointer;
  }

  .button-dashboard {
    background-color: #1cc88a;
    color: white;
    border: none;
    border-radius: .3125rem;
    padding: .625rem .9375rem;
    cursor: pointer;
  }

  .button-edit {
    background-color: #0d6efd;
    color: white;
    border: none;
    border-radius: .3125rem;
    padding: .625rem .9375rem;
    cursor: pointer;
  }
`;

export default function TabelaSorteio() {
  return (
    <div className="">
      <Table>
        <thead>
          <tr>
            <th className="spacing"><p></p></th>
            <th>ID</th>
            <th>Nome</th>
            <th>Data Sorteio</th>
            <th>Fat. Total</th>
            <th>Fat. Hoje</th>
            <th>Cotas Vendidas</th>
            <th>% Vendidas</th>
            <th>C. Reservadas</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td className="spacing">
              <img src="https://imagedelivery.net/TuyDlh37fwpu3jSKwZ3-9g/2a6e9600-32e1-44d2-8fff-801b4abe3e00/thumb" alt="#" />
            </td>
            <td>#174</td>
            <td>
              <a href="https://alimaprojetos.com/saveiro-cross-dos-sonhos-27" target="_blank">
                <i className="fa-solid fa-link"></i>
              </a> 
              <b>SAVEIRO CROSS DOS SONHOS</b>
            </td>
            <td> - </td>
            <td>R$ 48.946,31</td>
            <td>R$ 458,40</td>
            <td>254.279</td>
            <td><b>25.43%</b></td>
            <td>330</td>
            <td>
              <span className="status-tag status-pago">Ativa</span>                        
            </td>

            <td>
              <div className="button-group">
                <a className="button-delete" data-umami-event="raffles-toggle-disable" onClick="" 
                  href="https://dash.alimaprojetos.com/dashboard/toggle-raffle/174">
                  <i className="fa-solid fa-toggle-on"></i> 
                  Finalizar
                </a>
                <a className="button-dashboard" data-umami-event="raffles-dashboard" href="https://dash.alimaprojetos.com/dashboard/rifas/dashboard/174">
                  <ion-icon name="stats-chart" role="img" className="md hydrated"></ion-icon> 
                  Dashboard
                </a>
                {/* <a className="button-edit" data-umami-event="raffles-edit" href="https://dash.alimaprojetos.com/dashboard/rifas/editar/174">
                  <i className="fas fa-edit"></i> 
                  Editar
                </a> */}
                <a className="button-edit" onClick="showEdit(174)">
                  <i className="fas fa-bars"></i> 
                  Ações
                </a>
              </div>
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  )
}
