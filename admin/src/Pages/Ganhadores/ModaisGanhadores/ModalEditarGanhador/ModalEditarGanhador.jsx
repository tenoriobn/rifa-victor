/* eslint-disable react/prop-types */
import styled from "styled-components"
import { stateNovoGanhador, stateIdModal, stateNovoGanhadorInfo, stateOpenModalEditarGanhador, stateUserLogin } from "../../../../common/states/atom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import useImageUpload from "../../../../common/states/Hook/useImageUpload";
import { useEffect } from "react";
import { fetchDados, putDados } from "../../../../common/http/http";
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

export default function ModalEditarGanhador({setAtualizaTabela}) {
  const setOpenModalEditarGanhador = useSetRecoilState(stateOpenModalEditarGanhador);
  const [novoGanhador, setNovoGanhador] = useRecoilState(stateNovoGanhador);
  const { handleFileChange } = useImageUpload(setNovoGanhador, novoGanhador);
  const idModal = useRecoilValue(stateIdModal);
  const setNovoGanhadorInfo = useSetRecoilState(stateNovoGanhadorInfo);
  const userLogin = useRecoilValue(stateUserLogin);

  console.log('DADOS EDITADOS', novoGanhador)

  console.log(idModal.client.cellphone)
  

  useEffect(() => {
    const obterDados = async () => {
      const response = await fetchDados(`/admin/dashboard/cadastrar/ganhador/${idModal.id}`);

      const data = response.data;

      setNovoGanhador({...data, cellphone: idModal.client.cellphone});
    };  

    obterDados();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSaveChanges = async (event) => {
    event.preventDefault();

    try {
      const response = await putDados("admin/dashboard/editar/ganhador", novoGanhador, userLogin);

      console.log('DADOS ENVIADOS:', novoGanhador)

      setNovoGanhadorInfo(response.data);
      setNovoGanhador('');

      setAtualizaTabela(true);

      setOpenModalEditarGanhador(false);

    } catch (error) {
      console.error("Erro ao enviar dados:", error);
      console.log('DADOS ENVIADOS:', novoGanhador)
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
        Nome
        <input 
          type="text" 
          name="name" 
          id="name" 
          defaultValue={novoGanhador?.client?.name || ""}  
          onChange={(e) => setNovoGanhador({ ...novoGanhador, name: e.target.value })} 
          required
          disabled
        />
      </label>

      <label htmlFor="">
        Sobrenome
        <input 
          type="text" 
          name="name" 
          id="name" 
          defaultValue={novoGanhador?.client?.surname || ""}  
          onChange={(e) => setNovoGanhador({ ...novoGanhador, surname: e.target.value })} 
          required
          disabled
        />
      </label>

      <label htmlFor="">
        Telefone
        <PatternFormat
          format="(##) #####-####"
          type="text" 
          name="cellphone" 
          id="name" 
          value={novoGanhador?.client?.cellphone || ""}  
          onChange={(e) => setNovoGanhador({ ...novoGanhador, cellphone: e.target.value })} 
          required
        />
      </label>

      <label htmlFor="">
        Cota
        <input 
          type="number" 
          name="number" 
          id="number" 
          defaultValue={novoGanhador.ticket || ""}  
          onChange={(e) => setNovoGanhador({ ...novoGanhador, ticket: e.target.value })} 
          required
        />
      </label>

      <input id="sendEditPack" type="submit" defaultValue="Enviar" />
    </Form>
  )
}
