import { useRecoilState } from "recoil";
import { stateOpenModalAdicionarNumeros } from "../../../common/states/atom";
import { Main } from "../../../components/AdminLayout/AdminLayout";
import Header from "../../../components/Header/Header";
import Modal from "../../../components/Modal/Modal";
import Titulo from "../../../components/Titulo/Titulo";
import ModalAdicionarNumeros from "./ModalAdicionarNumeros/ModalAdicionarNumeros";
import FiltroUsuarioForm from "./FiltroUsuarioForm/FiltroUsuarioForm";
import FiltroUsuarioTable from "./FiltroUsuarioTable/FiltroUsuarioTable";


export default function AdicionarNumeros() {
  const [openModalAdicionarNumeros, setOpenModalAdicionarNumeros] = useRecoilState(stateOpenModalAdicionarNumeros);

  return (
    <section>
      <Header>
        <h2><i className="fa-solid fa-user"></i> Adicionar Numeros</h2>
      </Header>

      <Main>
        <Titulo titulo={"Filtros de Busca"} />
        <FiltroUsuarioForm />
        <FiltroUsuarioTable />
      </Main>

      <Modal title="ADICIONAR NÚMEROS" openState={openModalAdicionarNumeros} setOpenState={setOpenModalAdicionarNumeros}>
        <ModalAdicionarNumeros />
      </Modal>
    </section>
  )
}
