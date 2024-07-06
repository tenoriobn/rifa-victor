import { useRecoilState } from "recoil";
import { Main } from "../../../components/AdminLayout/AdminLayout";
import Header, { LinkItem } from "../../../components/Header/Header";
import ConfigPagamentosTable from "./ConfigPagamentosTable/ConfigPagamentosTable";
import { stateOpenModalAdicionarConfPagamento, stateOpenModalEditarConfPagamento } from "../../../common/states/atom";
import ModalAdicionarPagamento from "./ModaisConfigPagamentos/ModalAdicionarPagamento/ModalAdicionarPagamento";
import ModalEditarPagamento from "./ModaisConfigPagamentos/ModalEditarPagamento/ModalEditarPagamento";
import Modal from "../../../components/Modal/Modal";

export default function ConfigPagamentos() {
  const [openModalAdicionarConfPagamento, setOpenModalAdicionarConfPagamento] = useRecoilState(stateOpenModalAdicionarConfPagamento);
  const [openModalEditarConfPagamento, setOpenModalEditarConfPagamento] = useRecoilState(stateOpenModalEditarConfPagamento);

  return (
    <div>
      <Header>
        <h2><i className="fa-solid fa-user"></i> Conf. Pagamento</h2>
        <LinkItem className="button-new" onClick={() => setOpenModalAdicionarConfPagamento(!openModalAdicionarConfPagamento)}>
          <i className="fas fa-plus"></i> Novo
        </LinkItem>
      </Header>

      <Main>
        <ConfigPagamentosTable />
      </Main>

      <Modal title="NOVO PAGAMENTO" openState={openModalAdicionarConfPagamento} setOpenState={setOpenModalAdicionarConfPagamento}>
        <ModalAdicionarPagamento />
      </Modal>

      <Modal title="EDITAR GATEWAY" openState={openModalEditarConfPagamento} setOpenState={setOpenModalEditarConfPagamento}>
        <ModalEditarPagamento />
      </Modal>
    </div>
  )
}
