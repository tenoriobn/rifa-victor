import { useRecoilState, useSetRecoilState } from "recoil";
import { Main } from "../../components/AdminLayout/AdminLayout";
import Header from "../../components/Header/Header";
import Titulo from "../../components/Titulo/Titulo";
import ClientesForm from "./ClientesForm/ClientesForm";
import ClientesTable from "./ClientesTable/ClientesTable";
import { stateClientesInfo, stateOpenModalEditarInfoCliente, stateOpenModalVerInfoCliente } from "../../common/states/atom";
import Modal from "../../components/Modal/Modal";
import ModalClienteInfo from "./ClientesModais/ModalClienteInfo/ModalClienteInfo";
import ModalEditarCliente from "./ClientesModais/ModalEditarCliente/ModalEditarCliente";

export default function Clientes() {
  const [openModalVerInfoCliente, setOpenModalVerInfoCliente] = useRecoilState(stateOpenModalVerInfoCliente);
  const [openModalEditarInfoCliente, setOpenModalEditarInfoCliente] = useRecoilState(stateOpenModalEditarInfoCliente);
  // const setClientesInfo = useSetRecoilState(stateClientesInfo);

    // const obterDados = async () => {
  //   const response = await fetchDados(`/produtos/todos/ganhadores/`);
  //   setClientesInfo(response.data);
  //   console.log('response.data', response.data);
  // };

  // useEffect(() => {
  //   obterDados();
  // }, []);


  return (
    <section>
      <Header>
        <h2><i className="fa-solid fa-users"></i> CLIENTES</h2>
      </Header>

      <Main>
        <Titulo titulo="Filtros de Busca" />
        <ClientesForm />
        <ClientesTable />
      </Main>

      <Modal title="CLIENTE" openState={openModalVerInfoCliente} setOpenState={setOpenModalVerInfoCliente}>
        <ModalClienteInfo />
      </Modal>

      <Modal title="CLIENTE" openState={openModalEditarInfoCliente} setOpenState={setOpenModalEditarInfoCliente}>
      <ModalEditarCliente />
      </Modal>
    </section>
  )
}
