import { useState } from "react";
import styled from "styled-components";

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

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export default function MeusDadosForm() {
  const [formDadosUsuario, setFormDadosUsuarios] = useState({
    name: "Ana Lima",
    email: "anaplima2001@gmail.com",
    phone: "43996403859",
    document: "01219599964"
  });

  console.log(formDadosUsuario)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormDadosUsuarios((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // const response = await postDados("http://127.0.0.1:5173/dashboard/clients/save/27", formDadosUsuario);
      // console.log("Dados atualizados com sucesso:", response.data);
    } catch (error) {
      console.error("Erro ao atualizar dados:", error);
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
              value={formDadosUsuario.name} 
              onChange={handleChange} 
              required 
            />
          </label>

          <label htmlFor="email">
            Email
            <input 
              type="text" 
              name="email" 
              value={formDadosUsuario.email} 
              onChange={handleChange} 
              required 
            />
          </label>

          <label htmlFor="phone">
            Telefone
            <input 
              type="text" 
              maxLength="15" 
              id="phone" 
              name="phone" 
              value={formDadosUsuario.phone} 
              onChange={handleChange} 
              required 
            />
          </label>

          <label htmlFor="document">
            CPF
            <input 
              type="text" 
              maxLength="14" 
              id="document" 
              name="document" 
              value={formDadosUsuario.document} 
              onChange={handleChange} 
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
    </form>
  );
}
