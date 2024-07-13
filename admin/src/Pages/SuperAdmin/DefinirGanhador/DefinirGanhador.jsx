import { useRecoilState } from "recoil";
import FiltroUsuarioForm from "./FiltroUsuarioForm/FiltroUsuarioForm";
import FiltroUsuarioTable from "./FiltroUsuarioTable/FiltroUsuarioTable";
import ModalTrocarBilhete from "./ModalTrocarBilhete/ModalTrocarBilhete";
import { Main } from "../../../components/AdminLayout/AdminLayout";
import Header from "../../../components/Header/Header";
import Modal from "../../../components/Modal/Modal";
import Titulo from "../../../components/Titulo/Titulo";
import { stateOpenModalNovoGanhador } from "../../../common/states/atom";

export default function DefinirGanhador() {
  const [openModalNovoGanhador, setOpenModalNovoGanhador] = useRecoilState(stateOpenModalNovoGanhador);

  return (
    <section>
      <Header>
        <h2><i className="fa-solid fa-user"></i> Definir Ganhador</h2>
      </Header>

      <Main>
        <Titulo titulo={"Filtros de Busca"} />
        <FiltroUsuarioForm />
        <FiltroUsuarioTable />
      </Main>

      <Modal title="DEFINIR GANHADOR" openState={openModalNovoGanhador} setOpenState={setOpenModalNovoGanhador}>
        <ModalTrocarBilhete />
      </Modal>
    </section>
  )
}
