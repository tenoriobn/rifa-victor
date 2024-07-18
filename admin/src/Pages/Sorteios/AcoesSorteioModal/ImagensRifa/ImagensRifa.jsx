/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import styled from "styled-components";
import { Main } from "../../../../components/AdminLayout/AdminLayout";
import Header from "../../../../components/Header/Header";
import { LinkItem } from "../../../../components/Header/Header";
import Modal from "../../../../components/Modal/Modal";
import { useRecoilState, useRecoilValue } from "recoil";
import { stateImagemRifaUpload, stateImagensRifa, stateOpenModalNovaImagem, stateUserLogin } from "../../../../common/states/atom";
import ModalImagemRifa from "./ModalImagemRifa/ModalImagemRifa";
import { deleteDados, fetchDados } from "../../../../common/http/http";
import { useParams } from "react-router-dom";

const TextImagesContainer = styled.div`
  line-height: 1.25rem;

  h2 {
    font-size: 1.5em;
    font-weight: 500;
    text-align: center;
    color: #f5f5f5;
    margin-bottom: 1rem;
  }

  b {
    font-weight: 600;
  }
`;

const ContainerImages = styled.div`
  margin-top: 50px;
  display: flex;
  align-items:center;
  justify-content: center;

  .product {
    border: 1px solid #ccc;
    padding: 10px;
    margin: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items:center;
    width: 250px;
    text-align: center;
    box-sizing: border-box;
  }

  .product img {
    width: 200px;
    max-height: 100px;
    object-fit: cover;
  }

  .buttons {
    margin-top: 10px;
  }

  .buttons button {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px;
    margin: 5px;
    cursor: pointer;
  }
`;

export default function ImagensRifa() {
  const [imagensRifa, setImagensRifa] = useRecoilState(stateImagensRifa) 
  const [openModalNovaImagem, setOpenModalNovaImagem] = useRecoilState(stateOpenModalNovaImagem);
  const userLogin = useRecoilValue(stateUserLogin);
  const { id } = useParams();
  const [imagemRifaUpload, setImagemRifaUpload] = useRecoilState(stateImagemRifaUpload);
  const [imagemRifaDelete, setImagemRifaDelete] = useState('')
  const [isLoading, setIsLoading] = useState(true);

  const handleExcluirImagem = async (idImg) => {
    const response = await deleteDados(`admin/dashboard/rifa/imagens/deletar/${idImg}`, userLogin);
    console.log('deleted: ', response)
    setImagemRifaDelete(response)
  };

  useEffect(() => {
    const obterImage = async () => {
      try {
        setIsLoading(true);
        const response = await fetchDados(`/admin/dashboard/rifa/imagens/${id}`, userLogin);
        if (response.data && response.data.length > 0) {
          setImagensRifa(response.data);
        } else {
          setImagensRifa([]);
        }
  
        setImagemRifaDelete(false);
        setImagemRifaUpload(false);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setImagensRifa([]);
        } else {
          console.error('Erro ao obter imagens:', error);
        }
      } finally {
        setIsLoading(false);
      }
    };
  
    obterImage();
  }, [imagemRifaUpload, imagemRifaDelete, id, userLogin]);

  return (
    <>
      <Header>
        <h2>
          <a href={`/dashboard/rifas/editar/${id}`}>
            <i style={{ color: "orangered" }} className="fa-solid fa-angle-double-left"></i>
          </a> <i className="fa-solid fa-dice"></i> IMAGENS
        </h2>

        <LinkItem as="label" className="button-new" onClick={() => setOpenModalNovaImagem(!openModalNovaImagem)}>
          <i className="fas fa-plus"></i> Nova Imagem
        </LinkItem>
      </Header>

      <Main>
        <TextImagesContainer>
          <h2>SAVEIRO CROSS DOS SONHOS </h2>

          <center>
            <p><b>TAMANHO:</b> 16x9 (732x411 pixels)</p>
            <p><b>Tipos permitidos:</b> JPG e PNG</p>
            <p><b>Para não prejudicar a experiencia do usuário não enviar arquivos maiores que 400 KB</b></p>
          </center>
        </TextImagesContainer>

        <ContainerImages>
          {isLoading ? (
            <p className="carregando">Carregando...</p>
          ) : imagensRifa.length > 0 ? (
            imagensRifa.map((imagem, index) => (
              <div className="product" key={index}>
                <img src={`../../../../../public/imgRifas/${imagem.path}`} alt={`Imagem ${index + 1}`} />
                <div className="buttons">
                  <button onClick={() => handleExcluirImagem(imagem.id)}>
                    <i className="fas fa-trash-alt"></i> Excluir
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="nenhuma-imagem">Nenhuma imagem encontrada.</p>
          )}
        </ContainerImages>
      </Main>

      <Modal title="NOVA IMAGEM" openState={openModalNovaImagem} setOpenState={setOpenModalNovaImagem}>
        <ModalImagemRifa />
      </Modal>
    </>
  );
}
