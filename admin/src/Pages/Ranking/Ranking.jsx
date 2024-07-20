import { useRecoilState, useSetRecoilState } from "recoil";
import { stateOpenModalVerInfoCliente } from "../../common/states/atom";
import { Main } from "../../components/AdminLayout/AdminLayout";
import Header from "../../components/Header/Header";
import Titulo from "../../components/Titulo/Titulo";
import RankingForm from "./RankingForm/RankingForm";
import RankingTable from "./RankingTable/RankingTable";
import Modal from "../../components/Modal/Modal";
import ModalRankingInfo from "./ModalRankingInfo/RankingInfoModal";

export default function Ranking() {
  const [openModalVerInfoCliente, setOpenModalVerInfoCliente] = useRecoilState(stateOpenModalVerInfoCliente);
    // const setRankingInfo =  useSetRecoilState(statePedidosInfo);

  // const obterDados = async () => {
  //   const response = await fetchDados(`/produtos/todos/ganhadores/`);
  //   setRankingInfo (response.data);
  //   console.log('response.data', response.data);
  // };

  // useEffect(() => {
  //   obterDados();
  // }, []);

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
        <ModalRankingInfo />
      </Modal>
    </section>
  )
}
