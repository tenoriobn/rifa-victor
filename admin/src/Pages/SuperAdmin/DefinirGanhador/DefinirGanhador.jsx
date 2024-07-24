/* eslint-disable react-hooks/exhaustive-deps */
import { useRecoilState, useSetRecoilState } from "recoil";
import FiltroUsuarioForm from "./FiltroUsuarioForm/FiltroUsuarioForm";
import FiltroUsuarioTable from "./FiltroUsuarioTable/FiltroUsuarioTable";
import ModalTrocarBilhete from "./ModalTrocarBilhete/ModalTrocarBilhete";
import { Main } from "../../../components/AdminLayout/AdminLayout";
import Header from "../../../components/Header/Header";
import Modal from "../../../components/Modal/Modal";
import Titulo from "../../../components/Titulo/Titulo";
import { stateOpenModalNovoGanhador, stateOptionsRifa } from "../../../common/states/atom";
import { fetchDados } from "../../../common/http/http";
import { useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';

export default function DefinirGanhador() {
  const [openModalNovoGanhador, setOpenModalNovoGanhador] = useRecoilState(stateOpenModalNovoGanhador);
  const setOptionsRifa = useSetRecoilState(stateOptionsRifa);
  
  useEffect(() => {
    const obterDados = async () => {
      const response = await fetchDados(`/admin/dashboard/client/rifa/ativas`);

      setOptionsRifa(response.data);
    };
  
    obterDados();
  }, []);

  const notifySuccess = (message) => {
    toast.success(message);
  };

  const notifyError = (message) => {
    toast.error(message);
  };

  return (
    <section>
      <Header>
        <h2><i className="fa-solid fa-user"></i> Definir Ganhador</h2>
      </Header>

      <Main>
        <Titulo titulo={"Filtros de Busca"} />
        <FiltroUsuarioForm />
        <FiltroUsuarioTable />
      </Main>

      <Modal title="DEFINIR GANHADOR" openState={openModalNovoGanhador} setOpenState={setOpenModalNovoGanhador}>
        <ModalTrocarBilhete onNotifySuccess={notifySuccess} onNotifyError={notifyError} />
      </Modal>

      <ToastContainer theme="colored" />
    </section>
  )
}
