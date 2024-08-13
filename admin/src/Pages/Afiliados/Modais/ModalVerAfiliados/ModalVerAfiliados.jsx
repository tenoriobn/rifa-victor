import { useRecoilValue } from "recoil";
import { stateAfiliadosInfoModal } from "../../../../common/states/atom";
import styled from "styled-components";
import { ToastContainer, toast } from 'react-toastify';

const AfiliadoInfoModalContainer = styled.div`
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


export default function ModalVerAfiliados() {
  const afiliadosInfo = useRecoilValue(stateAfiliadosInfoModal);

  const formatPhoneNumber = (number) => {
    const cleanedNumber = number.replace(/\D/g, '');
  
    return `55${cleanedNumber}`;
  };

  const formattedPhoneNumber = formatPhoneNumber(afiliadosInfo?.cellphone);

  const copyLinkToClipboard = () => {
    if (afiliadosInfo?.link) {
      navigator.clipboard.writeText(afiliadosInfo.link)
        .then(() => {
          toast.success('Link copiado para a área de transferência!');
        })
        .catch(() => {
          toast.error('Falha ao copiar o link.');
        });
    }
  };
  
  return (
    <AfiliadoInfoModalContainer>
      <label><b>Nome</b></label>
      <p>{afiliadosInfo?.client?.name} {afiliadosInfo?.client?.surname}</p>
      <p>&nbsp;</p>

      <label>
        <b>Telefone</b> &nbsp;
        <a id="whplnk" href={`https://wa.me/${formattedPhoneNumber}`} target="_blank" rel="noopener noreferrer">
          <i className="fa-brands fa-whatsapp"></i>
        </a>
      </label>
      <p>{afiliadosInfo?.cellphone}</p>

      <p>&nbsp;</p>
      <label><b>Link Afiliado</b></label>
      <p 
        onClick={copyLinkToClipboard} 
        style={{ cursor: 'pointer', textDecoration: 'underline' }}
      >
        {afiliadosInfo?.link}
      </p>

      <ToastContainer theme="colored"/>
    </AfiliadoInfoModalContainer>
  )
}
