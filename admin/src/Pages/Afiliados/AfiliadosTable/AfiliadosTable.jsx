import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { stateAfiliadosInfoModal, stateAfiliadosInfoTable, stateIdModal, stateOpenModalEditarAfiliados, stateOpenModalVerAfiliados } from "../../../common/states/atom";

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

  .button-view {
    background-color: #4e73df;
    color: white;
    border: none;
    border-radius: .3125rem;
    padding: .625rem .9375rem;
    cursor: pointer;
  }

  .button-edit {
    background-color: #f4b400;
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
  const setOpenModalEditarAfiliados = useSetRecoilState(stateOpenModalEditarAfiliados);
  const [openModalVerAfiliados, setOpenModalVerAfiliados] = useRecoilState(stateOpenModalVerAfiliados);
  const setAfiliadosInfo = useSetRecoilState(stateAfiliadosInfoModal);
  const setIdModal = useSetRecoilState(stateIdModal);
  const afiliadosInfoTable =  useRecoilValue(stateAfiliadosInfoTable);

  console.log('afiliadosInfoTable', afiliadosInfoTable)

  const handleAfiliadoInfo = async (afiliado) => {
    setOpenModalVerAfiliados(!openModalVerAfiliados);
    setAfiliadosInfo(afiliado);
  }

  const handleEditar = async (afiliado) => {
    setOpenModalEditarAfiliados(true)
    setIdModal(afiliado.id)
    setAfiliadosInfo(afiliado);
  }


  // const afiliados = [
  //   {
  //     id: 75,
  //     name: 'Jessica',
  //     porcent: '15,00%',
  //     cellphone: '(43) 99672-6935',
  //     type: 'Afiliado',
  //     pedidos: 188,
  //     faturamento: 'R$ 4.361,53',
  //     comissao: 'R$ 654,23'
  //   },
  //   {
  //     id: 76,
  //     name: 'Carlos',
  //     porcent: '10,00%',
  //     cellphone: '(11) 98765-4321',
  //     type: 'Afiliado',
  //     pedidos: 250,
  //     faturamento: 'R$ 7.200,00',
  //     comissao: 'R$ 720,00'
  //   },
  //   {
  //     id: 77,
  //     name: 'Ana',
  //     porcent: '12,00%',
  //     cellphone: '(21) 91234-5678',
  //     type: 'Afiliado',
  //     pedidos: 300,
  //     faturamento: 'R$ 8.400,00',
  //     comissao: 'R$ 1.008,00'
  //   },
  // ];


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
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {afiliadosInfoTable.map((afiliado, index) => (
          <tr className="raffle-item" key={afiliado?.id}>
            <td>#{index + 1}</td>
            <td>{afiliado?.id}</td>
            <td>{afiliado?.client?.name} {afiliado?.client?.surname}</td>
            <td>{afiliado?.porcent}</td>
            <td>{afiliado?.cellphone}</td>
            <td><span className="status-tag status-inconsistente">{afiliado?.type}</span></td>
            <td>{afiliado?.totalPedidos}</td>
            <td>{afiliado?.faturamento}</td>
            <td>{afiliado?.comissao}</td>
            <td>
              <div className="button-group">
                <button
                  className="action-button button-view"
                  onClick={() => handleAfiliadoInfo(afiliado)}
                >
                  <i className="fas fa-eye"></i> VER
                </button>
                <a className="button-edit" onClick={() => handleEditar(afiliado)}>
                  <i className="fas fa-edit"></i> Editar
                </a>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}
