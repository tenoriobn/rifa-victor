import { useRecoilState } from "recoil";
import FiltroUsuarioForm from "./FiltroUsuarioForm/FiltroUsuarioForm";
import FiltroUsuarioTable from "./FiltroUsuarioTable/FiltroUsuarioTable";
import { Main } from "../../../components/AdminLayout/AdminLayout";
import Header from "../../../components/Header/Header";
import Modal from "../../../components/Modal/Modal";
import Titulo from "../../../components/Titulo/Titulo";
import { stateOpenModalAdicionarCotas } from "../../../common/states/atom";
import ModalAdicionarNumeros from "../AdicionarNumeros/ModalAdicionarNumeros/ModalAdicionarNumeros";

export default function AdicionarCotas() {
  const [openModalAdicionarCotas, setOpenModalAdicionarCotas] = useRecoilState(stateOpenModalAdicionarCotas);

  return (
    <section>
      <Header>
        <h2><i className="fa-solid fa-user"></i> ADICIONAR COTAS PREMIADAS</h2>
      </Header>

      <Main>
        <Titulo titulo={"Filtros de Busca"} />
        <FiltroUsuarioForm />
        <FiltroUsuarioTable />
      </Main>

      <Modal title="ADICIONAR COTAS" openState={openModalAdicionarCotas} setOpenState={setOpenModalAdicionarCotas}>
        <ModalAdicionarNumeros />
      </Modal>
    </section>
  )
}
