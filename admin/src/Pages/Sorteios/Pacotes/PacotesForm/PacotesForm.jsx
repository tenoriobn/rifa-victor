import styled from "styled-components";
import seta from "../../../../assets/icons/seta.svg";

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
    background-image: url(${seta});
    background-repeat: no-repeat;
    background-position: right 10px center;
    background-size: 12px 12px;

    background-color: #20202a;
    color: #fff;
    border: .0625rem solid #275680;
    padding: .625rem;
    border-radius: .3125rem;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    width: 100%;
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
`;

export default function FormPacotes() {
  return (
    <Form method="POST" action="/dashboard/rifas/cotas/174">
      <div className="filter-item">
        <label htmlFor="cod_promo">Cod. Promocional</label>
        <input type="text" className="frm_add_pkg" name="cod_promo" defaultValue="" />
      </div>

      <div className="filter-item">
        <label htmlFor="init_date">Mais Popular:</label>
        <select name="most_popular">
          <option defaultValue="">- Todos -</option>
          <option defaultValue="Y">Sim</option>
          <option defaultValue="N">Não</option>
        </select>
      </div>

      <div className="filter-item">
        <label htmlFor="init_date">Státus:</label>
        <select name="st">
          <option defaultValue="">- Todos -</option>
          <option defaultValue="A">Ativo</option>
          <option defaultValue="F">Finalizado</option>
        </select>
      </div>

      <div className="filter-item">
        <label htmlFor="orderby">Ordem:</label>
        <select name="orderby" id="orderby">
          <option defaultValue="qtdAsc">Qtd. Menor - Maior</option>
          <option defaultValue="qtdDesc">Qtd. Maior - Menor</option>
          <option defaultValue="faturadoAsc">Faturamento Menor - Maior</option>
          <option defaultValue="faturadoDesc">Faturamento Maior - Menor</option>
          <option defaultValue="totalAsc">Total Menor - Maior</option>
          <option defaultValue="totalDesc">Total Maior - Menor</option>
          <option defaultValue="created">Criado em - Novo</option>
          <option defaultValue="updated">Alterado em - Novo</option>
        </select>
      </div>

      <button type="submit" className="button-search">
        <i className="fas fa-search"></i> Filtrar
      </button>
    </Form>
  )
}
