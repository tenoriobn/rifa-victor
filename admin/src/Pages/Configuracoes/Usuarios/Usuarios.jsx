import { useRecoilState } from "recoil";
import { stateOpenModalAdicionarUsuario, stateOpenModalEditarUsuario } from "../../../common/states/atom";
import { Main } from "../../../components/AdminLayout/AdminLayout";
import Header, { LinkItem } from "../../../components/Header/Header";
import Titulo from "../../../components/Titulo/Titulo";
import UsuariosForm from "./UsuariosForm/UsuariosForm";
import UsuariosTable from "./UsuariosTable/UsuariosTable";
import Modal from "../../../components/Modal/Modal";
import ModalEditarUsuario from "./UsuariosModais/ModalEditarUsuario/ModalEditarUsuario";
import ModalNovoUsuario from "./UsuariosModais/ModalNovoUsuario/ModalNovoUsuario";
import UsuariosPaginacao from "./UsuariosPaginacao/UsuariosPaginacao";

export default function Usuarios() {
  const [openModalAdicionarUsuario, setOpenModalAdicionarUsuario] = useRecoilState(stateOpenModalAdicionarUsuario);
  const [openModalEditarUsuario, setOpenModalEditarUsuario] = useRecoilState(stateOpenModalEditarUsuario);

  return (
    <section>
      <Header>
        <h2><i className="fa-solid fa-user"></i> Usuários</h2>
        <LinkItem className="button-new" onClick={() => setOpenModalAdicionarUsuario(!openModalAdicionarUsuario)}>
          <i className="fas fa-plus"></i> Novo
        </LinkItem>
      </Header>

      <Main>
        <Titulo titulo={"Filtros de Busca"} />
        <UsuariosForm />
        <UsuariosTable />
        <UsuariosPaginacao />
      </Main>

      <Modal title="NOVO USUÁRIO" openState={openModalAdicionarUsuario} setOpenState={setOpenModalAdicionarUsuario}>
        <ModalNovoUsuario />
      </Modal>

      <Modal title="EDITAR USUÁRIO" openState={openModalEditarUsuario} setOpenState={setOpenModalEditarUsuario}>
        <ModalEditarUsuario />
      </Modal>
    </section>
  )
}
