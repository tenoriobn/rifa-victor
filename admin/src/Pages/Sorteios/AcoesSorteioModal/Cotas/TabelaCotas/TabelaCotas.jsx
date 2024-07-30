/* eslint-disable react/prop-types */
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { stateCotasPremiadas, stateIdModal, stateOpenModalCotaPremiada, stateOpenModalEditarCotaPremiada, stateTabelaCotasInfo, stateUserLogin } from "../../../../../common/states/atom";
import { deleteDados, fetchDados } from "../../../../../common/http/http";
import { useParams } from "react-router-dom";
import useFormattedDate from "../../../../../common/states/Hook/useFormattedDate";

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
  const { formattedDate } = useFormattedDate();

  const handleButtonId = async (item) => {
    setOpenModalCotaPremiada(!openModalCotaPremiada)

    // const response = await fetchDados(`admin/dashboard/pacote/${id}`);
    setIdModal(item);
  }

  const handleEditar = async (idModal) => {
    setOpenModalEditarCotaPremiada(!openModalEditarCotaPremiada)

    const response = await fetchDados(`admin/dashboard/bilhete-premiado/editar/${idModal}`, userLogin);
    setCotaPremiada(response?.data);
    setIdModal(idModal);

    console.log(response)
  }

  const handleDeletar = async (idCotaPremiada) => {
    const response = await deleteDados(`admin/dashboard/bilhete-premiado/delete/${idCotaPremiada}/${id}`, userLogin);
    setTabelaCotasInfo(response?.data?.data);
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
            <th>Prêmiada</th>
            <th className="status">Status</th>
            <th>Mostrar</th>
            <th>Criado em</th>
            <th>Alterado em</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
        {tabelaCotasInfo.map((cota, index) => (
            <tr key={cota?.id} className="raffle-cota">
              <td>#{index + 1}</td>
              <td>{cota?.id}</td>
              <td><b>{cota?.number_cota}</b></td>
              <td>{cota?.award}</td>
              <td>
                <span className={`status-tag ${cota?.status === 'disponivel' ? 'status-available' : cota?.status === 'imediato' ? 'status-rescued': cota?.status === 'resgatada' ? 'button-delete' : 'status-reserved'}`}>
                  {cota?.status}
                </span>
              </td>
              <td>
                <span className={`status-tag ${cota?.show_site === 'sim' ? 'status-available' : 'status-reserved'}`}>
                  {cota.show_site}
                </span>
              </td>
              <td>{formattedDate(cota?.created_at)}</td>
              <td>{formattedDate(cota?.updated_at)}</td>
              <td>
                <div className="button-group">
                  <button className="action-button button-edit" 
                    onClick={() => handleEditar(cota?.id)}
                  >
                    <i className="fas fa-edit"></i> Editar
                  </button>

                  <button className="action-button button-delete" 
                    onClick={() => handleDeletar(cota?.id)}
                  >
                    <i className="fas fa-check-square"></i> Excluir
                  </button>

                  {cota.status === "resgatada" && 
                    <button 
                      className="action-button button-view" 
                      // onClick={() => setOpenModalCotaPremiada(!openModalCotaPremiada)}
                      onClick={() => handleButtonId(cota)}
                    >
                      <i className="fas fa-eye"></i> VER
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
