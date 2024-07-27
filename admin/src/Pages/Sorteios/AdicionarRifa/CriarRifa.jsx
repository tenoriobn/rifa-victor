import styled from "styled-components";
import { useState } from "react";
import Geral from "./Geral/Geral";
import Cotas from "./Cotas/Cotas";
import DataPagamento from "./DataPagamentos/DataPagamentos";
import Promocoes from "./Promocoes/Promocoes";
import Campanhas from "./Campanhas/Campanhas";
import Outros from "./Outros/Outros";
import DescricaoProduto from "./DescricaoProduto/DescricaoProduto";
import DescricaoSorteio from "./DescricaoSorteio/DescricaoSorteio";
import Regulamento from "./Regulamento/Regulamento";
import PedidoAprovado from "./PedidoAprovado/PedidoAprovado";
import { Main } from "../../../components/AdminLayout/AdminLayout";
import Header from "../../../components/Header/Header";
import { useRecoilState, useRecoilValue } from "recoil";
import { stateInfoRifaForm, stateUserLogin } from "../../../common/states/atom";
import { postDados } from "../../../common/http/http";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

export const CategoryContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 20px;

  .category {
    flex-basis: calc(50% - 10px);
    padding: 10px;
    background-color: #2e2e36;
    border-radius: 10px;
    box-shadow: 1px 1px 14px -3px #000;
  }

  .full-width {
    flex-basis: 100%!important;
  }

  h3 {
    color: #adacac;
    margin-bottom: 20px;
    font-size: 1.17em;
    font-weight: 700;
  }

  .category label {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 10px;
  }

  .category input {
    display: block;
    height: 40px;
    margin-right: 5px;
    border-radius: 5px;
    color: #fff;
    padding: 10px;
    width: 100%;
    background: 0 0;
    border: 1px solid #275680;
    box-sizing: border-box;
  }

  .category select {
    width: 100%;

    background-color: #2e2e36;
    border: 1px solid #275680;
    color: #fff;
    display: block;
    height: 40px;
    margin-right: 5px;
    border-radius: 5px;
  }

  .category select option {
    background-color: #2e2e36;
  }

  .success {
    border-radius: 5px;
    border: 1px solid #275680;
    padding: 1rem;
    background: #2f7c33;
    color: #fff;
    cursor: pointer;
    height: 60px;
    font-size: 20px;
    width: 100%;
  }

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export default function AdicionarRifa() {
  const [formState, setFormState] = useRecoilState(stateInfoRifaForm);
  const userLogin = useRecoilValue(stateUserLogin);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await postDados('/admin/dashboard/rifas/cadastrar', formState, userLogin);

      setTimeout(() => {
        navigate("/dashboard/rifas/");
        setFormState('');
      }, 1350);

      toast.success('Sorteio criado com sucesso!');

    } catch (error) {
      console.error('Erro ao fazer POST:', error);
      toast.error(error.response.data.response || 'Erro ao criar sorteio');
    } finally {
      setSubmitting(false);
    }
  };
  
  return (
    <>
      <Header>
        <h2><i className="fa-solid fa-dice"></i> NOVO SORTEIO</h2>
      </Header>

      <Main>
        <form action="" id="frmRaffle" className="dropzone" method="POST" onSubmit={handleSubmit}>
          <CategoryContainer className="category-container">
            <Geral />
            <Cotas mostrarCampo={false} />
            <DataPagamento />
            <Promocoes mostrarCampo={false} mostrarQtdNumeros={false} />
            <Campanhas />
            <Outros />
            <DescricaoProduto />
            <DescricaoSorteio />
            <Regulamento />
            <PedidoAprovado />

            <input hidden id="" />

            <button 
              type="submit" 
              className="success" 
              id="btnSend" 
              disabled={submitting}
            >
              {submitting ? 'Enviando...' : 'ADICIONAR'}
            </button>
          </CategoryContainer>

          <ToastContainer theme="colored"/>
        </form>
      </Main>
    </>
  )
}
