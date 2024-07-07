import styled from "styled-components"

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
  return (
    <ClientInfoModalContainer>
      <label htmlFor=""><b>Nome</b></label>

      <p name="customerName" id="customerName">Rafaela Matos de Souza</p>
      <p>&nbsp;</p>

      <label htmlFor="">
          <b>Telefone</b> 
          <a id="whplnk" href="https://wa.me/5543996726519" target="_blank">
            <i className="fa-brands fa-whatsapp"></i>
          </a>
      </label>

      <p name="customerPhone" id="customerPhone">(43) 99672-6519</p>
      <p>&nbsp;</p>

      <label htmlFor=""><b>CPF</b></label>
      <p name="customerCpf" id="customerCpf">092.648.669-14</p>
      <p>&nbsp;</p>
      
      <label htmlFor=""><b>E-mail</b></label>
      <p name="customerEmail" id="customerEmail">rafaelamatos641@gmail.com</p>
    </ClientInfoModalContainer>
  )
}
