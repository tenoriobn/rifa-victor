import styled from "styled-components"

const Form = styled.form`

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

export default function AdicionarCota() {
  return (
    <Form action="/dashboard/rifas/cotas/Add/174" id="frmAddPack" method="POST">
      <label htmlFor="frm_add_qtd" id="frm_lb_qtd">
        Quantidade (MAX: 20)
        <input className="number" id="frm_add_qtd" name="qtd" required="" />
      </label>

      <label htmlFor="frm_add_text">
        Prêmio
        <input type="text" id="frm_add_text" name="text" maxLength="50" required="" />
      </label>

      <label htmlFor="frm_add_visible">
        Mostrar no site
        <select name="visible" id="frm_add_visible">
          <option defaultValue="Y">SIM</option>
          <option defaultValue="N">NÃO</option>
        </select>
      </label>

      <label htmlFor="frm_add_st">
        Státus
        <select name="st" id="frm_add_st">
          <option defaultValue="available">Disponivel</option>
          <option defaultValue="reserved">Bloqueada</option>
          <option defaultValue="immediate">Imediato</option>
        </select>
      </label>

      <input type="submit" defaultValue="Adicionar" />
    </Form>
  )
}
