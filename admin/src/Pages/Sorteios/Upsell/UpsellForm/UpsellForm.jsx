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

export default function UpsellForm() {
  return (
    <Form method="POST" action="/dashboard/rifas/cotas/174">
      <div className="filter-item">
        <label htmlFor="init_date">Localização:</label>
        <select name="position">
          <option defaultValue="">- Todos -</option>
          <option defaultValue="checkout">No Checkout</option>
          <option defaultValue="paid">Após Pagto</option>
        </select>
      </div>

      <div className="filter-item">
        <label htmlFor="init_date">Státus:</label>
        <select name="st" id="frm_st">
            <option defaultValue="">- Todos -</option>
            <option defaultValue="A">Ativo</option>
            <option defaultValue="F">Finalizado</option>
        </select>
      </div>

      <button type="submit" className="button-search">
        <i className="fas fa-search"></i> Filtrar
      </button>
    </Form>
  )
}
