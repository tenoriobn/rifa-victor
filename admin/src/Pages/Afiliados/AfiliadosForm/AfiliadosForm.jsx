import { useState } from "react";
import { PatternFormat } from "react-number-format";
import { useSetRecoilState } from "recoil";import styled from "styled-components";
import { stateAfiliadosInfoTable } from "../../../common/states/atom";
import { postDados } from "../../../common/http/http";

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-end;
  gap: .625rem;
  margin: 1.875rem 0;

  .filter-item {
    flex-grow: 1;
    max-width: 300px;
  }

  input {
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

  .filter-item label {
    display: block;
    margin-bottom: .3125rem;
    color: #f5f5f5;
  }

  .button-search {
    background-color: #858796;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 10px 15px;
    cursor: pointer;
    height: 38px;
  }

  .time, .filter-item__time {
    max-width: 114px;
    width: 100%;

    &::-webkit-calendar-picker-indicator {
      filter: invert(1);
    }
  }
`;

export default function AfiliadosForm() {
  const [filtro, setFiltro] = useState({});
  const setAfiliadosInfoTable =  useSetRecoilState(stateAfiliadosInfoTable);

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    try {
      const response = await postDados('/admin/dashboard/afiliado/filtro', filtro);
      setAfiliadosInfoTable(response.data)
    } catch (error) {
      console.error("There was an error fetching the data!", error);
    }
  };

  return (
        // onSubmit={handleSubmit}
    <Form onSubmit={handleSubmit} method="POST">
      <div className="filter-item">
        <label htmlFor="name">Nome:</label>
        <input
          type="text"
          name="name"
          placeholder="Pesquise pelo nome"
          onChange={(e) => setFiltro({ ...filtro, name: e.target.value })} 
          value={filtro.name || ''}
          autoComplete="off"
        />
      </div>

      <div className="filter-item">
        <label htmlFor="cellphone">Telefone:</label>
        <PatternFormat
          format="(##) #####-####"
          type="text"
          name="cellphone"
          placeholder="Pesquise pelo telefone"
          onChange={(e) => setFiltro({ ...filtro, cellphone: e.target.value })} 
          value={filtro.cellphone || ''}
          autoComplete="off"
        />
      </div>

      <button type="submit" className="button-search">
        <i className="fas fa-search"></i> Filtrar
      </button>
    </Form>
  );
}
