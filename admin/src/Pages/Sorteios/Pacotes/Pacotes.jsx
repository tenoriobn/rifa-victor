import { useRecoilState } from "recoil";
import { Main } from "../../../components/AdminLayout/AdminLayout";
import Header, { LinkItem } from "../../../components/Header/Header";
import Modal from "../../../components/Modal/Modal";
import Titulo from "../../../components/Titulo/Titulo";
import ModalAdicionarPacote from "./Modais/ModalAdicionarPacote/ModalAdicionarPacote";
import FormPacotes from "./PacotesForm/PacotesForm";
import PacoteForm from "./PacoteTable/PacoteTable";
import { stateOpenModalAdicionarPacote, stateOpenModalEditarPacote } from "../../../common/states/atom";
import ModalEditarPacote from "./Modais/ModalEditarPacote/ModalEditarPacote";

export default function Pacotes() {
  const [openModalAdicionarPacote, setOpenModalAdicionarPacote] = useRecoilState(stateOpenModalAdicionarPacote);
  const [openModalEditarPacote, setOpenModalEditarPacote] = useRecoilState(stateOpenModalEditarPacote);

  return (
    <section>
      <Header>
        <h2>
          <a href="/dashboard/rifas/editar/174">
            <i style={{ color: "orangered" }} className="fa-solid fa-angle-double-left"></i>
          </a> <i className="fa-solid fa-box-open"></i> PACOTES
        </h2>

        <LinkItem className="button-new" onClick={() => setOpenModalAdicionarPacote(!openModalAdicionarPacote)}>
          <i className="fas fa-plus"></i> Novo
        </LinkItem>
      </Header>

      <Main>
        <Titulo titulo="SAVEIRO CROSS DOS SONHOS" />
        <FormPacotes />
        <PacoteForm />
      </Main>

      <Modal title="ADICIONAR PACOTE" openState={openModalAdicionarPacote} setOpenState={setOpenModalAdicionarPacote}>
        <ModalAdicionarPacote />
      </Modal>

      <Modal title="EDITAR PACOTE" openState={openModalEditarPacote} setOpenState={setOpenModalEditarPacote}>
        <ModalEditarPacote />
      </Modal>
    </section>
  )
}
