/* eslint-disable react-hooks/exhaustive-deps */
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
// import UsuariosPaginacao from "./UsuariosPaginacao/UsuariosPaginacao";
import { useEffect, useState } from "react";
import { fetchDados } from "../../../common/http/http";

export default function Usuarios() {
  const [openModalAdicionarUsuario, setOpenModalAdicionarUsuario] = useRecoilState(stateOpenModalAdicionarUsuario);
  const [openModalEditarUsuario, setOpenModalEditarUsuario] = useRecoilState(stateOpenModalEditarUsuario);
  const setUsuarioInfoTable = useSetRecoilState(stateUsuarioInfoTable);
  const [atualizaTabela, setAtualizaTabela] = useState(false);

  const obterDados = async () => {
    const response = await fetchDados(`/admin/dashboard/todos/usuarios`);
    setUsuarioInfoTable(response.data);
  };

  useEffect(() => {
    obterDados();
  }, []);

  useEffect(() => {
    if(atualizaTabela) {
      obterDados();
      setAtualizaTabela(false)
    }
  }, [atualizaTabela]);


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
        <UsuariosTable setAtualizaTabela={setAtualizaTabela} />
        {/* <UsuariosPaginacao /> */}
      </Main>

      <Modal title="NOVO USUÁRIO" openState={openModalAdicionarUsuario} setOpenState={setOpenModalAdicionarUsuario}>
        <ModalNovoUsuario setAtualizaTabela={setAtualizaTabela} />
      </Modal>

      <Modal title="EDITAR USUÁRIO" openState={openModalEditarUsuario} setOpenState={setOpenModalEditarUsuario}>
        <ModalEditarUsuario setAtualizaTabela={setAtualizaTabela} />
      </Modal>
    </section>
  )
}
