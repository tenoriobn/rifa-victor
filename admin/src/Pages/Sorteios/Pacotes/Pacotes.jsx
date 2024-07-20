/* eslint-disable react-hooks/exhaustive-deps */
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import { Main } from "../../../components/AdminLayout/AdminLayout";
import Header, { LinkItem } from "../../../components/Header/Header";
import Modal from "../../../components/Modal/Modal";
import Titulo from "../../../components/Titulo/Titulo";
import ModalAdicionarPacote from "./Modais/ModalAdicionarPacote/ModalAdicionarPacote";
import FormPacotes from "./PacotesForm/PacotesForm";
import PacoteTable from "./PacoteTable/PacoteTable";
import { stateOpenModalAdicionarPacote, stateOpenModalEditarPacote, stateTabelaPacotesInfo, stateUserLogin, statePacote } from "../../../common/states/atom";
import ModalEditarPacote from "./Modais/ModalEditarPacote/ModalEditarPacote";
import { useEffect } from "react";
import { fetchDados } from "../../../common/http/http";
import { useParams } from "react-router-dom";

export default function Pacotes() {
  const [openModalAdicionarPacote, setOpenModalAdicionarPacote] = useRecoilState(stateOpenModalAdicionarPacote);
  const [openModalEditarPacote, setOpenModalEditarPacote] = useRecoilState(stateOpenModalEditarPacote);
  const [tabelaPacotesInfo, setTabelaPacotesInfo] = useRecoilState(stateTabelaPacotesInfo)
  const userLogin = useRecoilValue(stateUserLogin);
  const { id } = useParams();
  const resetPacote = useResetRecoilState(statePacote);

  useEffect(() => {
    const obterDados = async () => {
      const response = await fetchDados(`/admin/dashboard/todos-pacotes/${id}`, userLogin);
      setTabelaPacotesInfo(response.data);
    
    };
    if (id) {
      obterDados();
    }
    // console.log('response ',response.data);
  }, []);

  const handleOpenModalAdicionarPacote = () => {
    setOpenModalAdicionarPacote(!openModalAdicionarPacote)
    resetPacote();
  } 

  return (
    <section>
      <Header>
        <h2>
          <a href={`/dashboard/rifas/editar/${id}`}>
            <i style={{ color: "orangered" }} className="fa-solid fa-angle-double-left"></i>
          </a> <i className="fa-solid fa-box-open"></i> PACOTES
        </h2>

        <LinkItem className="button-new" onClick={handleOpenModalAdicionarPacote}>
          <i className="fas fa-plus"></i> Novo
        </LinkItem>
      </Header>

      <Main>
        <Titulo titulo="SAVEIRO CROSS DOS SONHOS" />
        <FormPacotes />
        <PacoteTable />
      </Main>

      <Modal title="ADICIONAR PACOTE" openState={openModalAdicionarPacote} setOpenState={setOpenModalAdicionarPacote}>
        <ModalAdicionarPacote />
      </Modal>

      <Modal title="EDITAR PACOTE" openState={openModalEditarPacote} setOpenState={setOpenModalEditarPacote}>
        <ModalEditarPacote />
      </Modal>
    </section>
  )
}
