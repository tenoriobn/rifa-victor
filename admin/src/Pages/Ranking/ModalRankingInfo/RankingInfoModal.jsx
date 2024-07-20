import styled from "styled-components"
import { useRecoilValue } from "recoil";

import { stateRankingInfoModal } from "../../../common/states/atom";

const ClientInfoModalContainer = styled.div`
  width: 100%;
  line-height: 20px;
  margin-bottom: 10px;

  b {
    font-weight: bold;
  }

  p {
    font-size: .9rem;
  }
`;

export default function ModalRankingInfo() {
  // const rankingInfoModal = useRecoilValue(stateRankingInfoModal);

  const rankingInfoModal = {
    nome: {
      label: "Nome",
      value: "Rafaela Matos de Souza",
      id: "customerName",
    },
    telefone: {
      label: "Telefone",
      value: "(43) 99672-6519",
      id: "customerPhone",
      link: "https://wa.me/5543996726519", // Link do WhatsApp
      icon: "fa-brands fa-whatsapp" // Ícone do WhatsApp
    },
  };

  return (
    <ClientInfoModalContainer>
      <label htmlFor={rankingInfoModal.nome.id}><b>{rankingInfoModal.nome.label}</b></label>
      <p name={rankingInfoModal.nome.id} id={rankingInfoModal.nome.id}>{rankingInfoModal.nome.value}</p>
      <p>&nbsp;</p>

      <label htmlFor={rankingInfoModal.telefone.id}>
        <b>{rankingInfoModal.telefone.label}</b> &nbsp;
        {rankingInfoModal.telefone.link && (
          <a id="whplnk" href={rankingInfoModal.telefone.link} target="_blank" rel="noopener noreferrer">
            <i className={rankingInfoModal.telefone.icon}></i>
          </a>
        )}
      </label>
      <p name={rankingInfoModal.telefone.id} id={rankingInfoModal.telefone.id}>{rankingInfoModal.telefone.value}</p>
      <p>&nbsp;</p>
    </ClientInfoModalContainer>
  )
}
