/* eslint-disable react-hooks/exhaustive-deps */
import { useRecoilState, useSetRecoilState } from "recoil";
import { Main } from "../../components/AdminLayout/AdminLayout";
import Header from "../../components/Header/Header";
import Titulo from "../../components/Titulo/Titulo";
import PedidosForm from "./PedidosForm/PedidosForm";
import PedidosPagination from "./PedidosPagination/PedidosPagination";
import PedidosTable from "./PedidosTable/PedidosTable";
import { stateOpenModalVerCota, stateOptionsRifa, statePedidosInfo } from "../../common/states/atom";
import Modal from "../../components/Modal/Modal";
import ModalPedido from "./ModalPedido/ModalPedido";
import { fetchDados } from "../../common/http/http";
import { useEffect, useState } from "react";

export default function Pedidos() {
  const [openModalVerCota, setOpenModalVerCota] = useRecoilState(stateOpenModalVerCota);
  const setPedidosInfo =  useSetRecoilState(statePedidosInfo);
  const [atualizaTabela, setAtualizaTabela] = useState(false);
  const setOptionsRifa = useSetRecoilState(stateOptionsRifa);
  const [pagination, setPagination] = useState(null)
  const [currentPage, setCurrentPage] = useState(1);

  const obterDados = async (page = 1) => {
    try {
      const response = await fetchDados(`/admin/dashboard/pedidos?page=${page}`);
      setPedidosInfo(response.data.data);
      setPagination(response.data);

      const responseOptions = await fetchDados(`/admin/dashboard/client/rifa/ativas`);
      setOptionsRifa(responseOptions.data);
    } catch (error) {
      console.error("Erro ao obter dados:", error);
    }
  };

  useEffect(() => {
    obterDados(currentPage);
  }, [currentPage]);

  useEffect(() => {
    if(atualizaTabela) {
      obterDados();
      setAtualizaTabela(false)
    }
  }, [atualizaTabela]);

  return (
    <section>
      <Header>
        <h2><i className="fa-solid fa-receipt"></i> PEDIDOS</h2>
      </Header>

      <Main>
        <Titulo titulo="Filtros de Busca" />
        <PedidosForm />
        <PedidosTable setAtualizaTabela={setAtualizaTabela} />
        <PedidosPagination 
          pagination={pagination} 
          onPageChange={(page) => setCurrentPage(page)}
        />
      </Main>

      <Modal title="PEDIDO" openState={openModalVerCota} setOpenState={setOpenModalVerCota} maxWidth={{ maxWidth: '595px' }}>
        <ModalPedido />
      </Modal>
    </section>
  )
}
