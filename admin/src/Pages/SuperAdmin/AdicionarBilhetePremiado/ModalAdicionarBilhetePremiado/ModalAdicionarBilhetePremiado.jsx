import { useState } from "react";
import styled from "styled-components"
import { stateInfoBilhetePremiado } from "../../../../common/states/atom";
import { useRecoilValue } from "recoil";
import { postDados } from "../../../../common/http/http";

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
  const [cotaPremiada, setCotaPremiada] = useState("");

  const telefoneVencedor = infoBilhetePremiado.search;
  const rifaId = infoBilhetePremiado.selectSearch?.id;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await postDados("/admin/dashboard/client/rifa/adicionar/bilhete-premiado", { cellphone: telefoneVencedor, numero_premiado: cotaPremiada, rifa_id: rifaId });

      console.log('response modal', response)

    } catch (error) {
      console.error("Erro ao trocar bilhete:", error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <label htmlFor="cotaPremiada">
        Número do Bilhete
        <input
          type="text"
          name="cotaPremiada"
          id="cotaPremiada"
          value={cotaPremiada}
          onChange={(e) => setCotaPremiada(e.target.value)}
          required
        />
      </label>
      <input id="sendEditPack" type="submit" value="ADICIONAR" />
    </Form>
  );
}
