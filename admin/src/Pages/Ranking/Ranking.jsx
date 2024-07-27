/* eslint-disable react-hooks/exhaustive-deps */
import { useRecoilState, useSetRecoilState } from "recoil";
import { stateOpenModalVerInfoCliente, stateOptionsRifa, stateRankingInfoTable } from "../../common/states/atom";
import { Main } from "../../components/AdminLayout/AdminLayout";
import Header from "../../components/Header/Header";
import Titulo from "../../components/Titulo/Titulo";
import RankingForm from "./RankingForm/RankingForm";
import RankingTable from "./RankingTable/RankingTable";
import Modal from "../../components/Modal/Modal";
import ModalRankingInfo from "./ModalRankingInfo/RankingInfoModal";
import { useEffect } from "react";
import { fetchDados } from "../../common/http/http";
import { useState } from "react";
import PedidosPagination from "../Pedidos/PedidosPagination/PedidosPagination";

export default function Ranking() {
  const [openModalVerInfoCliente, setOpenModalVerInfoCliente] = useRecoilState(stateOpenModalVerInfoCliente);
    const setRankingInfo =  useSetRecoilState(stateRankingInfoTable);
    const setOptionsRifa = useSetRecoilState(stateOptionsRifa);
    const [pagination, setPagination] = useState(null)
    const [currentPage, setCurrentPage] = useState(1);

  const obterDados = async (page = 1) => {
    const response = await fetchDados(`/admin/dashboard/ranking-geral?page=${page}`);
    setRankingInfo (response.data.data);

    setPagination(response.data);

    const responseOptions = await fetchDados(`/admin/dashboard/client/rifa/ativas`);
    setOptionsRifa(responseOptions.data);
  };

  useEffect(() => {
    obterDados(currentPage);
  }, [currentPage]);
  
  return (
    <section>
      <Header>
        <h2><i className="fa-solid fa-ranking-star"></i> RANKING</h2>
      </Header>

      <Main>
        <Titulo titulo="Filtros de Busca" />
        <RankingForm />
        <RankingTable />
        <PedidosPagination
          pagination={pagination} 
          onPageChange={(page) => setCurrentPage(page)}
        />
      </Main>

      <Modal title="CLIENTE" openState={openModalVerInfoCliente} setOpenState={setOpenModalVerInfoCliente}>
        <ModalRankingInfo />
      </Modal>
    </section>
  )
}
