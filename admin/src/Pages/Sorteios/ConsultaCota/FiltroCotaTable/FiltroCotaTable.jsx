/* eslint-disable react/prop-types */
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { stateConsultaCota } from "../../../../common/states/atom";
import useFormattedDate from "../../../../common/states/Hook/useFormattedDate";

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

export default function FiltroCotaTable() { 
  const consultaCota = useRecoilValue(stateConsultaCota);
  const { formattedDate } = useFormattedDate();

  const infoCota = consultaCota.data?.data;
  const numeroVencedor = consultaCota.search;

  const formatPhoneNumber = (number) => {
    if (!number) return '';
    // Remove tudo que não é número
    const cleanedNumber = number.replace(/\D/g, '');
  
    // Adiciona o código do país (ex: 55 para Brasil)
    return `55${cleanedNumber}`;
  };

  return (
    <div className="">
    {infoCota ? (
      <Table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Number</th>
            <th>Rifa</th>
            <th>Cota</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          <tr className="raffle-item">
            <td>
                {infoCota?.client?.name} {infoCota?.client?.surname}


                <a href={`https://api.whatsapp.com/send?phone=${formatPhoneNumber(infoCota?.client?.cellphone)}`} target="_blank">{infoCota?.client?.name} {infoCota?.client?.surname}</a>
                <a id="whplnk" href={`https://api.whatsapp.com/send?phone=${formatPhoneNumber(infoCota?.client?.cellphone)}`} target="_blank">&nbsp;
                  &nbsp;<i className="fa-brands fa-whatsapp"></i>
                </a>
            </td>
            <td>{infoCota?.client?.cellphone}</td>
            <td>{infoCota?.rifa?.title}</td>
            <td>{numeroVencedor}</td>
            <td>{formattedDate(infoCota?.created_at)}</td>
            {/* <td>
              <button className="button-view" onClick={() => handleButtonId(item)}>
                <i className="fas fa-eye"></i> VER
              </button>
            </td>  */}
          </tr>
        </tbody>
      </Table>
    ) : (
      <h2 className="result-info">
        <i className="fa-solid fa-circle-exclamation"></i> NENHUM RESULTADO ENCONTRADO
      </h2>
    )}
  </div>
  );
}
