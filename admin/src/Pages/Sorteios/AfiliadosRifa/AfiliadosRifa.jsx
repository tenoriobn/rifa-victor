/* eslint-disable react-hooks/exhaustive-deps */

import { useRecoilState } from "recoil";
import { Main } from "../../../components/AdminLayout/AdminLayout";
import Header, { LinkItem } from "../../../components/Header/Header";
import Modal from "../../../components/Modal/Modal";
import Titulo from "../../../components/Titulo/Titulo";
import AfiliadosForm from "../../Afiliados/AfiliadosForm/AfiliadosForm";
import AfiliadosTable from "../../Afiliados/AfiliadosTable/AfiliadosTable";
import ModalAdicionarAfiliados from "../../Afiliados/Modais/ModalAdicionarAfiliados/ModalAdicionarAfiliados";
import ModalEditarAfiliados from "../../Afiliados/Modais/ModalEditarAfiliados/ModalEditarAfiliados";
import ModalVerAfiliados from "../../Afiliados/Modais/ModalVerAfiliados/ModalVerAfiliados";
import { stateOpenModalAdicionarAfiliados, stateOpenModalEditarAfiliados, stateOpenModalVerAfiliados } from "../../../common/states/atom";


export default function AfiliadosRifa() {
  const [openModalAdicionarAfiliados, setOpenModalAdicionarAfiliados] = useRecoilState(stateOpenModalAdicionarAfiliados);
  const [openModalEditarAfiliados, setOpenModalEditarAfiliados] = useRecoilState(stateOpenModalEditarAfiliados);
  const [openModalVerAfiliados, setOpenModalVerAfiliados] = useRecoilState(stateOpenModalVerAfiliados);
  // const resetInputAfiliadosInfo = useResetRecoilState(stateAfiliadosInfoModal);
  // const setAfiliadosInfoTable =  useSetRecoilState(stateAfiliadosInfoTable);

  const handleOpenModalAdicionarAfiliados = () => {
    setOpenModalAdicionarAfiliados(!openModalAdicionarAfiliados)
    // resetInputAfiliadosInfo();
  } 

  // const obterDados = async () => {
  //   const response = await fetchDados(`/admin rota aqui`);
  //   setAfiliadosInfoTable(response.data);
  // };

  // useEffect(() => {
  //   obterDados()
  // }, [])

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
