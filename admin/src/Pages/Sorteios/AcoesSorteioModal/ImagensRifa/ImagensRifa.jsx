import { useState } from "react";
import styled from "styled-components";
import { Main } from "../../../../components/AdminLayout/AdminLayout";
import Header from "../../../../components/Header/Header";
import { LinkItem } from "../../../../components/Header/Header";

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
  const [images, setImages] = useState([]);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);

    files.forEach((file) => {
      const isValidType = file.type === "image/jpeg" || file.type === "image/png";
      const isValidSize = file.size <= 400 * 1024;

      if (!isValidType) {
        alert(`O arquivo não é do tipo permitido (JPG ou PNG).`);
        return;
      }

      if (!isValidSize) {
        alert(`O arquivo é maior que 400 KB.`);
        return;
      }

      const img = new Image();
      img.onload = () => {
        const isValidDimensions = img.width === 732 && img.height === 411;
        if (!isValidDimensions) {
          alert(`A imagem não tem as dimensões permitidas (732x411 pixels).`);
          return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result.replace("data:", "").replace(/^.+,/, "");
          setImages((prevImages) => {
            if (prevImages.length < 4) {
              return [...prevImages, base64String];
            } else {
              alert("Você só pode carregar até 4 imagens.");
              return prevImages;
            }
          });
        };
        reader.readAsDataURL(file);
      };
      img.src = URL.createObjectURL(file);
    });
  };

  const handleDeleteImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  // /cadastrar/rifas/imagem

  return (
    <>
      <Header>
        <h2>
          <a href="/dashboard/rifas/editar/174">
            <i style={{ color: "orangered" }} className="fa-solid fa-angle-double-left"></i>
          </a> <i className="fa-solid fa-dice"></i> IMAGENS
        </h2>

        <LinkItem as="label" className="button-new">
          <i className="fas fa-plus"></i> Nova Imagem
          <input type="file" accept="image/jpeg,image/png" onChange={handleFileChange} multiple style={{ display: "none" }} />
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
          {images.map((base64String, index) => (
            <div className="product" key={index}>
              <img src={`data:image/jpeg;base64,${base64String}`} alt={`Imagem ${index + 1}`} />
              <div className="buttons">
                <button onClick={() => handleDeleteImage(index)}><i className="fas fa-trash-alt"></i> Excluir</button>
              </div>
            </div>
          ))}
        </ContainerImages>
      </Main>
    </>
  );
}
