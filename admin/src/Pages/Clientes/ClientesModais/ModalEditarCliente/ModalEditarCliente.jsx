/* eslint-disable react/prop-types */
import styled from "styled-components"
import { stateClienteInfoModal, stateOpenModalEditarInfoCliente, stateUserLogin } from "../../../../common/states/atom";
import { useSetRecoilState, useRecoilState } from "recoil";
import { putDados } from "../../../../common/http/http.js";
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

export default function ModalEditarCliente({setAtualizaTabela}) {
  const [clienteInfoModal, setClienteInfoModal] = useRecoilState(stateClienteInfoModal);
  const setOpenModalEditarInfoCliente = useSetRecoilState(stateOpenModalEditarInfoCliente);
  const userLogin = useSetRecoilState(stateUserLogin);

  console.log('clienteInfo', clienteInfoModal)

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await putDados(`admin/dashboard/editar/cliente`, clienteInfoModal, userLogin);
      setOpenModalEditarInfoCliente(false);
      setAtualizaTabela(true)

    } catch (error) {
      console.error("Erro ao enviar dados:", error);
    }
  };

  return (
    <Form action="" id="frmAddPack" method="POST" onSubmit={handleSubmit}>
      <label htmlFor="name">
        Nome
        <input
          type="text"
          name="name"
          defaultValue={clienteInfoModal?.name || ""}  
          onChange={(e) => setClienteInfoModal({ ...clienteInfoModal, name: e.target.value })} 
          required
        />
      </label>

      <label htmlFor="surname">
        Sobrenome
        <input
          type="text"
          name="surname"
          defaultValue={clienteInfoModal?.surname || ""}  
          onChange={(e) => setClienteInfoModal({ ...clienteInfoModal, surname: e.target.value })} 
          required
        />
      </label>

      <label htmlFor="phone">
        Telefone
        <PatternFormat
          format="(##) #####-####"
          type="text"
          id="phone"
          name="phone"
          maxLength="15"
          value={clienteInfoModal.cellphone || ""}  
          onChange={(e) => setClienteInfoModal({ ...clienteInfoModal, cellphone: e.target.value })} 
          required
        />
      </label>

      <input id="sendEditPack" type="submit" value="Atualizar" />
    </Form>
  );
}