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
    background-color: #41414b;
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

export default function ModalEditarPagamento() {
  return (
    <Form action="" id="frmAddPack" method="POST">
      <label htmlFor="">
        Nome
        <input type="text" id="MPname" name="name" required="" />
      </label>

      <label htmlFor="">
        Token
        <input type="text" id="MPtoken" name="token" required="" />
      </label>

      <label htmlFor="">
        Public Key
        <input type="text" id="MPpublic_key" name="public_key" required="" />
      </label>

      <label htmlFor="">
        Nome na Fatura
        <input type="text" id="MPstatement_descriptor" name="statement_descriptor" />
      </label>

      <input id="sendEditPack" type="submit" value="Atualizar" />
    </Form>
  )
}
