/* eslint-disable react/prop-types */
import { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components"
import { stateAtualizaTableInfoCotaSorteada, stateInfoCotaSorteada, stateOpenModalNovoGanhador } from "../../../../common/states/atom";
import { postDados } from "../../../../common/http/http";
import { PatternFormat } from "react-number-format";

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

export default function ModalTrocarBilhete({ onNotifySuccess, onNotifyError }) {
  const setOpenModalNovoGanhador = useSetRecoilState(stateOpenModalNovoGanhador);
  const infoCotaSorteada = useRecoilValue(stateInfoCotaSorteada);
  const setAtualizaTableInfoCotaSorteada = useSetRecoilState(stateAtualizaTableInfoCotaSorteada);
  const [cota, setCota] = useState(infoCotaSorteada.search);
  const [number, setNumber] = useState("");
  const rifaId = infoCotaSorteada.data.data.rifa.id;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await postDados("/admin/dashboard/rifa/definir-ganhador", { numeroSorteado: cota, novoGanhadorPhone: number,  rifa_id: rifaId});
      setOpenModalNovoGanhador(false);
      onNotifySuccess('Ganhador definido com sucesso!');
      setAtualizaTableInfoCotaSorteada(true);
    } catch (error) {
      onNotifyError(error.response.data.msg);
      console.error("Erro ao trocar bilhete:", error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <label htmlFor="cota">
        Número da cota sorteada
        <input
          type="text"
          name="cota"
          id="cota"
          value={cota}
          onChange={(e) => setCota(e.target.value)}
          // disabled
          required
        />
      </label>

      <label htmlFor="number">
        Telefone do novo vencedor
        <PatternFormat
          format="(##) #####-####"
          type="text"
          name="number"
          id="number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          required
        />
      </label>

      <input id="sendEditPack" type="submit" value="Efetuar Troca" />
    </Form>
  );
}
