import { useRecoilState } from "recoil";
import { Main } from "../../components/AdminLayout/AdminLayout";
import Header from "../../components/Header/Header";
import Titulo from "../../components/Titulo/Titulo";
import PedidosForm from "./PedidosForm/PedidosForm";
import PedidosPagination from "./PedidosPagination/PedidosPagination";
import PedidosTable from "./PedidosTable/PedidosTable";
import { stateOpenModalVerCota } from "../../common/states/atom";
import Modal from "../../components/Modal/Modal";
import ModalPedido from "./ModalPedido/ModalPedido";

export default function Pedidos() {
  const [openModalVerCota, setOpenModalVerCota] = useRecoilState(stateOpenModalVerCota);

  return (
    <section>
      <Header>
        <h2><i className="fa-solid fa-receipt"></i> PEDIDOS</h2>
      </Header>

      <Main>
        <Titulo titulo="Filtros de Busca" />
        <PedidosForm />
        <PedidosTable />
        <PedidosPagination />
      </Main>

      <Modal title="PEDIDO" openState={openModalVerCota} setOpenState={setOpenModalVerCota} maxWidth={{ maxWidth: '595px' }}>
        <ModalPedido />
      </Modal>
    </section>
  )
}
