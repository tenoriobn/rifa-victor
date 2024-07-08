/* eslint-disable react/prop-types */
import { useRecoilState } from "recoil";
import styled from "styled-components"
import { stateOpenModalEditarGanhador } from "../../../common/states/atom";

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

  .status-tag {
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

  .status-rescued {
    background-color: #6f42c1;
  }

  .button-edit {
    background-color: #f4b400;
    color: white;
    border: none;
    border-radius: .3125rem;
    padding: .625rem .9375rem;
    cursor: pointer;
  }
  
  .button-delete {
    background-color: #e74a3b;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 10px 15px;
    cursor: pointer;
  }

  .button-group a, .button-group button {
    transition: all .3s ease-in-out;
  }

  .button-group a:hover, .button-group button:hover {
    opacity: .8;
  }

  @media (max-width: 1366px) {
    overflow-x: auto;
    white-space: nowrap;
    display: block;
  }
`;

const ganhadoresData = [
  {
    imagem: "https://imagedelivery.net/TuyDlh37fwpu3jSKwZ3-9g/06f43084-aa29-480e-c4d9-36dfaaab8f00/thumb",
    name: "Juliano Oliveira Amaral",
    raffle: "F250 OU 50K NO PIX",
    number: "007149",
    date: "17/04/2024"
  },
  {
    imagem: "https://imagedelivery.net/TuyDlh37fwpu3jSKwZ3-9g/06f43084-aa29-480e-c4d9-36dfaaab8f00/thumb",
    name: "Fernanda Silva",
    raffle: "SAVEIRO CROSS DOS SONHOS",
    number: "005432",
    date: "18/04/2024"
  },
  // Adicione mais objetos conforme necessário
];

export default function GanhadoresTable() {  
  const [openModalEditarGanhador, setOpenModalEditarGanhador] = useRecoilState(stateOpenModalEditarGanhador);

  return (
    <div className="">
      <Table>
        <thead>
          <tr>
            <th></th>
            <th>Nome</th>
            <th>Rifa</th>
            <th>Cota</th>
            <th>Data</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {ganhadoresData.map((ganhador, index) => (
            <tr key={index} className="raffle-item">
              <td>
                <img src={ganhador.imagem} alt={ganhador.name} />
              </td>
              <td>{ganhador.name}</td>
              <td>{ganhador.raffle}</td>
              <td>{ganhador.number}</td>
              <td>{ganhador.date}</td>
              <td>
                <div className="button-group">
                  <a href="#" className="button-edit" onClick={() => setOpenModalEditarGanhador(!openModalEditarGanhador)}>
                    <i className="fas fa-edit"></i> Editar
                  </a>
                  <a className="button-delete" href="">
                    <i className="fas fa-trash-alt"></i> Excluir
                  </a>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}
