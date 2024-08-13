/* eslint-disable react-hooks/exhaustive-deps */

import { useRecoilState, useSetRecoilState } from "recoil";
import { Main } from "../../../components/AdminLayout/AdminLayout";
import Header from "../../../components/Header/Header";
import Modal from "../../../components/Modal/Modal";
import Titulo from "../../../components/Titulo/Titulo";
import AfiliadosForm from "../../Afiliados/AfiliadosForm/AfiliadosForm";
import AfiliadosTable from "../../Afiliados/AfiliadosTable/AfiliadosTable";
import ModalAdicionarAfiliados from "../../Afiliados/Modais/ModalAdicionarAfiliados/ModalAdicionarAfiliados";
import ModalEditarAfiliados from "../../Afiliados/Modais/ModalEditarAfiliados/ModalEditarAfiliados";
import ModalVerAfiliados from "../../Afiliados/Modais/ModalVerAfiliados/ModalVerAfiliados";
import { stateAfiliadosInfoTable, stateOpenModalAdicionarAfiliados, stateOpenModalEditarAfiliados, stateOpenModalVerAfiliados } from "../../../common/states/atom";
import { useEffect } from "react";
import { fetchDados } from "../../../common/http/http";
import { useParams } from "react-router-dom";

export default function AfiliadosRifa() {
  const [openModalAdicionarAfiliados, setOpenModalAdicionarAfiliados] = useRecoilState(stateOpenModalAdicionarAfiliados);
  const [openModalEditarAfiliados, setOpenModalEditarAfiliados] = useRecoilState(stateOpenModalEditarAfiliados);
  const [openModalVerAfiliados, setOpenModalVerAfiliados] = useRecoilState(stateOpenModalVerAfiliados);
  const setAfiliadosInfoTable =  useSetRecoilState(stateAfiliadosInfoTable);
  const { id } = useParams();
  // const resetInputAfiliadosInfo = useResetRecoilState(stateAfiliadosInfoModal);

  // const handleOpenModalAdicionarAfiliados = () => {
  //   setOpenModalAdicionarAfiliados(!openModalAdicionarAfiliados)
  //   resetInputAfiliadosInfo();
  // } 

  const obterDados = async () => {
    const response = await fetchDados(`admin/dashboard/one/afiliado/produto/${id}`);
    setAfiliadosInfoTable(response.data);

    console.log('response', response)
  };

  useEffect(() => {
    obterDados()
  }, [])

  return (
    <section>
      <Header>
        <h2>
          <ion-icon name="accessibility-sharp" role="img" class="md hydrated"></ion-icon> AFILIADOS</h2>
      </Header>

      <Main>
        <Titulo titulo="Filtros de Busca" />
        <AfiliadosForm />
        <AfiliadosTable ocultarBotao={true} />
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
