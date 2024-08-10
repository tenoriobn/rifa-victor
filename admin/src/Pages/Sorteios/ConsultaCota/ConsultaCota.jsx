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
  const [title, setTitle] = useState('')

  useEffect(() => {
    const obterDados = async () => {
      const response = await fetchDados(`/admin/dashboard/consulta-cota/${id}`);

      setTitle(response.data.title)
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
            <img src="https://imagedelivery.net/TuyDlh37fwpu3jSKwZ3-9g/2a6e9600-32e1-44d2-8fff-801b4abe3e00/rifa?>" />
          </div>

          <h1 className="title">{title} </h1>

          <ConsultaCotaForm />
          <FiltroCotaTable />
        </ConsultaCotaContainer>
      </Main>

    </div>
  )
}
