/* eslint-disable react/prop-types */
import { useState } from "react";
import styled from "styled-components"
import { postDados } from "../../../../common/http/http";
import { stateInfoAdicionarNumeros, stateOpenModalAdicionarNumeros } from "../../../../common/states/atom";
import { useRecoilValue, useSetRecoilState } from "recoil";

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

export default function ModalAdicionarNumeros({ onNotifySuccess, onNotifyError }) {
  const setOpenModalAdicionarNumeros = useSetRecoilState(stateOpenModalAdicionarNumeros);
  const infoAdicionarNumeros = useRecoilValue(stateInfoAdicionarNumeros)
  const [adicionarNumero, setAdicionarNumero] = useState({})

  const telefoneVencedor = infoAdicionarNumeros.search;
  const rifaId = infoAdicionarNumeros.selectSearch.id;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await postDados("/admin/dashboard/client/rifa/adicionar-numero", {...adicionarNumero,  cellphone: telefoneVencedor, rifa_id : rifaId });
      setOpenModalAdicionarNumeros(false);
      onNotifySuccess('Números adicionados com sucesso!');

    } catch (error) {
      onNotifyError(error.response.data.msg);
      console.error("Erro ao adicionar números:", error);
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <label htmlFor="frm_add_st">
          Status
          <select
            name="status"
            id="frm_add_st"
            value={adicionarNumero.tipo || ''}
            onChange={(e) => setAdicionarNumero({...adicionarNumero, tipo: e.target.value})}
            required
          >
            <option value="">Selecione</option>
            <option value="aleatorio">Aleatório</option>
            <option value="definir">Definir</option>
          </select>
        </label>

        {
          adicionarNumero.tipo === "aleatorio" 
            ? (
              <label htmlFor="qntdNumero">
                Qntd. números
                <input
                  type="text"
                  name="qntdNumero"
                  id="qntdNumero"
                  value={adicionarNumero.qntd_number || ''}
                  onChange={(e) => setAdicionarNumero({
                    ...adicionarNumero, 
                    qntd_number: e.target.value
                  })}
                  required
                />
              </label>
            )
            : adicionarNumero.tipo === "definir" 
            ? (
              <label htmlFor="qntdNumero">
                Definir Número
                <input
                  type="text"
                  name="qntdNumero"
                  id="qntdNumero"
                  value={adicionarNumero.qntd_number || ''}
                  onChange={(e) => setAdicionarNumero({
                    ...adicionarNumero, 
                    qntd_number: e.target.value
                  })}
                  required
                />
              </label>
            )
            : ''
        }

        <input id="sendEditPack" type="submit" value="ADICIONAR" />
      </Form>
    </>
  );
}
