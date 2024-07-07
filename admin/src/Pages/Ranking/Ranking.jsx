import { useRecoilState } from "recoil";
import { stateOpenModalVerInfoCliente } from "../../common/states/atom";
import { Main } from "../../components/AdminLayout/AdminLayout";
import Header from "../../components/Header/Header";
import Titulo from "../../components/Titulo/Titulo";
import RankingForm from "./RankingForm/RankingForm";
import RankingTable from "./RankingTable/RankingTable";
import Modal from "../../components/Modal/Modal";
import ModalClienteInfo from "./ModalClienteInfo/ClienteInfoModal";

export default function Ranking() {
  const [openModalVerInfoCliente, setOpenModalVerInfoCliente] = useRecoilState(stateOpenModalVerInfoCliente);

  return (
    <section>
      <Header>
        <h2><i className="fa-solid fa-ranking-star"></i> RANKING</h2>
      </Header>

      <Main>
        <Titulo titulo="Filtros de Busca" />
        <RankingForm />
        <RankingTable />
      </Main>

      <Modal title="CLIENTE" openState={openModalVerInfoCliente} setOpenState={setOpenModalVerInfoCliente}>
        <ModalClienteInfo />
      </Modal>
    </section>
  )
}
