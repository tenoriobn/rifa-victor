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
  const [orderFilter, setOrderFilter] = useState({});
  // const [tabelaUpsellInfo, setTabelaUpsellInfo] = useRecoilState(state....);

  console.log(orderFilter)

    // const handleSubmit = async (e) => {
  //   if (e) e.preventDefault();
  //   try {
  //     const response = await postDados('/admin/dashboard/ rota aqui', orderFilter);
  //     setTabelaUpsellInfo(response);
  //   } catch (error) {
  //     console.error("There was an error fetching the data!", error);
  //   }
  // };

  // console.log(tabelaUpsellInfo)

  return (
        // onSubmit={handleSubmit}
    <Form method="POST" action="/dashboard/rifas/cotas/174">
      <div className="filter-item">
        <label htmlFor="init_date">Localização:</label>
        <select name="position"
          onChange={(e) => setOrderFilter({ ...orderFilter, localizacao: e.target.value })} 
          value={orderFilter.localizacao || ''}
        >
          <option value="">- Todos -</option>
          <option value="checkout">No Checkout</option>
          <option value="paid">Após Pagto</option>
        </select>
      </div>

      <div className="filter-item">
        <label htmlFor="init_date">Status:</label>
        <select name="st" id="frm_st"
          onChange={(e) => setOrderFilter({ ...orderFilter, status: e.target.value })} 
          value={orderFilter.status || ''}
        >
            <option value="">- Todos -</option>
            <option value="A">Ativo</option>
            <option value="F">Finalizado</option>
        </select>
      </div>

      <button type="submit" className="button-search">
        <i className="fas fa-search"></i> Filtrar
      </button>
    </Form>
  )
}
