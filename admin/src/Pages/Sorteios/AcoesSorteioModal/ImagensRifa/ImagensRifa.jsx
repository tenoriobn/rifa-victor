import styled from "styled-components";
import { Main } from "../../../../components/AdminLayout/AdminLayout";
import Header from "../../../../components/Header/Header";
import { LinkItem } from "../../../../components/Header/Header";
import Modal from "../../../../components/Modal/Modal";
import { useRecoilState } from "recoil";
import { stateImagensRifa, stateOpenModalNovaImagem } from "../../../../common/states/atom";
import ModalImagemRifa from "./ModalImagemRifa/ModalImagemRifa";

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

  .product {
    border: 1px solid #ccc;
    padding: 10px;
    margin: 10px;
    display: inline-block;
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

  const handleExcluirImagem = (index) => {
    const novasImagens = [...imagensRifa];
    novasImagens.splice(index, 1);
    setImagensRifa(novasImagens);
  };

  console.log(imagensRifa);

  return (
    <>
      <Header>
        <h2>
          <a href="/dashboard/rifas/editar/174">
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
          {imagensRifa.map((imagem, index) => (
            <div className="product" key={index}>
              <img src={imagem} alt={`Imagem ${index + 1}`} />
              <div className="buttons">
                <button onClick={() => handleExcluirImagem(index)}>
                  <i className="fas fa-trash-alt"></i> Excluir
                </button>
              </div>
            </div>
          ))}
        </ContainerImages>
      </Main>

      <Modal title="NOVA IMAGEM" openState={openModalNovaImagem} setOpenState={setOpenModalNovaImagem}>
        <ModalImagemRifa />
      </Modal>
    </>
  );
}
