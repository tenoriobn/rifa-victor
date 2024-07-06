import { useRecoilState } from "recoil";
import { Main } from "../../../components/AdminLayout/AdminLayout";
import Header, { LinkItem } from "../../../components/Header/Header";
import Titulo from "../../../components/Titulo/Titulo";
import UpsellForm from "./UpsellForm/UpsellForm";
import UpsellTable from "./UpsellTable/UpsellTable";
import { stateOpenModalAdicionarUpsell, stateOpenModalEditarUpsell } from "../../../common/states/atom";
import ModalEditarUpsell from "./UpsellForm/Modais/ModalEditarUpsell/ModalEditarUpsell";
import Modal from "../../../components/Modal/Modal";
import ModalAdicionarUpsell from "./UpsellForm/Modais/ModalAdicionarUpsell/ModalAdicionarUpsell";

export default function Upsell() {
  const [openModalAdicionarUpsell, setOpenModalAdicionarUpsell] = useRecoilState(stateOpenModalAdicionarUpsell);
  const [openModalEditarUpsell, setOpenModalEditarUpsell] = useRecoilState(stateOpenModalEditarUpsell);

  return (
    <section>
      <Header>
        <h2><i className="fa-solid fa-dice"></i> SORTEIOS</h2>
        <LinkItem className="button-new" onClick={() => setOpenModalAdicionarUpsell(!openModalAdicionarUpsell)}>
          <i className="fas fa-plus"></i> Novo
        </LinkItem>
      </Header>

      <Main>
        <Titulo titulo="SAVEIRO CROSS DOS SONHOS" />
        <UpsellForm />
        <UpsellTable />
      </Main>

      <Modal title="COTA PREMIADA" openState={openModalAdicionarUpsell} setOpenState={setOpenModalAdicionarUpsell}>
        <ModalAdicionarUpsell />
      </Modal>

      <Modal title="EDITAR PACOTE" openState={openModalEditarUpsell} setOpenState={setOpenModalEditarUpsell}>
        <ModalEditarUpsell />
      </Modal>
    </section>
  )
}
