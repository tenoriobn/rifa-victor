/* eslint-disable react-hooks/exhaustive-deps */
import { useRecoilState, useResetRecoilState, useSetRecoilState } from "recoil";
import { Main } from "../../components/AdminLayout/AdminLayout";
import Header, { LinkItem } from "../../components/Header/Header";
import Titulo from "../../components/Titulo/Titulo";
import AfiliadosForm from "./AfiliadosForm/AfiliadosForm";
import AfiliadosTable from "./AfiliadosTable/AfiliadosTable";
import { stateAfiliadosInfoModal, stateAfiliadosInfoTable, stateOpenModalAdicionarAfiliados, stateOpenModalEditarAfiliados, stateOpenModalVerAfiliados } from "../../common/states/atom";
import Modal from "../../components/Modal/Modal";
import ModalAdicionarAfiliados from "./Modais/ModalAdicionarAfiliados/ModalAdicionarAfiliados";
import ModalEditarAfiliados from "./Modais/ModalEditarAfiliados/ModalEditarAfiliados";
import ModalVerAfiliados from "./Modais/ModalVerAfiliados/ModalVerAfiliados";
import { fetchDados } from "../../common/http/http";
import { useEffect } from "react";

export default function Afiliados() {
  const [openModalAdicionarAfiliados, setOpenModalAdicionarAfiliados] = useRecoilState(stateOpenModalAdicionarAfiliados);
  const [openModalEditarAfiliados, setOpenModalEditarAfiliados] = useRecoilState(stateOpenModalEditarAfiliados);
  const [openModalVerAfiliados, setOpenModalVerAfiliados] = useRecoilState(stateOpenModalVerAfiliados);
  const resetInputAfiliadosInfo = useResetRecoilState(stateAfiliadosInfoModal);
  const setAfiliadosInfoTable =  useSetRecoilState(stateAfiliadosInfoTable);

  const handleOpenModalAdicionarAfiliados = () => {
    setOpenModalAdicionarAfiliados(!openModalAdicionarAfiliados)
    resetInputAfiliadosInfo();
  } 

  const obterDados = async () => {
    const response = await fetchDados(`admin/dashboard/todos/afiliados/`);
    setAfiliadosInfoTable(response.data);
  };

  useEffect(() => {
    obterDados()
  }, [])

  return (
    <section>
      <Header>
        <h2>
          <ion-icon name="accessibility-sharp" role="img" class="md hydrated"></ion-icon> AFILIADOS</h2>

          <LinkItem className="button-new" onClick={handleOpenModalAdicionarAfiliados}>
            <i className="fas fa-plus"></i> Novo
          </LinkItem>
      </Header>

      <Main>
        <Titulo titulo="Filtros de Busca" />
        <AfiliadosForm />
        <AfiliadosTable />
      </Main>

      <Modal title="ADICIONAR AFILIADOS" openState={openModalAdicionarAfiliados} setOpenState={setOpenModalAdicionarAfiliados}>
        <ModalAdicionarAfiliados />
      </Modal>

      <Modal title="VER AFILIADOS" openState={openModalVerAfiliados} setOpenState={setOpenModalVerAfiliados}>
        <ModalVerAfiliados />
      </Modal>

      <Modal title="EDITAR AFILIADOS" openState={openModalEditarAfiliados} setOpenState={setOpenModalEditarAfiliados}>
        <ModalEditarAfiliados />
      </Modal>
    </section>
  )
}
