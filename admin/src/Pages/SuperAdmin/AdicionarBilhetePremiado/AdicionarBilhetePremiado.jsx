import { useRecoilState } from "recoil";
import FiltroUsuarioForm from "./FiltroUsuarioForm/FiltroUsuarioForm";
import FiltroUsuarioTable from "./FiltroUsuarioTable/FiltroUsuarioTable";
import { Main } from "../../../components/AdminLayout/AdminLayout";
import Header from "../../../components/Header/Header";
import Modal from "../../../components/Modal/Modal";
import Titulo from "../../../components/Titulo/Titulo";
import { stateOpenModalAdicionarBilhetePremiado } from "../../../common/states/atom";
import ModalAdicionarBilhetePremiado from "./ModalAdicionarBilhetePremiado/ModalAdicionarBilhetePremiado";

export default function AdicionarBilhetePremiado() {
  const [openModalAdicionarBilhetePremiado, setOpenModalAdicionarBilhetePremiado] = useRecoilState(stateOpenModalAdicionarBilhetePremiado);

  return (
    <section>
      <Header>
        <h2><i className="fa-solid fa-user"></i> ADICIONAR BILHETES PREMIADOS</h2>
      </Header>

      <Main>
        <Titulo titulo={"Filtros de Busca"} />
        <FiltroUsuarioForm />
        <FiltroUsuarioTable />
      </Main>

      <Modal title="DEFINIR GANHADOR" openState={openModalAdicionarBilhetePremiado} setOpenState={setOpenModalAdicionarBilhetePremiado}>
        <ModalAdicionarBilhetePremiado />
      </Modal>
    </section>
  )
}
