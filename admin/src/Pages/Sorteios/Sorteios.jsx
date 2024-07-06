import { useRecoilState } from "recoil";
import { stateOpenModalAcoesSorteio } from "../../common/states/atom";
import { Main } from "../../components/AdminLayout/AdminLayout";
import Header, { LinkItem } from "../../components/Header/Header";
import Modal from "../../components/Modal/Modal";
import Titulo from "../../components/Titulo/Titulo";
import AcoesSorteioModal from "./AcoesSorteioModal/AcoesSorteioModal";
import FormularioSorteio from "./FormularioSorteio/FormularioSorteio";
import TabelaSorteio from "./TabelaSorteio/TabelaSorteio";

export default function Sorteios() {
  const [openModalAcoesSorteio, setOpenModalAcoesSorteio] = useRecoilState(stateOpenModalAcoesSorteio);

  return (
    <div>
      <Header>
        <h2><i className="fa-solid fa-dice"></i> SORTEIOS</h2>
        <LinkItem to="/dashboard/rifas/adicionar" className="button-new">
          <i className="fas fa-plus"></i> Novo
        </LinkItem>
      </Header>

      <Main>
        <Titulo titulo={"Filtros de Busca"} />
        <FormularioSorteio />
        <TabelaSorteio />
      </Main>

      <Modal title="AÇÕES" openState={openModalAcoesSorteio} setOpenState={setOpenModalAcoesSorteio}>
        <AcoesSorteioModal />
      </Modal>
    </div>
  )
}
