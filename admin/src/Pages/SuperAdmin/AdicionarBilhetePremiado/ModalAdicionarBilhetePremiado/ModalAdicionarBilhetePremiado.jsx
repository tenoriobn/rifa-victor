import { useState } from "react";
import styled from "styled-components"
import { stateInfoBilhetePremiado } from "../../../../common/states/atom";
import { useRecoilValue } from "recoil";

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

export default function ModalAdicionarBilhetePremiado() {
  const infoBilhetePremiado = useRecoilValue(stateInfoBilhetePremiado)
  const [cota, setCota] = useState("");
  const [phone, setNumber] = useState("");

  console.log('infoBilhetePremiado', infoBilhetePremiado)


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // const response = await postDados.post("/api/trocar-bilhete", { cota, phone });

    } catch (error) {
      console.error("Erro ao trocar bilhete:", error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <label htmlFor="cota">
        Número do Bilhete
        <input
          type="text"
          name="cota"
          id="cota"
          value={cota}
          onChange={(e) => setCota(e.target.value)}
          required
        />
      </label>

      <label htmlFor="phone">
        Telefone do Ganhador
        <input
          type="text"
          name="phone"
          id="phone"
          value={phone}
          onChange={(e) => setNumber(e.target.value)}
          required
        />
      </label>

      <input id="sendEditPack" type="submit" value="ADICIONAR" />
    </Form>
  );
}
