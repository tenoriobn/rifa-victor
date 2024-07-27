/* eslint-disable react/prop-types */
import { useRecoilValue, useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components"
import { stateOpenModalEditarGanhador, stateNovoGanhadorInfo, stateIdModal, stateUserLogin } from "../../../common/states/atom";
import useFormattedDate from "../../../common/states/Hook/useFormattedDate";
import { deleteDados } from "../../../common/http/http";

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
    padding: .6255rem .625rem;
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

  .ganhador img {
    max-width: 200px;
    max-height: 112px;
    object-fit: cover;
    width: 100%;
    border-radius: .375rem;
  }

  .status-tag {
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

  @media (max-width: 767px) {
    overflow-x: auto;
    white-space: nowrap;
    display: block;
  }
`;

export default function GanhadoresTable() {  
  const [openModalEditarGanhador, setOpenModalEditarGanhador] = useRecoilState(stateOpenModalEditarGanhador);
  const [novoGanhadorInfo, setNovoGanhdorInfo] = useRecoilState(stateNovoGanhadorInfo);
  const setIdModal = useSetRecoilState(stateIdModal);
  const { formattedDate } = useFormattedDate();
  const userLogin = useRecoilValue(stateUserLogin);

  const handleModalId = (ganhador) => {
    setIdModal(ganhador)
    setOpenModalEditarGanhador(!openModalEditarGanhador)
  }

  const handleDeletar = async (ganhadorId) => {
    const response = await deleteDados(`admin/dashboard/delete/ganhador/${ganhadorId}`, userLogin);
    setNovoGanhdorInfo(response.data);
  }

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
          {Array.isArray(novoGanhadorInfo) && novoGanhadorInfo.length > 0 ? (
            novoGanhadorInfo.map((ganhador, index) => (
              <tr key={index} className="raffle-item">
                <td className="ganhador">
                  <img src={`../../../../public/imgRifas/${ganhador?.img}`} alt="foto do ganhador" />
                </td>
                <td>{ganhador?.client?.name} {ganhador?.client?.surname}</td>
                <td>{ganhador?.rifa?.title}</td>
                <td>{ganhador?.ticket}</td>
                <td>{formattedDate(ganhador?.updated_at)}</td>
                <td>
                  <div className="button-group">
                    <button className="button-edit" onClick={() => handleModalId(ganhador)}>
                      <i className="fas fa-edit"></i> Editar
                    </button>
                    <button className="button-delete" onClick={() => handleDeletar(ganhador.id)}>
                      <i className="fas fa-trash-alt"></i> Excluir
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">Nenhum ganhador encontrado</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}
