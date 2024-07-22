import { useState } from "react";
import styled from "styled-components";

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

export default function FormPacotes() {
  const [orderFilter, setOrderFilter] = useState({});

  console.log('orderFilter', orderFilter)

  return (
    <Form method="POST" action="/dashboard/rifas/cotas/174">
      <div className="filter-item">
        <label htmlFor="cod_promo">Cod. Promocional</label>
        <input type="text" className="frm_add_pkg" name="cod_promo" 
          onChange={(e) => setOrderFilter({ ...orderFilter, codPromo: e.target.value })} 
          value={orderFilter.codPromo || ''}
        />
      </div>

      <div className="filter-item">
        <label htmlFor="init_date">Mais Popular:</label>
        <select name="most_popular"
          onChange={(e) => setOrderFilter({ ...orderFilter, maisPopular: e.target.value })} 
          value={orderFilter.maisPopular || ''}
        >
          <option value="">- Todos -</option>
          <option value="sim">Sim</option>
          <option value="nao">Não</option>
        </select>
      </div>

      <div className="filter-item">
        <label htmlFor="init_date">Status:</label>
        <select name="st"
          onChange={(e) => setOrderFilter({ ...orderFilter, status: e.target.value })} 
          value={orderFilter.status || ''}
        >
          <option value="">- Todos -</option>
          <option value="A">Ativo</option>
          <option value="F">Finalizado</option>
        </select>
      </div>

      <div className="filter-item">
        <label htmlFor="orderby">Ordem:</label>
        <select name="orderby" id="orderby"
          onChange={(e) => setOrderFilter({ ...orderFilter, ordem: e.target.value })} 
          value={orderFilter.ordem || ''}
        >
          <option value="qtdAsc">Qtd. Menor - Maior</option>
          <option value="qtdDesc">Qtd. Maior - Menor</option>
          <option value="faturadoAsc">Faturamento Menor - Maior</option>
          <option value="faturadoDesc">Faturamento Maior - Menor</option>
          <option value="totalAsc">Total Menor - Maior</option>
          <option value="totalDesc">Total Maior - Menor</option>
          <option value="created">Criado em - Novo</option>
          <option value="updated">Alterado em - Novo</option>
        </select>
      </div>

      <button type="submit" className="button-search">
        <i className="fas fa-search"></i> Filtrar
      </button>
    </Form>
  )
}
