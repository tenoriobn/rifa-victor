import { useRecoilState } from "recoil";
import { Main } from "../../components/AdminLayout/AdminLayout";
import Header, { LinkItem } from "../../components/Header/Header";
import GanhadoresTable from "./GanhadoresTable/GanhadoresTable";
import { stateOpenModalNovoGanhador, stateOpenModalEditarGanhador, stateNovoGanhadorInfo } from "../../common/states/atom";
import ModalEditarGanhador from "./ModaisGanhadores/ModalEditarGanhador/ModalEditarGanhador";
import ModalNovoGanhador from "./ModaisGanhadores/ModalNovoGanhador/ModalNovoGanhador";
import Modal from "../../components/Modal/Modal";
import { useEffect, useState } from "react";
import { fetchDados } from "../../common/http/http";

export default function Ganhadores() {
  const [openModalNovoGanhador, setOpenModalNovoGanhador] = useRecoilState(stateOpenModalNovoGanhador);
  const [openModalEditarGanhador, setOpenModalEditarGanhador] = useRecoilState(stateOpenModalEditarGanhador);
  const [novoGanhadorInfo, setNovoGanhadorInfo] = useRecoilState(stateNovoGanhadorInfo);
  const [atualizaTabela, setAtualizaTabela] = useState(false);

  const obterDados = async () => {
    const response = await fetchDados(`/produtos/todos/ganhadores/`);
    setNovoGanhadorInfo(response.data);
    console.log('response.data', response.data);
  };

  useEffect(() => {
    obterDados();
  }, []);

  useEffect(() => {
    if(atualizaTabela) {
      obterDados();
      setAtualizaTabela(false)
    }
  }, [atualizaTabela]);

  return (
    <section>
      <Header>
        <h2><i className="fa-solid fa-users"></i> GANHADORES</h2>

        <LinkItem className="button-new" onClick={() => setOpenModalNovoGanhador(!openModalNovoGanhador)}>
          <i className="fas fa-plus"></i> Novo
        </LinkItem>
      </Header>

      <Main>
        <GanhadoresTable />
      </Main>

      <Modal title="NOVO GANHADOR" openState={openModalNovoGanhador} setOpenState={setOpenModalNovoGanhador}>
        <ModalNovoGanhador  setAtualizaTabela={setAtualizaTabela} />
      </Modal>

      <Modal title="EDITAR GANHADOR" openState={openModalEditarGanhador} setOpenState={setOpenModalEditarGanhador}>
        <ModalEditarGanhador setAtualizaTabela={setAtualizaTabela} />
      </Modal>
    </section>
  )
}
