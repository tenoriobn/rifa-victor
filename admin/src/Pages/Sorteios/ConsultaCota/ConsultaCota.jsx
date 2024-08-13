/* eslint-disable react-hooks/exhaustive-deps */
import styled from "styled-components";
import { Main } from "../../../components/AdminLayout/AdminLayout";
import Header from "../../../components/Header/Header";
import ConsultaCotaForm from "./ConsultaCotaForm/ConsultaCotaForm";
import { useParams } from "react-router-dom";
import { fetchDados } from "../../../common/http/http";
import { useEffect } from "react";
import FiltroCotaTable from "./FiltroCotaTable/FiltroCotaTable";
import { useState } from "react";

const ConsultaCotaContainer = styled.div`
  display: flex;
  flex-direction: column;

  .container-img {
    align-self: center;
  }

  .container-img img {
    max-width: 400px;
    width: 100%;
    align-self: center;
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
  const [rifaInfo, setRifaInfo] = useState('')
  const baseURL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const obterDados = async () => {
      const response = await fetchDados(`/admin/dashboard/consulta-cota/${id}`);

      setRifaInfo(response.data)
    };
  
    obterDados();
  }, []);

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
          <div className="container-img">
          {
            rifaInfo?.rifa_image?.[0]?.path ? 
            <img src={`${baseURL}/img/rifas/${rifaInfo.rifa_image[0].path}`} alt={rifaInfo?.title || 'Imagem não disponível'} />
            : ''
          }
          </div>

          <h1 className="title">{rifaInfo.title} </h1>

          <ConsultaCotaForm />
          <FiltroCotaTable />
        </ConsultaCotaContainer>
      </Main>

    </div>
  )
}
