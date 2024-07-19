import { useRecoilState } from "recoil";
import FiltroUsuarioForm from "./FiltroUsuarioForm/FiltroUsuarioForm";
import FiltroUsuarioTable from "./FiltroUsuarioTable/FiltroUsuarioTable";
import { Main } from "../../../components/AdminLayout/AdminLayout";
import Header from "../../../components/Header/Header";
import Modal from "../../../components/Modal/Modal";
import Titulo from "../../../components/Titulo/Titulo";
import { stateOpenModalAdicionarBilhetePremiado, stateOptionsRifa } from "../../../common/states/atom";
import ModalAdicionarBilhetePremiado from "./ModalAdicionarBilhetePremiado/ModalAdicionarBilhetePremiado";
import { useEffect } from "react";
import { fetchDados } from "../../../common/http/http";

export default function AdicionarBilhetePremiado() {
  const [openModalAdicionarBilhetePremiado, setOpenModalAdicionarBilhetePremiado] = useRecoilState(stateOpenModalAdicionarBilhetePremiado);
  const [optionsRifa, setOptionsRifa] = useRecoilState(stateOptionsRifa);

  console.log('optionsRifa', optionsRifa)

  useEffect(() => {
    const obterDados = async () => {
      const response = await fetchDados(`/admin/dashboard/client/rifa/ativas`);

      setOptionsRifa(response.data);
    };
    

    obterDados();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section>
      <Header>
        <h2><i className="fa-solid fa-user"></i> ADICIONAR BILHETES PREMIADOS</h2>
      </Header>

      <Main>
        <Titulo titulo={"Filtros de Busca"} />
        <FiltroUsuarioForm />
        <FiltroUsuarioTable />
      </Main>

      <Modal title="DEFINIR GANHADOR" openState={openModalAdicionarBilhetePremiado} setOpenState={setOpenModalAdicionarBilhetePremiado}>
        <ModalAdicionarBilhetePremiado />
      </Modal>
    </section>
  )
}
