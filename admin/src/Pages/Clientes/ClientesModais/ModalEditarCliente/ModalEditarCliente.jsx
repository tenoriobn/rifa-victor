import styled from "styled-components"
import { stateClientesInfo, stateOpenModalEditarInfoCliente } from "../../../../common/states/atom";
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

export default function ModalEditarCliente() {
  const [clienteInfo, setClientesInfo] = useRecoilValue(stateClientesInfo);
  const setOpenModalEditarInfoCliente = useSetRecoilState(stateOpenModalEditarInfoCliente);


  // // Função para lidar com o envio do formulário
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // Aqui você pode enviar os dados para o backend, utilizando novoUsuario
  //   // Lógica para enviar para o backend aqui
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // const response = await putDados("admin/dashboard/editar/ganhador", clienteInfo, userLogin);

      // console.log('DADOS ENVIADOS:', clienteInfo)

      // setOpenModalEditarInfoCliente(false);

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
          defaultValue={clienteInfo?.client?.name || ""}  
          onChange={(e) => setClientesInfo({ ...clienteInfo, name: e.target.value })} 
          required
        />
      </label>

      <label htmlFor="phone">
        Telefone
        <input
          type="text"
          id="phone"
          name="phone"
          maxLength="15"
          defaultValue={clienteInfo?.client?.phone || ""}  
          onChange={(e) => setClientesInfo({ ...clienteInfo, phone: e.target.value })} 
          required
        />
      </label>

      <input id="sendEditPack" type="submit" value="Atualizar" />
    </Form>
  );
}