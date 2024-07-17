import styled from "styled-components";
import { Main } from "../../../components/AdminLayout/AdminLayout";
import Header from "../../../components/Header/Header";
import ConsultaCotaForm from "./ConsultaCotaForm/ConsultaCotaForm";
import { useParams } from "react-router-dom";

const ConsultaCotaContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h2 img {
    max-width: 400px;
    width: 100%;
  }

  .title {
    color: #adacac;
    text-transform: uppercase;
    font-size: 1.25rem;
    font-weight: 600;
    margin: 1.25rem 0 .875rem 0;
    text-align: center;
  }

  .result-info {
    font-size: 1.5rem;
    font-weight: 700;
    margin-top: 4rem;
    text-align: center;
  }
`;

export default function ConsultaCota() {
  const { id } = useParams();

  return (
    <div>
      <Header>
        <h2>
          <a href={`/dashboard/rifas/dashboard/${id}`}>
            <i style={{color: "orangered"}} className="fa-solid fa-angle-double-left"></i>
          </a> <i className="fa-brands fa-searchengin"></i> Consulta Cota
        </h2>
      </Header>

      <Main>
        <ConsultaCotaContainer>
          <h2>
            <img src="https://imagedelivery.net/TuyDlh37fwpu3jSKwZ3-9g/2a6e9600-32e1-44d2-8fff-801b4abe3e00/rifa?>" />
          </h2>

          <h1 className="title">SAVEIRO CROSS DOS SONHOS </h1>

          <ConsultaCotaForm />

          <h2 className="result-info"><i className="fa-solid fa-circle-exclamation"></i> NENHUM RESULTADO ENCONTRADO</h2>
        </ConsultaCotaContainer>
      </Main>

    </div>
  )
}
