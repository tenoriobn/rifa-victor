import styled from "styled-components";
import Header from "../../../components/Header/Header";
import SorteioSearchForm from "./SorteioSearchForm/SorteioSearchForm";
import { Main } from "../../../components/AdminLayout/AdminLayout";
import { useParams } from "react-router-dom";
import FiltroSorteioTable from "./FiltroSorteioTable/FiltroSorteioTable";
import { useState } from "react";
import { useEffect } from "react";
import { fetchDados } from "../../../common/http/http";

const SorteioSearchContainer = styled.div`
  display: flex;
  flex-direction: column;

  h2 {
    display: flex;
    justify-content: center;
    align-items: center;
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
  const { id } = useParams();
  const [rifaInfo, setRifaInfo] = useState('')
  const baseURL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const obterDados = async () => {
      const response = await fetchDados(`/admin/dashboard/consulta-cota/${id}`);

      setRifaInfo(response.data)
    };
  
    obterDados();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section>
      <Header>
        <h2>
          <a href={`/dashboard/rifas/editar/${id}`}>
            <i style={{ color: "orangered" }} className="fa-solid fa-angle-double-left"></i>
          </a> <i className="fas fa-gift"></i> SORTEIO - {rifaInfo.title} 
        </h2>
      </Header>

      <Main>
        <SorteioSearchContainer>
          {
            rifaInfo?.rifa_image?.[0]?.path ? 
            <h2>
              <img src={`${baseURL}/img/rifas/${rifaInfo.rifa_image[0].path}`} alt={rifaInfo?.title || 'Imagem não disponível'} />
            </h2>
            : ''
          }
          <SorteioSearchForm />
          <FiltroSorteioTable />
        </SorteioSearchContainer>
      </Main>
    </section>
  )
}
