/* eslint-disable react-hooks/exhaustive-deps */
import { useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";
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
import PedidosPagination from "../../Pedidos/PedidosPagination/PedidosPagination";
import { useState } from "react";

export default function Pacotes() {
  const [openModalAdicionarPacote, setOpenModalAdicionarPacote] = useRecoilState(stateOpenModalAdicionarPacote);
  const [openModalEditarPacote, setOpenModalEditarPacote] = useRecoilState(stateOpenModalEditarPacote);
  const setTabelaPacotesInfo = useSetRecoilState(stateTabelaPacotesInfo)
  const userLogin = useRecoilValue(stateUserLogin);
  const { id } = useParams();
  const resetPacote = useResetRecoilState(statePacote);
  const [pagination, setPagination] = useState(null)
  const [currentPage, setCurrentPage] = useState(1);
  const [title, setTitle] = useState('')

  const obterDados = async (page = 1) => {
    const response = await fetchDados(`/admin/dashboard/todos-pacotes/${id}?page=${page}`, userLogin);
    setTabelaPacotesInfo(response.data.data);

    setTitle(response.nomeRifa.title)
  
    setPagination(response.data);
  };

  useEffect(() => {
    if (id) {
      obterDados(currentPage);
    }
  }, [currentPage]);

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
        <Titulo titulo={title} />
        <FormPacotes />
        <PacoteTable />

        <PedidosPagination
          pagination={pagination} 
          onPageChange={(page) => setCurrentPage(page)}
        />
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
