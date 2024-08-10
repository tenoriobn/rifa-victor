/* eslint-disable react-hooks/exhaustive-deps */
import { Main } from "../../../../components/AdminLayout/AdminLayout";
import Header, { LinkItem } from "../../../../components/Header/Header";
import Titulo from "../../../../components/Titulo/Titulo";
import TabelaCotas from "./TabelaCotas/TabelaCotas";
import Modal from "../../../../components/Modal/Modal";
import { useRecoilState, useRecoilValue, useSetRecoilState, useResetRecoilState } from "recoil";
import { stateOpenModalAdicionarCota, stateOpenModalCotaPremiada, stateOpenModalEditarCotaPremiada, stateTabelaCotasInfo, stateUserLogin, stateCotasPremiadas } from "../../../../common/states/atom";
import AdicionarCota from "./AdicionarCota/AdicionarCota";
import CotasForm from "./CotasForm/CotasForm";
import ModalCotaPremiada from "./ModalCotaPremiada/ModalCotaPremiada";
import ModalEditarCotaPremiada from "./ModalEditarCotaPremiada/ModalEditarCotaPremiada";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { fetchDados } from "../../../../common/http/http";
import PedidosPagination from "../../../Pedidos/PedidosPagination/PedidosPagination";
import { useState } from "react";

export default function RifasCotas() {
  const [openModalAdicionarCota, setOpenModalAdicionarCota] = useRecoilState(stateOpenModalAdicionarCota);
  const [openModalCotaPremiada, setOpenModalCotaPremiada] = useRecoilState(stateOpenModalCotaPremiada);
  const [openModalEditarCotaPremiada, setOpenModalEditarCotaPremiada] = useRecoilState(stateOpenModalEditarCotaPremiada);
  const { id } = useParams();
  const setTabelaCotasInfo = useSetRecoilState(stateTabelaCotasInfo);
  const userLogin = useRecoilValue(stateUserLogin);
  const resetCotaPremiada = useResetRecoilState(stateCotasPremiadas);
  const [pagination, setPagination] = useState(null)
  const [currentPage, setCurrentPage] = useState(1);
  const [title, setTitle] = useState('')

  const obterDados = async (page = 1) => {
    const response = await fetchDados(`/admin/dashboard/bilhete-premiado/all/${id}?page=${page}`, userLogin);
    setTabelaCotasInfo(response.data.data);

    setTitle(response.nomeRifa.title)

    setPagination(response.data);
  };

  useEffect(() => {

    if (id) {
      obterDados(currentPage);
    }
  }, [currentPage]);

  const handleOpenModalAdicionarCota = () => {
    setOpenModalAdicionarCota(!openModalAdicionarCota);
    resetCotaPremiada();
  } 

  return (
    <section>
      <Header>
        <h2>
          <a href={`/dashboard/rifas/editar/${id}`}>
            <i style={{ color: "orangered" }} className="fa-solid fa-angle-double-left"></i>
          </a> <i className="fa-solid fa-box-open"></i> COTAS PRÊMIADAS
        </h2>

        <LinkItem className="button-new" onClick={handleOpenModalAdicionarCota}>
          <i className="fas fa-plus"></i> Novo
        </LinkItem>
      </Header>

      <Main>
        <Titulo titulo={title} />

        <CotasForm />

        <TabelaCotas />

        <PedidosPagination
          pagination={pagination} 
          onPageChange={(page) => setCurrentPage(page)}
        />
      </Main>

      <Modal title="ADICIONAR COTA" openState={openModalAdicionarCota} setOpenState={setOpenModalAdicionarCota}>
        <AdicionarCota />
      </Modal>

      <Modal title="COTA PREMIADA" openState={openModalCotaPremiada} setOpenState={setOpenModalCotaPremiada}>
        <ModalCotaPremiada />
      </Modal>

      <Modal title="EDITAR COTA" openState={openModalEditarCotaPremiada} setOpenState={setOpenModalEditarCotaPremiada}>
        <ModalEditarCotaPremiada />
      </Modal>

    </section>
  )
}
