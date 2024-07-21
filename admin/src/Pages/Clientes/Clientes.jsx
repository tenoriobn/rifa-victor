/* eslint-disable react-hooks/exhaustive-deps */
import { useRecoilState, useSetRecoilState } from "recoil";
import { Main } from "../../components/AdminLayout/AdminLayout";
import Header from "../../components/Header/Header";
import Titulo from "../../components/Titulo/Titulo";
import ClientesForm from "./ClientesForm/ClientesForm";
import ClientesTable from "./ClientesTable/ClientesTable";
import { stateClientesInfo, stateOpenModalEditarInfoCliente, stateOpenModalVerInfoCliente } from "../../common/states/atom";
import Modal from "../../components/Modal/Modal";
import ModalClienteInfo from "./ClientesModais/ModalClienteInfo/ModalClienteInfo";
import ModalEditarCliente from "./ClientesModais/ModalEditarCliente/ModalEditarCliente";
import { useEffect, useState } from "react";
import { fetchDados } from "../../common/http/http";

export default function Clientes() {
  const [openModalVerInfoCliente, setOpenModalVerInfoCliente] = useRecoilState(stateOpenModalVerInfoCliente);
  const [openModalEditarInfoCliente, setOpenModalEditarInfoCliente] = useRecoilState(stateOpenModalEditarInfoCliente);
  const [atualizaTabela, setAtualizaTabela] = useState(false);
  const setClientesInfo = useSetRecoilState(stateClientesInfo);

  const obterDados = async () => {
    const response = await fetchDados(`/admin/dashboard/todos/clientes`);
    setClientesInfo(response.data);
  };

  useEffect(() => {
    obterDados();
  }, []);

  useEffect(() => {
    if (atualizaTabela) {
      obterDados();
      setAtualizaTabela(false);
    }
  }, [atualizaTabela]);

  return (
    <section>
      <Header>
        <h2><i className="fa-solid fa-users"></i> CLIENTES</h2>
      </Header>

      <Main>
        <Titulo titulo="Filtros de Busca" />
        <ClientesForm />
        <ClientesTable />
      </Main>

      <Modal title="CLIENTE" openState={openModalVerInfoCliente} setOpenState={setOpenModalVerInfoCliente}>
        <ModalClienteInfo />
      </Modal>

      <Modal 
        title="CLIENTE" 
        openState={openModalEditarInfoCliente} 
        setOpenState={setOpenModalEditarInfoCliente} 
      >
      <ModalEditarCliente 
        atualizaTabela={atualizaTabela}
        setAtualizaTabela={setAtualizaTabela}
      />
      </Modal>
    </section>
  )
}
