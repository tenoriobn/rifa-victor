import styled from "styled-components"
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

    background: 0 0;
    border: 1px solid #275680;
    color: #fff;
    display: block;
    height: 40px;
    margin-right: 5px;
    border-radius: 5px;
  }

  .category select option {
    background: #000;
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
  return (
    <form action="https://dash.alimaprojetos.com/dashboard/rifas/add" id="frmRaffle" className="dropzone" method="POST">
      <CategoryContainer className="category-container">
        <Geral />
        <Cotas />
        <DataPagamento />
        <Promocoes />
        <Campanhas />
        <Outros />
        <DescricaoProduto />
        <DescricaoSorteio />
        <Regulamento />
        <PedidoAprovado />

        <button 
          type="submit" 
          className="success" 
          id="btnSend" 
        >
          ADICIONAR
        </button>
      </CategoryContainer>
    </form>
  )
}
