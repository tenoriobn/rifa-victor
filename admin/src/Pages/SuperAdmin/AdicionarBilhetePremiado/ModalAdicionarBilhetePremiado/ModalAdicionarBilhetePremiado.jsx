/* eslint-disable react/prop-types */
import { useState } from "react";
import styled from "styled-components"
import { stateInfoBilhetePremiado, stateOpenModalAdicionarBilhetePremiado } from "../../../../common/states/atom";
import { useRecoilValue, useSetRecoilState } from "recoil";
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

  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
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

export default function ModalAdicionarBilhetePremiado({ onNotifySuccess, onNotifyError }) {
  const setOpenModalAdicionarBilhetePremiado = useSetRecoilState(stateOpenModalAdicionarBilhetePremiado);
  const infoBilhetePremiado = useRecoilValue(stateInfoBilhetePremiado)
  const [cotaPremiada, setCotaPremiada] = useState("");

  const telefoneVencedor = infoBilhetePremiado.search;
  const rifaId = infoBilhetePremiado.selectSearch?.id;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await postDados("/admin/dashboard/client/rifa/adicionar/bilhete-premiado", { cellphone: telefoneVencedor, numero_premiado: cotaPremiada, rifa_id: rifaId });
      setOpenModalAdicionarBilhetePremiado(false)
      onNotifySuccess('Bilhete adicionado com sucesso!');

      console.log(response)

    } catch (error) {
      onNotifyError('Erro ao adicionar Bilhete:');
      console.error("Erro ao adicionar Bilhete:", error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <label htmlFor="cotaPremiada">
        Número do Bilhete
        <input
          type="number"
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
