/* eslint-disable react/prop-types */
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components"
import { stateInfoBilhetePremiado, stateOpenModalAdicionarBilhetePremiado } from "../../../../common/states/atom";

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
  }
`;

export default function FiltroUsuarioTable() {  
  const [openModalTrocarBilhete, setOpenModalTrocarBilhete] = useRecoilState(stateOpenModalAdicionarBilhetePremiado);
  const infoBilhetePremiado = useRecoilValue(stateInfoBilhetePremiado)

  const infoBilhetePremiadoFilter = infoBilhetePremiado.data?.data;
  const tituloRifa = infoBilhetePremiado.selectSearch.title;

  return (
    <div className="">
      <Table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Rifa</th>
            <th>Data</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {infoBilhetePremiadoFilter && (
            <tr className="raffle-item">
              <td>{infoBilhetePremiadoFilter.name} {infoBilhetePremiadoFilter?.surname}</td>
              <td>{tituloRifa}</td>
              <td>{infoBilhetePremiadoFilter?.created_at}</td>
              <td>
                <div className="button-group">
                  <a
                    href="#"
                    className="button-edit"
                    onClick={() => setOpenModalTrocarBilhete(!openModalTrocarBilhete)}
                  >
                    <i className="fas fa-edit"></i> Editar
                  </a>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}
