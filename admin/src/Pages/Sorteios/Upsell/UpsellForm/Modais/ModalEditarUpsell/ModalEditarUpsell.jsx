import styled from "styled-components"

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
    background: #41414b;
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

export default function ModalEditarUpsell() {
  return (
    <Form action="/dashboard/rifas/cotas/Edit/174" id="frmAddPack" method="POST">
      <label htmlFor="">
        Quantidade de cotas
        <input type="number" id="frm_qtd" name="qtd"/>
      </label>

      <label htmlFor="">
        Valor por cota
        <input type="text" name="number_price" id="frm_number_price" className="money" disabled />
      </label>

      <label htmlFor="">
        Valor Total
        <input type="text" name="price" id="frm_price" className="money" disabled />
      </label>

      <label htmlFor="">
        Quantidade Minima
        <input type="number" id="frm_qtd_min" name="qtd_min" maxLength="4" required/>
      </label>

      <label htmlFor="">
        Quantidade Máxima
        <input type="number" id="frm_qtd_max" name="qtd_max" maxLength="4" required />
      </label>

      <label htmlFor="">
        Localização
        <select name="position" id="frm_position" required>
          <option value="checkout">No Checkout</option>
          <option value="paid">Após Pagto</option>
        </select>
      </label>

      <label htmlFor="">
        Status
        <select name="st" id="frm_st">
          <option value="A">ATIVO</option>
          <option value="F">FINALIZADO</option>
        </select>
      </label>

      <input id="sendEditPack" type="submit" value="Atualizar" />
    </Form>
  )
}
