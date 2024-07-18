/* eslint-disable react-hooks/exhaustive-deps */
import { useRecoilState } from "recoil";
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

export default function DefinirGanhador() {
  const [openModalNovoGanhador, setOpenModalNovoGanhador] = useRecoilState(stateOpenModalNovoGanhador);
  const [optionsRifa, setOptionsRifa] = useRecoilState(stateOptionsRifa);

  console.log('optionsRifa', optionsRifa)
  
  useEffect(() => {
    const obterDados = async () => {
      const response = await fetchDados(`/admin/dashboard/rifa/editar/`);

      setOptionsRifa(response);

      console.log('response', response.data)
    };
    

    // obterDados();
  }, []);

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
        <ModalTrocarBilhete />
      </Modal>
    </section>
  )
}
