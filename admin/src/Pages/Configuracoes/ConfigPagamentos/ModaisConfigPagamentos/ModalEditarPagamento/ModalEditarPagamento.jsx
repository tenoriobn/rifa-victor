/* eslint-disable react/prop-types */
import styled from "styled-components"
import { useRecoilState, useSetRecoilState, useRecoilValue } from "recoil";
import { stateConfigPagamento, stateOpenModalEditarConfPagamento, stateUserLogin } from "../../../../../common/states/atom";
import { putDados } from "../../../../../common/http/http";

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

export default function ModalEditarPagamento({setAtualizaTabela}) {
  const [formConfigPagamento, setFormConfigPagamento] = useRecoilState(stateConfigPagamento);
  const setOpenModalEditarConfPagamento = useSetRecoilState(stateOpenModalEditarConfPagamento);
  const userLogin = useRecoilValue(stateUserLogin);

  const handleSaveChanges = async (event) => {
    event.preventDefault();

    try {
      await putDados("admin/dashboard/payment/update", formConfigPagamento, userLogin);
      setFormConfigPagamento('');

      setAtualizaTabela(true);

      setOpenModalEditarConfPagamento(false);

    } catch (error) {
      console.error("Erro ao enviar dados:", error);
    }
  };

  return (
    <Form action="" id="frmAddPack" method="POST" onSubmit={handleSaveChanges}>
      <label htmlFor="">
        Gateway
        <input type="text" id="gateway" name="gateway" required
          value={formConfigPagamento.gateway || ''}  
          onChange={(e) => setFormConfigPagamento({ ...formConfigPagamento, gateway: e.target.value })} 
        />
      </label>

      <label htmlFor="">
        Nome
        <input 
          type="text" id="MPname" name="name" required
          value={formConfigPagamento.name || ''} 
          onChange={(e) => setFormConfigPagamento({ ...formConfigPagamento, name: e.target.value })} 
        />
      </label>

      <label htmlFor="">
        Token
        <input 
          type="text" id="MPtoken" name="token" required 
          value={formConfigPagamento.token || ''} 
          onChange={(e) => setFormConfigPagamento({ ...formConfigPagamento, token: e.target.value })}   
        />
      </label>

      <label htmlFor="">
        Public Key
        <input type="text" id="MPpublic_key" name="public_key" required 
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
