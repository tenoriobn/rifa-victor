/* eslint-disable react/prop-types */
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { stateOpenModalEditarPacote, statePacote, stateTabelaPacotesInfo, stateUserLogin, stateIdModal } from "../../../../common/states/atom";
import { fetchDados } from "../../../../common/http/http";
import useCurrencyFormatTable from "../../../../common/states/Hook/useCurrencyFormatTable/useCurrencyFormatTable";
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
    border-spacing: 0 1em;
  }

  th {
    text-align: center;
    padding-bottom: 1.25rem;
    font-weight: 500;
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
    padding: .3125rem .625rem;
    border-radius: .3125rem;
    color: white;
    font-weight: bold;
    text-align: center;
    display: inline-block;
    text-transform: uppercase;
  }
  .status-inconsistente {
    background-color: #17a2b8;
  }

  .status-pago {
    background-color: #28a745;
  }

  .status-cancelado {
    background-color: #dc3545;
  }

  .button-group {
    display: flex;
    gap: .3125rem;
    justify-content: center;
    align-items: center;
  }

  .button-edit {
    background-color: #f4b400;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 10px 15px;
    cursor: pointer;
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

export default function PacoteTable() {
  const [openModalEditarPacote, setOpenModalEditarPacote] = useRecoilState(stateOpenModalEditarPacote);
  const tabelaPacotesInfo = useRecoilValue(stateTabelaPacotesInfo);
  const userLogin = useRecoilValue(stateUserLogin);
  const setPacote = useSetRecoilState(statePacote)
  const setIdModal = useSetRecoilState(stateIdModal);
  const { formatCurrency } = useCurrencyFormatTable();
  const { formattedDate } = useFormattedDate();

  const handleEditar = async (id) => {
    setOpenModalEditarPacote(!openModalEditarPacote)

    const response = await fetchDados(`admin/dashboard/pacote/${id}`, userLogin);
    setPacote(response.data);

    setIdModal(id);
  }

  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>ID</th>
            <th>Quantidade</th>
            <th>$ Total</th>
            <th>$ Cota</th>
            <th>Popular</th>
            <th>Cod. Promocional</th>
            <th>Faturado</th>
            <th>Status</th>
            <th>Criado em</th>
            <th>Alterado em</th>
            <th>Ações</th>
        </tr>
        </thead>

        <tbody>
          {tabelaPacotesInfo.map((pacote, index) => (
              <tr key={index} className="raffle-item">
                <td>#{index + 1}</td>
                <td>{pacote.id}</td>
                <td>{pacote.qntd_cota}</td>
                <td>R$ {formatCurrency(pacote.valor_total)}</td>
                <td>R$ {formatCurrency(pacote.value_cota)}</td>
                <td>
                  <span className={`status-tag ${pacote.popular === 'sim' ? 'status-pago' : 'status-inconsistente'}`}>
                    {pacote.popular}
                  </span>
                </td>
                <td>{pacote.cod_promo}</td>
                <td>R$</td>
                <td>
                  <span className={`status-tag ${pacote.status === 'Ativo' ? 'status-pago' : 'status-cancelado'}`}>
                    {pacote.status}
                  </span>
                </td>
                <td>{formattedDate(pacote.created_at)}</td>
                <td>{formattedDate(pacote.updated_at)}</td>
                <td>
                  <div className="button-group">
                    <a className="button-edit" onClick={() => handleEditar(pacote.id)}>
                      <i className="fas fa-edit"></i> Editar
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
