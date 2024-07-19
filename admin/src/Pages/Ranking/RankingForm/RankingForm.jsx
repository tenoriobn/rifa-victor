import styled from "styled-components";
import { useState } from "react";
import { stateVisibilidadeColunaTabelaRanking } from "../../../common/states/atom";
import { useRecoilState } from "recoil";
import Datepicker from "react-tailwindcss-datepicker";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin: 1.875rem 0;

  .filter-item-row {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: flex-end;
    gap: .625rem;

  }

  .filter-item {
    flex-grow: 1;
    max-width: 300px;
  }

  .filter-item-buttons {
    display: flex;
  }

  .filter-item input {
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
    background-color: #20202a;
    color: #fff;
    border: .0625rem solid #275680;
    padding: .625rem;
    border-radius: .3125rem;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    height: 40px;
    width: 100%;
    line-height: normal;
    padding-right: 30px;
  }

  .button-activate {
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 10px 15px;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 5px;
    margin-right: 4px;
    height: 38px;
    box-sizing: border-box;
  }

  .button-search {
    background-color: #858796;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 10px 15px;
    cursor: pointer;
    height: 40px;
    display: flex;
    align-items: center;
    gap: 5px;
  }

  .column-controls {
    display: flex;
    flex-wrap: wrap;
  }

  .column-controls label {
    margin-right: 10px;
    display: flex;
    align-items: center;
  }

  .column-controls input[type="checkbox"] {
    transform: scale(0.8);
    margin-right: 5px;
  }

`;

export default function RankingForm() {
  const [showFilters, setShowFilters] = useState(false);
  const [visibilidadeColunaTabelaRanking, setVisibilidadeColunaTabelaRanking] = useRecoilState(stateVisibilidadeColunaTabelaRanking);
  
  const handleCheckboxChange = (columnName) => {
    setVisibilidadeColunaTabelaRanking((prevVisibility) => ({
      ...prevVisibility,
      [columnName]: !prevVisibility[columnName],
    }));
  };

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
      <div className="filter-item-row">
        <div className="filter-item">
          <label htmlFor="data_de">Data:</label>
          {/* <input type="text" name="datetimes" /> */}

          <Datepicker 
            toggleClassName="hidden"
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

        <div className="filter-item">
          <label htmlFor="qtd">Quantidade:</label>
          <input type="text" id="qtd" name="qtd" maxLength="2" defaultValue="10" />
        </div>

        <div className="filter-item">
          <label htmlFor="id_raffle">Sorteio:</label>
          <select name="id_raffle" id="id_raffle" required="">
            <option defaultValue="">SELECIONE O SORTEIO</option>
            <option defaultValue="174">SAVEIRO CROSS DOS SONHOS </option>
          </select>
        </div>

        <div className="filter-item">
          <label htmlFor="state">Estado:</label>
          <select id="state" name="state">
            <option defaultValue="">SELECIONE</option>
            <option defaultValue="Acre">Acre</option>
            <option defaultValue="Alagoas">Alagoas</option>
            <option defaultValue="Amapá">Amapá</option>
            <option defaultValue="Amazonas">Amazonas</option>
            <option defaultValue="Bahia">Bahia</option>
            <option defaultValue="Ceará">Ceará</option>
            <option defaultValue="Distrito Federal">Distrito Federal</option>
            <option defaultValue="Espírito Santo">Espírito Santo</option>
            <option defaultValue="Goiás">Goiás</option>
            <option defaultValue="Maranhão">Maranhão</option>
            <option defaultValue="Mato Grosso">Mato Grosso</option>
            <option defaultValue="Mato Grosso do Sul">Mato Grosso do Sul</option>
            <option defaultValue="Minas Gerais">Minas Gerais</option>
            <option defaultValue="Pará">Pará</option>
            <option defaultValue="Paraíba">Paraíba</option>
            <option defaultValue="Paraná">Paraná</option>
            <option defaultValue="Pernambuco">Pernambuco</option>
            <option defaultValue="Piauí">Piauí</option>
            <option defaultValue="Rio de Janeiro">Rio de Janeiro</option>
            <option defaultValue="Rio Grande do Norte">Rio Grande do Norte</option>
            <option defaultValue="Rio Grande do Sul">Rio Grande do Sul</option>
            <option defaultValue="Rondônia">Rondônia</option>
            <option defaultValue="Roraima">Roraima</option>
            <option defaultValue="Santa Catarina">Santa Catarina</option>
            <option defaultValue="São Paulo">São Paulo</option>
            <option defaultValue="Sergipe">Sergipe</option>
            <option defaultValue="Tocantins">Tocantins</option>
          </select>
        </div>

        <div className="filter-item filter-item-buttons">
          <label htmlFor="status">&nbsp;</label>
          <a className="button-activate" onClick={() => setShowFilters(!showFilters)}>
            <i id="btn_filtro" className={showFilters ? "fas fa-minus-circle" : "fas fa-plus-circle"}></i>
          </a>
          <button type="submit" className="button-search"><i className="fas fa-search"></i> Filtrar</button>
        </div>
      </div>
      
      {showFilters && (
        <>
          <div className="filter-item-row filtro" id="filtro-colunas" style={{display: "flex"}}>
            <div className="column-controls">
              <label>
                <input type="checkbox" 
                  checked={visibilidadeColunaTabelaRanking.posicao}
                  onChange={() => handleCheckboxChange('posicao')}
                /> 
                Posição
              </label>

              <label>
                <input 
                  type="checkbox" 
                  checked={visibilidadeColunaTabelaRanking.cliente}
                  onChange={() => handleCheckboxChange('cliente')}
                /> Cliente
              </label>

              <label>
                <input 
                  type="checkbox" 
                  checked={visibilidadeColunaTabelaRanking.telefone}
                  onChange={() => handleCheckboxChange('telefone')}
                /> Telefone
              </label>

              <label>
                <input 
                  type="checkbox" 
                  checked={visibilidadeColunaTabelaRanking.cidade}
                  onChange={() => handleCheckboxChange('cidade')}
                /> Cidade
              </label>

              <label>
                <input 
                  type="checkbox" 
                  checked={visibilidadeColunaTabelaRanking.sorteio}
                  onChange={() => handleCheckboxChange('sorteio')}
                /> Sorteio
              </label>

              <label>
                <input 
                  type="checkbox" 
                  checked={visibilidadeColunaTabelaRanking.quantidade}
                  onChange={() => handleCheckboxChange('quantidade')}
                /> Quantidade
              </label>

              <label>
                <input 
                  type="checkbox" 
                  checked={visibilidadeColunaTabelaRanking.total}
                  onChange={() => handleCheckboxChange('total')}
                /> Total
              </label>

              <label>
                <input 
                  type="checkbox" 
                  checked={visibilidadeColunaTabelaRanking.acoes}
                  onChange={() => handleCheckboxChange('acoes')}
                /> Ações
              </label>
            </div>
          </div>
        </>
      )}
    </Form>
  )
}
