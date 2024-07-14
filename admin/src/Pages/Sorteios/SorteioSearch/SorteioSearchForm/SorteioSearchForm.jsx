import styled from "styled-components";
import seta from "../../../../assets/icons/seta.svg";
import Datepicker from "react-tailwindcss-datepicker";
import { useState } from "react";

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-end;
  gap: .625rem;
  margin: 1.875rem 0;

  .filter-item {
    flex-grow: 1;
    max-width: 300px;
  }

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

  .filter-item label {
    display: block;
    margin-bottom: .3125rem;
    color: #f5f5f5;
  }

  select {
    background-image: url(${seta});
    background-repeat: no-repeat;
    background-position: right 10px center;
    background-size: 12px 12px;

    background-color: #20202a;
    color: #fff;
    border: .0625rem solid #275680;
    padding: .625rem;
    border-radius: .3125rem;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    width: 100%;
  }

  .button-search {
    background-color: #858796;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 10px 15px;
    cursor: pointer;
    height: 38px;
  }
`;

export default function SorteioSearchForm() {
  const [value, setValue] = useState({ 
    startDate: null, 
    endDate: null 
    }); 
    
  const handleValueChange = (newValue) => {
    console.log("newValue:", newValue); 
    setValue(newValue); 
  } 

  return (
    <Form method="POST" action="/dashboard/rifas/cotas/174">
      <div className="filter-item" style={{maxWidth: "300px"}}>
        <label>Periodo de Data:</label>
        {/* <input type="text" name="datetimes" defaultValue="" /> */}

        <Datepicker 
          i18n={"pt-br"} 
          displayFormat={"DD/MM/YYYY"}
          showFooter={true} 
          value={value} 
          onChange={handleValueChange} 
          configs={{
              shortcuts: {
              today: "Hoje", 
              yesterday: "Ontem", 
              past: period => `Ultimos ${period} Dias`, 
              currentMonth: "Mês Atual", 
              pastMonth: "Mês Anterior" 
            },
              footer: {
              cancel: "Cancelar", 
              apply: "Aplicar" 
            }
          }} 
        /> 
      </div>

      <div className="filter-item" style={{maxWidth: "180px"}}>
        <label htmlFor="status">Qtd Sortear:</label>
        <input type="number" name="qtd" min="1" max="10" defaultValue="" />
      </div>

      <div className="filter-item">
        <label htmlFor="qtd_cotas">Qtd Cotas &gt;=:</label>
        <input type="text" id="qtd_cotas" name="qtd_cotas" maxLength="4" defaultValue="" />
      </div>

      <div className="filter-item">
        <label htmlFor="tipo">TIPO:</label>
        <select id="tipo" name="tipo">
          <option defaultValue="">SELECIONE</option>
          <option defaultValue="PP">Por Pedido</option>
          <option defaultValue="TC">Soma dos Pedidos</option>
        </select>
      </div>

      <div className="filter-item">
        <label htmlFor="state">Estado:</label>
        <select id="state" name="state">
          <option defaultValue="">SELECIONE</option>
          <option defaultValue="Paraná">Paraná</option>
          <option defaultValue="São Paulo">São Paulo</option>
          <option defaultValue="Santa Catarina">Santa Catarina</option>
          <option defaultValue="Mato Grosso do Sul">Mato Grosso do Sul</option>
          <option defaultValue="Pernambuco">Pernambuco</option>
          <option defaultValue="Paraíba">Paraíba</option>
          <option defaultValue="Pará">Pará</option>
          <option defaultValue="Rio Grande do Sul">Rio Grande do Sul</option>
          <option defaultValue="Mato Grosso">Mato Grosso</option>
          <option defaultValue="Bahia">Bahia</option>
          <option defaultValue="Federal District">Federal District</option>
          <option defaultValue="Minas Gerais">Minas Gerais</option>
          <option defaultValue="Rondônia">Rondônia</option>
          <option defaultValue="Rio de Janeiro">Rio de Janeiro</option>
          <option defaultValue="Tocantins">Tocantins</option>
          <option defaultValue="Espírito Santo">Espírito Santo</option>
          <option defaultValue="Goiás">Goiás</option>
          <option defaultValue="Maranhão">Maranhão</option>
          <option defaultValue="Rio Grande do Norte">Rio Grande do Norte</option>
          <option defaultValue="Alagoas">Alagoas</option>
          <option defaultValue="Piauí">Piauí</option>
          <option defaultValue="Ceará">Ceará</option>
          <option defaultValue="Amazonas">Amazonas</option>
          <option defaultValue="Acre">Acre</option>
        </select>
      </div>

      <button type="submit" className="button-search">
        <i className="fas fa-search"></i> SORTEAR
      </button>
    </Form>
  )
}
