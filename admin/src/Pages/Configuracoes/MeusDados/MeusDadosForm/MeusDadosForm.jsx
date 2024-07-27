import styled from "styled-components";
import { putDados } from "../../../../common/http/http";
import { useRecoilState, useRecoilValue } from "recoil";
import { stateUserDate, stateUserLogin } from "../../../../common/states/atom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {PatternFormat } from "react-number-format";

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

  .category input, .category textarea {
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

export default function MeusDadosForm() {
  const [formDadosUsuario, setFormDadosUsuarios] = useRecoilState(stateUserDate);
  const userLogin = useRecoilValue(stateUserLogin);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await putDados("admin/dashboard/usuarios/editar", formDadosUsuario, userLogin);
      toast.success('Dados atualizadas!');
    } catch (error) {
      console.error("Erro ao atualizar dados:", error);
      toast.error(error.response.data.response || 'Erro ao atualizar Dados!');
    }
  };

  return (
    <form onSubmit={handleSubmit} id="frmRaffle" className="dropzone" method="POST">
      <CategoryContainer className="category-container">
        <div className="category">
          <h3>MEUS DADOS</h3>

          <label htmlFor="name">
            Nome
            <input 
              type="text" 
              name="name" 
              value={formDadosUsuario.name || ''} 
              onChange={(e) => setFormDadosUsuarios({ ...formDadosUsuario, name: e.target.value })} 
              required 
            />
          </label>

          <label htmlFor="email">
            Email
            <input 
              type="text" 
              name="email" 
              value={formDadosUsuario.email || ''} 
              onChange={(e) => setFormDadosUsuarios({ ...formDadosUsuario, email: e.target.value })} 
              required 
            />
          </label>

          <label htmlFor="phone">
            Telefone
            <PatternFormat
              format="(##) #####-####"
              type="text" 
              id="phone" 
              name="phone" 
              value={formDadosUsuario.cellphone || ''} 
              onChange={(e) => setFormDadosUsuarios({ ...formDadosUsuario, cellphone: e.target.value })} 
              required 
            />
          </label>

          <label htmlFor="document">
            CPF
            <PatternFormat
              format="###.###.###-##"
              type="text" 
              id="document" 
              name="document" 
              value={formDadosUsuario.cpf || ''} 
              onChange={(e) => setFormDadosUsuarios({ ...formDadosUsuario, cpf: e.target.value })} 
              required 
            />
          </label>
        </div>

        <button 
          type="submit" 
          className="success" 
          id="btnSend"
        >
          ATUALIZAR
        </button>
      </CategoryContainer>

      <ToastContainer theme="colored"/>
    </form>
  );
}
