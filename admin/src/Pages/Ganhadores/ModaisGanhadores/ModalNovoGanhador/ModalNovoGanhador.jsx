import styled from "styled-components"
import { stateNovoGanhador, stateOpenModalNovoGanhador, stateNovoGanhadorInfo, stateOptionsRifa } from "../../../../common/states/atom";
import { useRecoilState, useSetRecoilState } from "recoil";
import useImageUpload from "../../../../common/states/Hook/useImageUpload";
import { fetchDados, postDados } from "../../../../common/http/http";
import { useEffect } from "react";
import { PatternFormat } from "react-number-format";
// import { useState } from "react";

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

export default function ModalNovoGanhador() {
  const setOpenModalNovoGanhador = useSetRecoilState(stateOpenModalNovoGanhador);
  const [novoGanhador, setNovoGanhador] = useRecoilState(stateNovoGanhador);
  const [novoGanhadorInfo, setNovoGanhadorInfo] = useRecoilState(stateNovoGanhadorInfo);
  const { handleFileChange } = useImageUpload(setNovoGanhador, novoGanhador);
  const [optionsRifa, setOptionsRifa] = useRecoilState(stateOptionsRifa);

  useEffect(() => {
    const obterDados = async () => {
      const response = await fetchDados(`/admin/dashboard/client/rifa/ativas`);

      setOptionsRifa(response.data);
    };  

    obterDados();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSaveChanges = async (event) => {
    event.preventDefault();

    try {
      const response = await postDados("admin/dashboard/cadastrar/ganhador", novoGanhador);

      setNovoGanhadorInfo((prevGanhadorInfo) => [...prevGanhadorInfo, response.data]);
      setNovoGanhador('');

      setOpenModalNovoGanhador(false);

    } catch (error) {
      console.error("Erro ao enviar dados:", error);
    }
  };

  return (
    <Form action="" id="frmAddPack" method="POST" onSubmit={handleSaveChanges}>
      <label htmlFor="">
        Foto
        <input 
          type="file" 
          name="img" 
          id="imagem" 
          accept="image/*"
          onChange={handleFileChange}
        />
      </label>

      <label htmlFor="">
        Telefone
        <PatternFormat
          format="(##) #####-####"
          type="text" 
          name="cellphone" 
          id="name" 
          defaultValue={novoGanhador.cellphone || ""}  
          onChange={(e) => setNovoGanhador({ ...novoGanhador, cellphone: e.target.value })} 
          required
        />
      </label>
      <label htmlFor="">
        Cota
        <input 
          type="number"
          name="ticket" 
          id="number" 
          defaultValue={novoGanhador.ticket || ""}  
          onChange={(e) => setNovoGanhador({ ...novoGanhador, ticket: e.target.value })} 
          required
        />
      </label>

      <label htmlFor="id_raffle" id="label_id_rifa" style={{display: "block"}}>
        Sorteio
          <select 
            name="id_raffle" 
            id="id_raffle" 
            value={novoGanhador.rifa_id}
            onChange={(e) => setNovoGanhador({ ...novoGanhador, rifas_id: e.target.value })} 
            required
          >
            <option value="">SELECIONE O SORTEIO</option>
              {optionsRifa?.map((rifa) => (
              <option key={rifa.id} value={rifa.id}>
                {rifa.title}
              </option>
            ))}
          </select>
      </label>


      <input id="sendEditPack" type="submit" defaultValue="Enviar" />
    </Form>
  )
}
