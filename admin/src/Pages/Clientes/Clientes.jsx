import { useRecoilState } from "recoil";
import { Main } from "../../components/AdminLayout/AdminLayout";
import Header from "../../components/Header/Header";
import Titulo from "../../components/Titulo/Titulo";
import ClientesForm from "./ClientesForm/ClientesForm";
import ClientesTable from "./ClientesTable/ClientesTable";
import { stateOpenModalVerInfoCliente } from "../../common/states/atom";
import Modal from "../../components/Modal/Modal";
import ModalClienteInfo from "../Ranking/ModalClienteInfo/ClienteInfoModal";

export default function Clientes() {
  const [openModalVerInfoCliente, setOpenModalVerInfoCliente] = useRecoilState(stateOpenModalVerInfoCliente);

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
    </section>
  )
}
