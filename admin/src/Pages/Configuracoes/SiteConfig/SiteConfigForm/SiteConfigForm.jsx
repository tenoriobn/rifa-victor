/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import styled from "styled-components";
import ConfiguracoesInputs from "./ConfiguracoesInputs/ConfiguracoesInputs";
import SiteConfigSeo from "./SiteConfigSeo/SiteConfigSeo";
import SuporteContato from "./SuporteContato/SuporteContato";
import { useRecoilState } from "recoil";
import { stateSiteConfig } from "../../../../common/states/atom";
import { fetchDados, postDados } from "../../../../common/http/http";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CategoryContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 20px;

  .category {
    flex-basis: calc(50% - 30px);
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

  .category input,
  .category textarea {
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
    resize: none;
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

  .success {
    transition: all .3s ease-in-out;
  }

  .success:hover {
    opacity: .8;
  }

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export default function SiteConfigForm() {
  const [siteConfig, setSiteConfig] = useRecoilState(stateSiteConfig);
  const [loading, setLoading] = useState(false);
  const [atualizaTabela, setAtualizaTabela] = useState(false);

  const obterDados = async () => {
    const response = await fetchDados(`/dashboard/site-settings`);
    setSiteConfig(response.data);
  };

  useEffect(() => {
    obterDados();
  }, []);

  const handleSaveChanges = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      await postDados("admin/dashboard/site-settings/editar", siteConfig);
      setAtualizaTabela(true);
      toast.success('Configurações atualizadas!');
    } catch (error) {
      console.error("Erro ao enviar dados:", error);
      toast.error(error.response.data.response || 'Erro ao atualizar configurações');
    } finally {
      setLoading(false);
    }
  };

    useEffect(() => {
    if(atualizaTabela) {
      obterDados();
      setAtualizaTabela(false)
    }
  }, [atualizaTabela]);

  return (
    <form onSubmit={handleSaveChanges} action="http://127.0.0.1:5173/dashboard/rifas/add" id="frmRaffle" className="dropzone" method="POST">
      <CategoryContainer className="category-container">
        <ConfiguracoesInputs />
        <SiteConfigSeo />
        <SuporteContato />

        <button 
          type="submit" 
          className="success" 
          id="btnSend"
          disabled={loading} // Desabilita o botão durante o envio
        >
          {loading ? "Salvando..." : "ADICIONAR"}
        </button>
      </CategoryContainer>

      <ToastContainer theme="colored"/>
    </form>
  );
}
