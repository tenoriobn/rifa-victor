/* eslint-disable react/prop-types */
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { stateCotasPremiadas, stateIdModal, stateOpenModalCotaPremiada, stateOpenModalEditarCotaPremiada, stateTabelaCotasInfo, stateUserLogin } from "../../../../../common/states/atom";
import { deleteDados, fetchDados } from "../../../../../common/http/http";
import { useParams } from "react-router-dom";

export const Table = styled.table`
  width: 100%;
  font-size: .9rem;
  font-weight: 500;
  margin: 4.5rem 0 1.5rem 0;
  border-collapse: separate;
  border-spacing: 0 1em;

  tr {
    border: 0;
    margin: .3125rem;
    border-spacing: 0 1em;
  }

  th {
    text-align: center;
    padding-bottom: 1.25rem;
    font-weight: bold;
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

  .status-rescued {
    background-color: #6f42c1;
  }

  .status-tag {
    padding: 5px 10px;
    border-radius: 5px;
    color: white;
    font-weight: bold;
    text-align: center;
    display: inline-block;
    text-transform: uppercase;
  }

  .status-rescued {
    background-color: #6f42c1;
  }

  .status-reserved {
    background-color: #dc3545;
  }

  .status-available {
    background-color: #28a745;
  }

  .button-delete {
    background-color: #e74a3b;
  }

  .button-group {
    display: flex;
    gap: 5px;
    justify-content: center;
    align-items: center;
  }

  .action-button {
    border: none;
    border-radius: .3125rem;
    padding: .625rem .9375rem;
    cursor: pointer;
    color: white;
    transition: all .3s ease-in-out;
  }

  .action-button:hover {
    opacity: .8;
  }

  .button-view {
    background-color: #4e73df;
  }

  .button-edit {
    background-color: #f4b400;
  }

  @media (max-width: 1366px) {
    overflow-x: auto;
    white-space: nowrap;
    display: block;
  }
`;

export default function TabelaCotas() {
  const [openModalCotaPremiada, setOpenModalCotaPremiada] = useRecoilState(stateOpenModalCotaPremiada);
  const [openModalEditarCotaPremiada, setOpenModalEditarCotaPremiada] = useRecoilState(stateOpenModalEditarCotaPremiada);
  const [tabelaCotasInfo, setTabelaCotasInfo] = useRecoilState(stateTabelaCotasInfo);
  const setIdModal = useSetRecoilState(stateIdModal);
  const setCotaPremiada = useSetRecoilState(stateCotasPremiadas)
  const userLogin = useRecoilValue(stateUserLogin);
  const { id } = useParams();

  const handleEditar = async (idModal) => {
    setOpenModalEditarCotaPremiada(!openModalEditarCotaPremiada)

    const response = await fetchDados(`admin/dashboard/bilhete-premiado/editar/${idModal}`, userLogin);
    setCotaPremiada(response.data);

    setIdModal(idModal);
  }

  const handleDeletar = async (idCotaPremiada) => {
    const rifa = { rifas_id: id };

    console.log(rifa)

    const response = await deleteDados(`admin/dashboard/bilhete-premiado/delete/${idCotaPremiada}/${id}`, userLogin);
    setTabelaCotasInfo(response.data);
    setIdModal(idCotaPremiada);
  }

  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>ID</th>
            <th>Cota</th>
            <th>Prêmioaa</th>
            <th className="status">Status</th>
            <th>Mostrar</th>
            <th>Criado em</th>
            <th>Alterado em</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
        {tabelaCotasInfo.map((cota, index) => (
            <tr key={cota.id} className="raffle-cota">
              <td>#{index + 1}</td>
              <td>{cota.id}</td>
              <td><b>{cota.number_cota}</b></td>
              <td>{cota.award}</td>
              <td>
                <span className={`status-tag ${cota.status === 'resgatada' ? 'status-rescued' : cota.status === 'reservada' ? 'status-reserved' : 'status-available'}`}>
                  {cota.status}
                </span>
              </td>
              <td>
                <span className={`status-tag ${cota.show_site === 'sim' ? 'status-available' : 'status-reserved'}`}>
                  {cota.show_site}
                </span>
              </td>
              <td>{cota.created_at}</td>
              <td>{cota.updated_at}</td>
              <td>
                <div className="button-group">
                  {cota.status === "resgatada" && 
                    <button 
                      className="action-button button-view" 
                      onClick={() => setOpenModalCotaPremiada(!openModalCotaPremiada)}
                    >
                      <i className="fas fa-eye"></i> VER
                    </button>
                  }

                  <button className="action-button button-edit" 
                    onClick={() => handleEditar(cota.id)}
                  >
                    <i className="fas fa-edit"></i> Editar
                  </button>

                  {cota.status !== "resgatada" &&
                    <button className="action-button button-delete" 
                      onClick={() => handleDeletar(cota.id)}
                    >
                      <i className="fas fa-check-square"></i> Excluir
                    </button>
                  }
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}
