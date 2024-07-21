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
  const rankingInfoModal = useRecoilValue(stateRankingInfoModal);

  console.log("whatsapp:", `https://wa.me/${rankingInfoModal?.client?.cellphone}`)

  const formatPhoneNumber = (number) => {
    const cleanedNumber = number.replace(/\D/g, '');
  
    return `55${cleanedNumber}`;
  };

  const formattedPhoneNumber = formatPhoneNumber(rankingInfoModal?.client?.cellphone);

  return (
    <ClientInfoModalContainer>
      <label><b>Name</b></label>
      <p>{rankingInfoModal?.client?.name} {rankingInfoModal?.client?.surname}</p>
      <p>&nbsp;</p>
      <label>
        <b>Telefone</b> &nbsp;
        <a id="whplnk" href={`https://wa.me/${formattedPhoneNumber}`} target="_blank" rel="noopener noreferrer">
          <i className="fa-brands fa-whatsapp"></i>
        </a>
      </label>
      <p>{rankingInfoModal?.client?.cellphone}</p>
      <p>&nbsp;</p>
    </ClientInfoModalContainer>
  )
}
