/* eslint-disable react/prop-types */
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { stateIdModalAcoesSorteio, stateOpenModalAcoesSorteio, stateUserLogin } from "../../../common/states/atom";
import { useEffect, useState } from "react";
import { fetchDados, putDados } from "../../../common/http/http";

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

// const sorteios = [
//   {
//     id: "174",
//     nome: "SAVEIRO CROSS DOS SONHOS",
//     dataSorteio: "-",
//     faturamentoTotal: "R$ 48.946,31",
//     faturamentoHoje: "R$ 458,40",
//     cotasVendidas: "254.279",
//     percentualVendidas: "25.43%",
//     cotasReservadas: "330",
//     status: "Ativa",
//     imgSrc: "https://imagedelivery.net/TuyDlh37fwpu3jSKwZ3-9g/2a6e9600-32e1-44d2-8fff-801b4abe3e00/thumb",
//     dashboardLink: "/dashboard/rifas/dashboard/174"
//   },
//   {
//     id: "175",
//     nome: "SAVEIRO CROSS DOS SONHOS",
//     dataSorteio: "-",
//     faturamentoTotal: "R$ 48.946,31",
//     faturamentoHoje: "R$ 458,40",
//     cotasVendidas: "254.279",
//     percentualVendidas: "25.43%",
//     cotasReservadas: "330",
//     status: "Ativa",
//     imgSrc: "https://imagedelivery.net/TuyDlh37fwpu3jSKwZ3-9g/2a6e9600-32e1-44d2-8fff-801b4abe3e00/thumb",
//     dashboardLink: "/dashboard/rifas/dashboard/174"
//   },
//   // Adicione mais objetos de sorteios conforme necessário
// ];

export default function TabelaSorteio() {
  const [openModalAcoesSorteio, setOpenModalAcoesSorteio] = useRecoilState(stateOpenModalAcoesSorteio);
  const setIdModalAcoesSorteio = useSetRecoilState(stateIdModalAcoesSorteio);
  const [sorteios, setSorteios] = useState([]);
  const userLogin = useRecoilValue(stateUserLogin)

  console.log(userLogin)

  useEffect(() => {
    const obterDados = async () => {
      try {
        const response = await fetchDados('/admin/dashboard/rifas', userLogin);
        console.log('response:', response);
  
        setSorteios(response.data)
      } catch (error) {
        console.error('Erro ao fazer POST:', error);
      }
    };
    
    obterDados();
  }, []);

  const handleFinalizar = async (id) => {
    const confirmacao = window.confirm('Tem certeza que deseja finalizar esta rifa?');
    if (confirmacao) {
      try {
        await putDados(`admin/finalizar/rifas/${id}`, userLogin);
        setSorteios((prevSorteios) => prevSorteios.filter(sorteio => sorteio.id !== id));
        alert('Rifa finalizada com sucesso!');
      } catch (error) {
        console.error('Erro ao finalizar a rifa:', error);
        alert('Erro ao finalizar a rifa. Tente novamente.');
      }
    }
  };

  const handlePegaIdModal = (id) => {
    setOpenModalAcoesSorteio(!openModalAcoesSorteio);
    setIdModalAcoesSorteio(id);

    console.log('id modal: ', id)
  }

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
          {sorteios.map((sorteio, index) => (
            <tr key={index}>
              <td className="spacing">
                <img src={sorteio.imgSrc} alt="#" />
              </td>
              <td>#{sorteio.id}</td>
              <td>
                <a href="" target="_blank">
                  <i className="fa-solid fa-link"></i>
                </a>
                <b>{sorteio.title
                }</b>
              </td>
              <td>{sorteio.data_sortition}</td>
              <td>{sorteio.faturamentoTotal}</td>
              <td>{sorteio.faturamentoHoje}</td>
              <td>{sorteio.cotasVendidas}</td>
              <td><b>{sorteio.percentualVendidas}</b></td>
              <td>{sorteio.cotasReservadas}</td>
              <td>
                <span className="status-tag status-pago">{sorteio.status}</span>
              </td>
              <td>
                <div className="button-group">
                  <a className="button-delete" href="#" onClick={() => handleFinalizar(sorteio.id)} >
                    <i className="fa-solid fa-toggle-on"></i> Finalizar
                  </a>
                  <Link className="button-dashboard" to={sorteio.dashboardLink}>
                    <ion-icon name="stats-chart" role="img" className="md hydrated"></ion-icon> Dashboard
                  </Link>
                  <button 
                    className="button-edit" 
                    onClick={() => handlePegaIdModal(sorteio.id)}
                  >
                    <i className="fas fa-bars"></i> Ações
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
