import styled from "styled-components";

const Form = styled.form`
  text-align: center;
  max-width: 300px;
  width: 100%;

  input {
    height: 40px;
    margin-right: 5px;
    border-radius: 5px;
    color: #fff;
    padding: 10px;
    width: 100%;
    background: 0 0;
    border: 1px solid #275680;
    box-sizing: border-box;
  }

  .button-search {
    background-color: #858796;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 10px 15px;
    cursor: pointer;
    transition: all .3s ease-in-out;
  }

  .button-search:hover {
    opacity: .8;
  }
`;

export default function ConsultaCotaForm() {
  return (
    <Form>
      <div className="row-input">
        <input className="1numero" name="numero" placeholder="Pesquise pelo número sorteado" defaultValue="" required="" minLength="1" maxLength="6" />
      </div>
      <div style={{height: "10px"}}></div>

      <div className="row-input">
        <button type="submit" className="button-search">
          <i className="fas fa-search"></i> Buscar
        </button>
      </div>
    </Form>
  )
}
