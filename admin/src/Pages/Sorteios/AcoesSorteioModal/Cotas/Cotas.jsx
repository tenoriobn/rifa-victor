import { Main } from "../../../../components/AdminLayout/AdminLayout";
import Header, { LinkItem } from "../../../../components/Header/Header";
import Titulo from "../../../../components/Titulo/Titulo";
import TabelaCotas from "./TabelaCotas/TabelaCotas";
import Modal from "../../../../components/Modal/Modal";
import { useRecoilState } from "recoil";
import { stateOpenModalAdicionarCota, stateOpenModalCotaPremiada, stateOpenModalEditarCotaPremiada } from "../../../../common/states/atom";
import AdicionarCota from "./AdicionarCota/AdicionarCota";
import CotasForm from "./CotasForm/CotasForm";
import ModalCotaPremiada from "./ModalCotaPremiada/ModalCotaPremiada";
import ModalEditarCotaPremiada from "./ModalEditarCotaPremiada/ModalEditarCotaPremiada";

export default function RifasCotas() {
  const [openModalAdicionarCota, setOpenModalAdicionarCota] = useRecoilState(stateOpenModalAdicionarCota);
  const [openModalCotaPremiada, setOpenModalCotaPremiada] = useRecoilState(stateOpenModalCotaPremiada);
  const [openModalEditarCotaPremiada, setOpenModalEditarCotaPremiada] = useRecoilState(stateOpenModalEditarCotaPremiada);

  return (
    <section>
      <Header>
        <h2>
          <a href="/dashboard/rifas/editar/174">
            <i style={{ color: "orangered" }} className="fa-solid fa-angle-double-left"></i>
          </a> <i className="fa-solid fa-box-open"></i> COTAS PRÊMIADAS
        </h2>

        <LinkItem className="button-new" onClick={() => setOpenModalAdicionarCota(!openModalAdicionarCota)}>
          <i className="fas fa-plus"></i> Novo
        </LinkItem>
      </Header>

      <Main>
        <Titulo titulo="SAVEIRO CROSS DOS SONHOS" />

        <CotasForm />

        <TabelaCotas />
      </Main>

      <Modal title="ADICIONAR COTA" openState={openModalAdicionarCota} setOpenState={setOpenModalAdicionarCota}>
        <AdicionarCota />
      </Modal>

      <Modal title="COTA PREMIADA" openState={openModalCotaPremiada} setOpenState={setOpenModalCotaPremiada}>
        <ModalCotaPremiada />
      </Modal>

      <Modal title="EDITAR COTA" openState={openModalEditarCotaPremiada} setOpenState={setOpenModalEditarCotaPremiada}>
        <ModalEditarCotaPremiada />
      </Modal>

    </section>
  )
}
