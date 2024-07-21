import { useRecoilState, useSetRecoilState } from "recoil";
import { stateOpenModalAdicionarUsuario, stateOpenModalEditarUsuario, stateUsuarioInfoTable } from "../../../common/states/atom";
import { Main } from "../../../components/AdminLayout/AdminLayout";
import Header, { LinkItem } from "../../../components/Header/Header";
import Titulo from "../../../components/Titulo/Titulo";
import UsuariosForm from "./UsuariosForm/UsuariosForm";
import UsuariosTable from "./UsuariosTable/UsuariosTable";
import Modal from "../../../components/Modal/Modal";
import ModalEditarUsuario from "./UsuariosModais/ModalEditarUsuario/ModalEditarUsuario";
import ModalNovoUsuario from "./UsuariosModais/ModalNovoUsuario/ModalNovoUsuario";
import UsuariosPaginacao from "./UsuariosPaginacao/UsuariosPaginacao";
import { useEffect } from "react";
import { fetchDados } from "../../../common/http/http";

export default function Usuarios() {
  const [openModalAdicionarUsuario, setOpenModalAdicionarUsuario] = useRecoilState(stateOpenModalAdicionarUsuario);
  const [openModalEditarUsuario, setOpenModalEditarUsuario] = useRecoilState(stateOpenModalEditarUsuario);
  const setUsuarioInfoTable = useSetRecoilState(stateUsuarioInfoTable);

  const usersInfo = [
    {
      name: "Ana Lima 1",
      phone: "(43) 99999-3333",
      email: "anaplima2001@gmail.com",
      status: "admin",
      date: "15/04/21 15:02"
    },
    {
      name: "Ana Lima 2",
      phone: "(43) 98888-3859",
      email: "anaplima2002@gmail.com",
      status: "user",
      date: "16/04/22 15:02"
    },
    {
      name: "Ana Lima 3",
      phone: "(43) 97777-3859",
      email: "anaplima2003@gmail.com",
      status: "support",
      date: "17/04/23 15:02"
    },
    {
      name: "Ana Lima 4",
      phone: "(43) 96666-3859",
      email: "anaplima2004@gmail.com",
      status: "superadmin",
      date: "18/04/24 15:02"
    }
  ];

  // const obterDados = async () => {
  //   const response = await fetchDados(`/admin/dashboard/todos/clientes`);
  //   setUsuarioInfoTable(response.data);
  // };

  useEffect(() => {
    setUsuarioInfoTable(usersInfo)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
