import styled from "styled-components";

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

export default function ModalAdicionarPacote() {
  return (
    <Form action="/dashboard/rifas/cotas/Edit/174" id="frmAddPack" method="POST">
      <label htmlFor="">
        Valor por cota
        <input type="text" id="frm_add_number_price" name="number_price" className="moneyCota" required="" />
      </label>

      <label htmlFor="">
        Quantidade de cotas
        <input type="number" id="frm_add_qtd" name="qtd" maxLength="4" required="" />
      </label>

      <label htmlFor="">
        Valor Total
        <input type="text" id="frm_add_price" name="price" />
      </label>

      <label htmlFor="">
        Mais Popular
        <select name="most_popular" id="frm_add_most_popular">
          <option defaultValue="sim">Sim</option>
          <option defaultValue="nao">Não</option>
        </select>
      </label>

      <label htmlFor="">
        Cod. Promocional
        <input type="text" style={{textTransform: "uppercase"}} id="frm_add_pkg" name="pkg" maxLength="10" />
      </label>

      <input type="submit" value="Adicionar" />
    </Form>
  )
}
