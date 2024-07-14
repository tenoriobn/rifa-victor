import { useState } from 'react';
import { useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { stateImagensRifa, stateOpenModalNovaImagem, stateUserLogin } from '../../../../../common/states/atom';
import { postDados } from "../../../../../common/http/http.js";

const ImagemForm = styled.form`
  input {
    display: block;
    margin-right: 5px;
    border-radius: 5px;
    color: #fff;
    padding: 10px;
    background: 0 0;
    border: 1px solid #275680;
  }
  
  button {
    background-color: #007bff;
    color: #fff;
    border: none;
    padding: 10px;
    cursor: pointer;
    margin: 1rem 0;
  }
`;

export default function ModalImagemRifa() {
  const [imagensRifa, setImagensRifa] = useRecoilState(stateImagensRifa);
  const setOpenModalNovaImagem = useSetRecoilState(stateOpenModalNovaImagem);
  const [imagemSelecionada, setImagemSelecionada] = useState(null);
  const userLogin = useRecoilValue(stateUserLogin);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagemSelecionada(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // Verificações de tamanho, tipo e peso do arquivo
    const fileInput = document.getElementById('imagemInput');
    const file = fileInput.files[0];

    // Verifica se a imagem foi selecionada
    if (!file) {
      alert('Por favor, selecione uma imagem.');
      return;
    }

    // Verifica o tipo do arquivo (JPG ou PNG)
    const fileType = file.type;
    if (fileType !== 'image/jpeg' && fileType !== 'image/png') {
      alert('A imagem deve ser do tipo JPG ou PNG.');
      return;
    }

    // Verifica o peso do arquivo (até 400KB)
    const fileSize = file.size / 1024; // em KB
    if (fileSize > 400) {
      alert('O tamanho do arquivo não pode exceder 400KB.');
      return;
    }

    // Verifica as dimensões da imagem (732x411 pixels)
    const img = new Image();
    img.onload = () => {
      const width = img.width;
      const height = img.height;
      if (width > 732 || height > 411) {
        alert('As dimensões da imagem não podem exceder 732x411 pixels.');
        return;
      }

      // Verifica se tem 4 ou mais imagens importadas.
      if (imagensRifa.length >= 4) {
        alert('Você só pode importar no máximo 4 imagens.');
        return;
      }

      // Se todas as verificações passarem, adiciona a imagem ao estado e fecha o modal
      if (imagemSelecionada) {
        setImagensRifa([...imagensRifa, imagemSelecionada]);

        handleSubmitImage();

        setOpenModalNovaImagem(false);
      }
    };
    img.src = URL.createObjectURL(file);
  };


  const handleSubmitImage = async () => {
    try {
      const rifaId = 2;
      const response = await postDados('/admin/dashboard/rifa/imagens/cadastrar', { imagem: imagemSelecionada, rifa_id: rifaId }, userLogin);

      console.log('response: ', response)

    } catch (error) {
      console.error('Erro ao fazer POST:', error);
    } 
  };

  return (
    <ImagemForm id="uploadImagemForm" onSubmit={handleSubmit}>
      <input type="hidden" name="csrf_token" defaultValue="" />
      <input
        id="imagemInput"
        type="file"
        name="imagem"
        accept="image/jpeg,image/png"
        onChange={handleFileChange}
      />
      <button type="submit">Enviar</button>
    </ImagemForm>
  );
}
