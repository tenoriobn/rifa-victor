import { useRecoilState } from "recoil";
import FiltroUsuarioForm from "./FiltroUsuarioForm/FiltroUsuarioForm";
import FiltroUsuarioTable from "./FiltroUsuarioTable/FiltroUsuarioTable";
import ModalTrocarBilhete from "./ModalTrocarBilhete/ModalTrocarBilhete";
import { Main } from "../../../components/AdminLayout/AdminLayout";
import Header from "../../../components/Header/Header";
import Modal from "../../../components/Modal/Modal";
import Titulo from "../../../components/Titulo/Titulo";
import { stateOpenModalTrocarBilhete } from "../../../common/states/atom";

export default function BilhetePremiado() {
  const [openModalTrocarBilhete, setOpenModalTrocarBilhete] = useRecoilState(stateOpenModalTrocarBilhete);

  return (
    <section>
      <Header>
        <h2><i className="fa-solid fa-user"></i> Bilhete Premiado</h2>
      </Header>

      <Main>
        <Titulo titulo={"Filtros de Busca"} />
        <FiltroUsuarioForm />
        <FiltroUsuarioTable />
      </Main>

      <Modal title="TROCAR BILHETE" openState={openModalTrocarBilhete} setOpenState={setOpenModalTrocarBilhete}>
        <ModalTrocarBilhete />
      </Modal>
    </section>
  )
}
