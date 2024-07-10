import { useEffect, useState } from "react";
import { Main } from "../../../components/AdminLayout/AdminLayout";
import Header, { LinkItem } from "../../../components/Header/Header";
import { useRecoilState, useRecoilValue } from "recoil";
import { stateInfoRifaForm, stateUserLogin } from "../../../common/states/atom";
import { fetchDados, putDados } from "../../../common/http/http";
import Geral from "../AdicionarRifa/Geral/Geral";
import Cotas from "../AdicionarRifa/Cotas/Cotas";
import DataPagamento from "../AdicionarRifa/DataPagamentos/DataPagamentos";
import Promocoes from "../AdicionarRifa/Promocoes/Promocoes";
import Campanhas from "../AdicionarRifa/Campanhas/Campanhas";
import Outros from "../AdicionarRifa/Outros/Outros";
import DescricaoProduto from "../AdicionarRifa/DescricaoProduto/DescricaoProduto";
import DescricaoSorteio from "../AdicionarRifa/DescricaoSorteio/DescricaoSorteio";
import Regulamento from "../AdicionarRifa/Regulamento/Regulamento";
import PedidoAprovado from "../AdicionarRifa/PedidoAprovado/PedidoAprovado";
import { CategoryContainer } from "../AdicionarRifa/CriarRifa";
import { useParams } from "react-router-dom";

export default function EditarRifa() {
  const { id } = useParams();
  
  const [formState, setFormState] = useRecoilState(stateInfoRifaForm);
  const userLogin = useRecoilValue(stateUserLogin);
  const [submitting, setSubmitting] = useState(false);
  const [postError, setPostError] = useState(null);

  const flattenObject = (obj) => {
    const flattened = {};

    Object.keys(obj).forEach((key) => {
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        Object.assign(flattened, flattenObject(obj[key]));
      } else {
        flattened[key] = obj[key];
      }
    });

    return flattened;
  };


  useEffect(() => {
    const obterDados = async () => {
      const response = await fetchDados(`/admin/editar/rifa/${id}`, userLogin);
      console.log('response:', response);

      const flattenedData = flattenObject(response.data);
      setFormState(flattenedData);

      console.log('response data:', response.data);
      console.log('flattened data:', flattenedData);
    };
    
    if (id) {
      obterDados();
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    console.log(formState);

    try {
      const response = await putDados(`/admin/editar/rifa/${id}`, formState, userLogin);
      console.log('response:', response);

    } catch (error) {
      console.error('Erro ao fazer POST:', error);
      setPostError('Erro ao enviar os dados.');
    } finally {
      setSubmitting(false);
    }
  };
  
  return (
    <>
      <Header>
        <h2><i className="fa-solid fa-dice"></i> EDITAR SORTEIO</h2>

        <LinkItem to={`/dashboard/rifas/imagens/${id}`} className="button-new">
          <i className="fa-solid fa-image"></i> IMAGENS
        </LinkItem>
      </Header>

      <Main>
        <form action="" id="frmRaffle" className="dropzone" method="POST" onSubmit={handleSubmit}>
          <CategoryContainer className="category-container">
            <Geral />
            <Cotas mostrarCampo={true} mostrarQtdNumeros={true} />
            <DataPagamento />
            <Promocoes mostrarCampo={true} />
            <Campanhas />
            <Outros />
            <DescricaoProduto />
            <DescricaoSorteio />
            <Regulamento />
            <PedidoAprovado />

            <input hidden id="" />

            <button 
              type="submit" 
              className="success" 
              id="btnSend" 
              disabled={submitting}
            >
              {submitting ? 'Enviando...' : 'ADICIONAR'}
            </button>
            {postError && <p style={{ color: 'red' }}>{postError}</p>}
          </CategoryContainer>
        </form>
      </Main>
    </>
  );
}
