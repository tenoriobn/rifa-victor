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
    // const pedidosInfoModal = useRecoilValue(statePedidosInfoModal);

    const clienteInfo = {
      nome: "Rafaela Matos de Souza",
      telefone: "(43) 99672-6519",
      whatsappLink: "https://wa.me/5543996726519"
    };

  return (
    <ClientInfoModalContainer>
      <label htmlFor="customerName"><b>Nome</b></label>
      <p name="customerName" id="customerName">{clienteInfo.nome}</p>
      <p>&nbsp;</p>

      <label htmlFor="customerPhone">
        <b>Telefone</b>&nbsp; 
        <a id="whplnk" href={clienteInfo.whatsappLink} target="_blank" rel="noopener noreferrer">
          <i className="fa-brands fa-whatsapp"></i>
        </a>
      </label>
      <p name="customerPhone" id="customerPhone">{clienteInfo.telefone}</p>
      <p>&nbsp;</p>
    </ClientInfoModalContainer>
  )
}
