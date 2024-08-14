/* eslint-disable react/prop-types */
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components"
import { stateConfigPagamento, stateOpenModalAdicionarConfPagamento } from "../../../../../common/states/atom";
import { postDados } from "../../../../../common/http/http";

const Form = styled.form`
  font-size: .9rem;
  width: 100%;

  label {
    display: block;
  }

  input {
    display: block;
    margin-bottom: 10px;
    width: 100%;
    height: 40px;
    border-radius: 5px;
    background: #41414b;
    border: none;
    outline: 0;
    margin-top: 10px;
    padding: 10px 5px;
    color: #fff;
    box-sizing: border-box;
  }

  select {
    display: block;
    margin-bottom: 10px;
    width: 100%;
    height: 40px;
    border-radius: 5px;
    background-color: #41414b;
    border: none;
    outline: 0;
    margin-top: 10px;
    padding: 10px 5px;
    color: #fff;
  }

  input[type=submit] {
    background-color: #07b353;
    color: #fff;
    font-weight: 700;
    width: 100%;
    height: 40px;
    border-radius: 5px;
    outline: 0;
    border: none;
    cursor: pointer;
    margin-top: 20px;
    transition: all .3s ease-in-out;
  }

  input[type=submit]:hover {
    opacity: .8;
  }
`;

export default function ModalAdicionarPagamento({setAtualizaTabela}) {
  const setOpenModalAdicionarConfPagamento = useSetRecoilState(stateOpenModalAdicionarConfPagamento);
  const [formConfigPagamento, setFormConfigPagamento] = useRecoilState(stateConfigPagamento);

  const handleSaveChanges = async (event) => {
    event.preventDefault();

    try {
      await postDados("admin/dashboard/payment/make", formConfigPagamento);

      setAtualizaTabela(true);

      setOpenModalAdicionarConfPagamento(false);

    } catch (error) {
      console.error("Erro ao enviar dados:", error);
    }
  };

  return (
    <Form action="" id="frmAddPack" method="POST" onSubmit={handleSaveChanges}>
      <label htmlFor="">
        Gateway
        <input type="text" id="gateway" name="gateway"
          value={formConfigPagamento.gateway || ''}  
          onChange={(e) => setFormConfigPagamento({ ...formConfigPagamento, gateway: e.target.value })} 
        />
      </label>

      <label htmlFor="">
        Nome
        <input 
          type="text" id="MPname" name="name" required=""
          value={formConfigPagamento.name || ''} 
          onChange={(e) => setFormConfigPagamento({ ...formConfigPagamento, name: e.target.value })} 
        />
      </label>

      <label htmlFor="">
        Api Client Id
        <input 
          type="text" id="MPapi_client_id" name="api_client_id" required="" 
          value={formConfigPagamento.api_client_id || ''} 
          onChange={(e) => setFormConfigPagamento({ ...formConfigPagamento, api_client_id: e.target.value })}   
        />
      </label>

      <label htmlFor="">
        Client Key
        <input type="text" id="MPpublic_key" name="public_key" required="" 
          value={formConfigPagamento.public_key || ''} 
          onChange={(e) => setFormConfigPagamento({ ...formConfigPagamento, public_key: e.target.value })} 
        />
      </label>

      <label htmlFor="">
        Nome na Fatura
        <input type="text" id="MPstatement_descriptor" name="statement_descriptor"
          value={formConfigPagamento.billing_name || ''}  
          onChange={(e) => setFormConfigPagamento({ ...formConfigPagamento, billing_name: e.target.value })} 
        />
      </label>
      <input id="sendEditPack" type="submit" value="Atualizar" />
    </Form>
  )
}
