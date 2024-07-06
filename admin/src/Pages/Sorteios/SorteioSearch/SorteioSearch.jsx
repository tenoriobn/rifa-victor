import styled from "styled-components";
import Header from "../../../components/Header/Header";
import SorteioSearchForm from "./SorteioSearchForm/SorteioSearchForm";
import { Main } from "../../../components/AdminLayout/AdminLayout";

const SorteioSearchContainer = styled.div`
  display: flex;
  flex-direction: column;

  h2 {
    text-align: center;
    color: #f5f5f5;
    margin-bottom: 15px;
  }

  h2 img {
    max-width: 400px;
    width: 100%;
  }

  .result-info {
    font-size: 1.5rem;
    font-weight: 700;
    margin-top: 4rem;
    text-align: center;
  }
`;

export default function SorteioSearch() {
  return (
    <section>
      <Header>
        <h2>
          <a href="/dashboard/rifas/editar/174">
            <i style={{ color: "orangered" }} className="fa-solid fa-angle-double-left"></i>
          </a> <i className="fas fa-gift"></i> SORTEIO - SAVEIRO CROSS DOS SONHOS 
        </h2>
      </Header>

      <Main>
        <SorteioSearchContainer>
          <h2>
            <img src="https://imagedelivery.net/TuyDlh37fwpu3jSKwZ3-9g/2a6e9600-32e1-44d2-8fff-801b4abe3e00/rifa?>" />
          </h2>

          <SorteioSearchForm />

          <h2 className="result-info"><i className="fa-solid fa-circle-exclamation"></i> CLIQUE EM SORTEAR E VEJA O RESULTADO!</h2>
        </SorteioSearchContainer>
      </Main>
    </section>
  )
}
