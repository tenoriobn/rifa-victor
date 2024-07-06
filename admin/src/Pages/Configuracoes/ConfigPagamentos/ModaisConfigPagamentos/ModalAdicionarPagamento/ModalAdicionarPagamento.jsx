import styled from "styled-components"

const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 370px;

  .btn-pag {
    color: white;
    border: none;
    border-radius: 5px;
    padding: 10px 15px;
    cursor: pointer;
    box-sizing: border-box;
  }

  .button-export {
    background-color: #36b9cc;
  }

  .button-view {
    background-color: #4e73df;
  }
`;

export default function ModalAdicionarPagamento() {
  return (
    <ModalBody action="" id="frmAddPack" method="POST">
      <a 
        id="btn_edit" 
        className="btn-pag button-export" 
        style={{marginBottom: "10px", width: "200px", alignItems: "center"}}
      >
        <i className="fa-brands fa-pix"></i> <b>Mercado Pago</b>
      </a>

      <a 
        id="btn_edit" 
        className="btn-pag button-view" 
        style={{marginBottom: "10px", width: "200px", alignItems: "center"}}
      >
        <i className="fa-brands fa-pix"></i> <b>PixCred</b>
      </a>

      <a 
        id="btn_edit" 
        className="btn-pag button-export" 
        style={{marginBottom: "10px", width: "200px", alignItems: "center"}}
      >
        <i className="fa-brands fa-pix"></i> <b>Paggue</b>
      </a>

      <a 
        id="btn_edit " 
        className="btn-pag button-view" 
        style={{marginBottom: "10px", width: "200px", alignItems: "center"}}
      >
        <i className="fa-brands fa-pix"></i> <b>Pay2M</b>
      </a>
    </ModalBody>
  )
}
