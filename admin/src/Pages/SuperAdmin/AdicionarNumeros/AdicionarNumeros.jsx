import { useRecoilState } from "recoil";
import { stateOpenModalAdicionarNumeros, stateOptionsRifa } from "../../../common/states/atom";
import { Main } from "../../../components/AdminLayout/AdminLayout";
import Header from "../../../components/Header/Header";
import Modal from "../../../components/Modal/Modal";
import Titulo from "../../../components/Titulo/Titulo";
import ModalAdicionarNumeros from "./ModalAdicionarNumeros/ModalAdicionarNumeros";
import FiltroUsuarioForm from "./FiltroUsuarioForm/FiltroUsuarioForm";
import FiltroUsuarioTable from "./FiltroUsuarioTable/FiltroUsuarioTable";
import { fetchDados } from "../../../common/http/http";
import { useEffect } from "react";


export default function AdicionarNumeros() {
  const [openModalAdicionarNumeros, setOpenModalAdicionarNumeros] = useRecoilState(stateOpenModalAdicionarNumeros);
  const [optionsRifa, setOptionsRifa] = useRecoilState(stateOptionsRifa);

  console.log('optionsRifa', optionsRifa)

  useEffect(() => {
    const obterDados = async () => {
      const response = await fetchDados(`/admin/dashboard/client/rifa/ativas`);

      setOptionsRifa(response.data);
    };
    

    obterDados();
  }, []);

  return (
    <section>
      <Header>
        <h2><i className="fa-solid fa-user"></i> Adicionar Numeros</h2>
      </Header>

      <Main>
        <Titulo titulo={"Filtros de Busca"} />
        <FiltroUsuarioForm />
        <FiltroUsuarioTable />
      </Main>

      <Modal title="ADICIONAR NÚMEROS" openState={openModalAdicionarNumeros} setOpenState={setOpenModalAdicionarNumeros}>
        <ModalAdicionarNumeros />
      </Modal>
    </section>
  )
}
