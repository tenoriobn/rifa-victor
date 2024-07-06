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

export default function ModalEditarCotaPremiada() {
  return (
    <Form action="/dashboard/rifas/cotas/Edit/174" id="frmAddPack" method="POST">
        <label htmlFor="cota">
          Cota
          <input type="number" id="cota" name="cota" />
        </label>

        <label htmlFor="text">
          Prêmio
          <input type="text" id="premio" name="text" maxLength="50" />
        </label>

        <label htmlFor="visible">
          Mostrar no site
          <select name="visible" id="visible">
            <option value="Y">SIM</option>
            <option value="N">NÃO</option>
          </select>
        </label>

        <label htmlFor="st">
          Státus
          <select name="st" id="st">
          <option value="rescued">Resgatada</option></select>
        </label>

        <input type="submit" value="Atualizar" />
    </Form>
  )
}
