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

export default function ModalNovoGanhador() {
  return (
    <Form action="" id="frmAddPack" method="POST">
      <label htmlFor="">
        Foto
        <input type="file" name="imagem" id="imagem" accept="image/*" />
      </label>

      <label htmlFor="">
        Nome
        <input type="text" name="name" id="name" />
      </label>
      <label htmlFor="">
        Cota
        <input type="text" name="number" id="number" />
      </label>

      <label htmlFor="id_raffle" id="label_id_rifa" style={{display: "block"}}>
        Sorteio
        <select name="id_raffle" id="id_raffle">
          <option defaultValue="">Selecione</option>
          <option defaultValue="174">SAVEIRO CROSS DOS SONHOS </option>
          <option defaultValue="178">F250 OU 50K NO PIX</option>
        </select>
      </label>


      <input id="sendEditPack" type="submit" defaultValue="Enviar" />
    </Form>
  )
}
