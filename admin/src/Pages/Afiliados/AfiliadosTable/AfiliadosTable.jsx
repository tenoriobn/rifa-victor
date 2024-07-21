import styled from "styled-components";

const Table = styled.table`
  width: 100%;
  font-size: .9rem;
  font-weight: 500;
  margin: 4.5rem 0 1.5rem 0;
  border-collapse: separate;
  border-spacing: 0 1em;

  tr {
    border: 0;
    margin: .3125rem;
  }

  th {
    text-align: center;
    padding-bottom: 1.25rem;
  }

  .spacing {
    width: 100px;
  }

  td {
    text-align: center;
    padding: .9375rem .625rem;
    background-color: #2e2e36;
    vertical-align: middle;
    text-transform: uppercase;
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
    text-transform: uppercase;
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

  .button-group a, .button-group button {
    transition: all .3s ease-in-out;
  }

  .button-group a:hover, .button-group button:hover {
    opacity: .8;
  }

  @media (max-width: 767px) {
    overflow-x: auto;
    white-space: nowrap;
    display: block;
  }
`;

export default function AfiliadosTable() {
  return (
    <Table>
      <thead>
        <tr>
          <th>#</th>
          <th><b>ID</b></th>
          <th><b>Nome</b></th>
          <th><b>%</b></th>
          <th><b>Telefone</b></th>
          <th><b>Tipo</b></th>
          <th>Pedidos</th>
          <th><b>Faturamento</b></th>
          <th>Comissão</th>
        </tr>
      </thead>
      <tbody>
        <tr className="raffle-item">
          <td>#1</td>
          <td>75</td>
          <td>Jessica</td>
          <td>15,00%</td>
          <td>(43) 99672-6935</td>
          <td><span className="status-tag status-inconsistente">Afiliado</span></td>
          <td>188</td>
          <td>R$ 4.361,53</td>
          <td>R$ 654,23</td>
        </tr>
      </tbody>
    </Table>
  )
}
