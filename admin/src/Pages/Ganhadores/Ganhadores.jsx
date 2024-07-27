/* eslint-disable react-hooks/exhaustive-deps */
import { useRecoilState, useSetRecoilState, useResetRecoilState } from "recoil";
import { Main } from "../../components/AdminLayout/AdminLayout";
import Header, { LinkItem } from "../../components/Header/Header";
import GanhadoresTable from "./GanhadoresTable/GanhadoresTable";
import { stateOpenModalNovoGanhador, stateOpenModalEditarGanhador, stateNovoGanhadorInfo, stateNovoGanhador } from "../../common/states/atom";
import ModalEditarGanhador from "./ModaisGanhadores/ModalEditarGanhador/ModalEditarGanhador";
import ModalNovoGanhador from "./ModaisGanhadores/ModalNovoGanhador/ModalNovoGanhador";
import Modal from "../../components/Modal/Modal";
import { useEffect, useState } from "react";
import { fetchDados } from "../../common/http/http";

export default function Ganhadores() {
  const [openModalNovoGanhador, setOpenModalNovoGanhador] = useRecoilState(stateOpenModalNovoGanhador);
  const [openModalEditarGanhador, setOpenModalEditarGanhador] = useRecoilState(stateOpenModalEditarGanhador);
  const setNovoGanhadorInfo = useSetRecoilState(stateNovoGanhadorInfo);
  const [atualizaTabela, setAtualizaTabela] = useState(false);
  const resetInputSorteio = useResetRecoilState(stateNovoGanhador);

  const obterDados = async () => {
    const response = await fetchDados(`/produtos/todos/ganhadores/`);
    setNovoGanhadorInfo(response.data);
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

  const handleClearState = () => {
    setOpenModalNovoGanhador(!openModalNovoGanhador);
    resetInputSorteio();
  }

  return (
    <section>
      <Header>
        <h2><i className="fa-solid fa-users"></i> GANHADORES</h2>

        <LinkItem className="button-new" onClick={() => handleClearState()}>
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
