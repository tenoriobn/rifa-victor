import styled from "styled-components";
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

  .button-search {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    background-color: #858796;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 10px 15px;
    cursor: pointer;
    height: 38px;
  }
`;

export default function VendasForm() {
  const [value, setValue] = useState({ 
    startDate: null, 
    endDate: null 
  }); 

  console.log('data', value)
    
  const handleValueChange = (newValue) => {
    console.log("newValue:", newValue); 
    setValue(newValue); 
  } 

  return (
    <Form>
      <div className="filter-item">
        <label htmlFor="init_date">Data:</label>
        {/* <input type="text" name="datetimes" /> */}

        <Datepicker 
          toggleClassName="hidden"
          classNames="datapicker"
          i18n={"pt-br"} 
          showShortcuts={true} 
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

      <button type="submit" className="button-search">
        <i className="fas fa-search"></i> Filtrar
      </button>
    </Form>
  )
}
