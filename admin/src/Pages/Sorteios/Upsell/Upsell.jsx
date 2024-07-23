import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { Main } from "../../../components/AdminLayout/AdminLayout";
import Header, { LinkItem } from "../../../components/Header/Header";
import Titulo from "../../../components/Titulo/Titulo";
import UpsellForm from "./UpsellForm/UpsellForm";
import UpsellTable from "./UpsellTable/UpsellTable";
import { stateOpenModalAdicionarUpsell, stateOpenModalEditarUpsell, stateUpsellInfoTable, stateUserLogin } from "../../../common/states/atom";
import ModalEditarUpsell from "./UpsellForm/Modais/ModalEditarUpsell/ModalEditarUpsell";
import Modal from "../../../components/Modal/Modal";
import ModalAdicionarUpsell from "./UpsellForm/Modais/ModalAdicionarUpsell/ModalAdicionarUpsell";
import { useEffect, useState } from "react";
import { fetchDados } from "../../../common/http/http";
import { useParams } from "react-router-dom";

export default function Upsell() {
  const [openModalAdicionarUpsell, setOpenModalAdicionarUpsell] = useRecoilState(stateOpenModalAdicionarUpsell);
  const [openModalEditarUpsell, setOpenModalEditarUpsell] = useRecoilState(stateOpenModalEditarUpsell);
  const [atualizaTabela, setAtualizaTabela] = useState(false);
  const setUpsellInfoTable = useSetRecoilState(stateUpsellInfoTable);
  const userLogin = useRecoilValue(stateUserLogin);
  const { id } = useParams();

  const obterDados = async () => {
    const response = await fetchDados(`admin/dashboard/upsell/${id}`, userLogin);
    setUpsellInfoTable(response.data);
  };

  useEffect(() => {
    obterDados();
  }, []);

  useEffect(() => {
    if(atualizaTabela) {
      obterDados();
      setAtualizaTabela(false)
    }
  }, [atualizaTabela]);

  return (
    <section>
      <Header>
        <h2><i className="fa-solid fa-dice"></i> SORTEIOS</h2>
        <LinkItem className="button-new" onClick={() => setOpenModalAdicionarUpsell(!openModalAdicionarUpsell)}>
          <i className="fas fa-plus"></i> Novo
        </LinkItem>
      </Header>

      <Main>
        <Titulo titulo="SAVEIRO CROSS DOS SONHOS" />
        <UpsellForm />
        <UpsellTable />
      </Main>

      <Modal title="UPSELL" openState={openModalAdicionarUpsell} setOpenState={setOpenModalAdicionarUpsell}>
        <ModalAdicionarUpsell setAtualizaTabela={setAtualizaTabela} />
      </Modal>

      <Modal title="EDITAR PACOTE" openState={openModalEditarUpsell} setOpenState={setOpenModalEditarUpsell}>
        <ModalEditarUpsell setAtualizaTabela={setAtualizaTabela} />
      </Modal>
    </section>
  )
}
