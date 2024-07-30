import { useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { postDados } from "../../../../../common/http/http";
import { useRecoilState } from "recoil";
import { stateTabelaCotasInfo } from "../../../../../common/states/atom";
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

  .filter-item label {
    display: block;
    margin-bottom: .3125rem;
    color: #f5f5f5;
  }

  select {
    background-color: #20202a;
    color: #fff;
    border: .0625rem solid #275680;
    padding: .625rem;
    border-radius: .3125rem;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    height: 40px;
    width: 100%;
    line-height: normal;
    padding-right: 30px;
  }

  .button-search {
    background-color: #858796;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 10px 15px;
    cursor: pointer;
    height: 40px;
    display: flex;
    align-items: center;
    gap: 5px;
  }
`;

export default function CotasForm() {
  const [orderFilter, setOrderFilter] = useState({});
  const { id } = useParams();
  const [tabelaCotasInfo, setTabelaCotasInfo] = useRecoilState(stateTabelaCotasInfo);


  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    try {
      const response = await postDados(`/admin/dashboard/bilhete-premiado/filtro/${id}`, orderFilter);
      setTabelaCotasInfo(response);
    } catch (error) {
      console.error("There was an error fetching the data!", error);
    }
  };

  console.log(tabelaCotasInfo)
    
  return (
    // onSubmit={handleSubmit}
    <Form method="POST" onSubmit={handleSubmit}>
      <div className="filter-item" style={{ minWidth: "260px"}}>
        <label htmlFor="init_date">Mostrar no site:</label>
        <select name="mostraSite"
          onChange={(e) => setOrderFilter({ ...orderFilter, mostraSite: e.target.value })} 
          value={orderFilter.mostraSite || ''}
        >
          <option value="" >- Todos -</option>
          <option value="sim">Sim</option>
          <option value="nao">Não</option>
        </select>
      </div>

      <div className="filter-item">
        <label htmlFor="init_date">Status:</label>
        <select name="status" id="frm_st"
          onChange={(e) => setOrderFilter({ ...orderFilter, status: e.target.value })}
          value={orderFilter.status || ''}
        >
          <option value="" >- Todos -</option>
          <option value="disponivel">Disponivel</option>
          <option value="bloqueada">Bloqueada</option>
          <option value="imediato">Imediato</option>
          <option value="confirmada">Confirmada</option>
          <option value="resgatada">Resgatada</option>
        </select>
      </div>

      <button type="submit" className="button-search">
        <i className="fas fa-search"></i> Filtrar
      </button>
    </Form>
  )
}
