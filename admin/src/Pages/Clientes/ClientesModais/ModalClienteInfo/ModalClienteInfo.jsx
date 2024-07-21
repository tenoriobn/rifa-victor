import styled from "styled-components"
import { useRecoilValue } from "recoil";
import { stateClienteInfoModal } from "../../../../common/states/atom";

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

export default function ModalClienteInfo() {
  const clienteInfoModal = useRecoilValue(stateClienteInfoModal);
    const formatPhoneNumber = (number) => {
      const cleanedNumber = number.replace(/\D/g, '');
    
      return `55${cleanedNumber}`;
    };
  
    const formattedPhoneNumber = formatPhoneNumber(clienteInfoModal.cellphone);

  return (
    <ClientInfoModalContainer>
      <label htmlFor="customerName"><b>Nome</b></label>
      <p name="customerName" id="customerName">{clienteInfoModal?.name} {clienteInfoModal?.surname}</p>
      <p>&nbsp;</p>

      <label htmlFor="customerPhone">
        <b>Telefone</b>&nbsp; 
        <a id="whplnk" href={`https://wa.me/${formattedPhoneNumber}`} target="_blank" rel="noopener noreferrer">
          <i className="fa-brands fa-whatsapp"></i>
        </a>
      </label>
      <p name="customerPhone" id="customerPhone">{clienteInfoModal.cellphone}</p>
      <p>&nbsp;</p>
    </ClientInfoModalContainer>
  )
}
