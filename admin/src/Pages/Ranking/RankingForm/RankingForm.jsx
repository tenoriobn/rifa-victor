import styled from "styled-components";
import { useState } from "react";
import { stateOptionsRifa, stateRankingInfoTable, stateVisibilidadeColunaTabelaRanking } from "../../../common/states/atom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import Datepicker from "react-tailwindcss-datepicker";
import listaEstados from "./listaEstados.json";
import { postDados } from "../../../common/http/http";

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

    &::-webkit-calendar-picker-indicator {
      filter: invert(1);
    }
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
  const [orderFilter, setOrderFilter] = useState({});
  const optionsRifa = useRecoilValue(stateOptionsRifa);
  const setRankingInfo =  useSetRecoilState(stateRankingInfoTable);

  console.log('orderFilter', orderFilter)
  
  const handleCheckboxChange = (columnName) => {
    setVisibilidadeColunaTabelaRanking((prevVisibility) => ({
      ...prevVisibility,
      [columnName]: !prevVisibility[columnName],
    }));
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    try {
      const response = await postDados('/admin/dashboard/ranking-geral/filtro', orderFilter);
      setRankingInfo(response.data);
    } catch (error) {
      console.error("There was an error fetching the data!", error);
    }
  };

  const formatDateTime = (date, time) => {
    if (date && time) {
      return new Date(`${date}T${time}:00`).toISOString();
    }
    return date;
  };
  const handleDateChange = (newValue) => {
    setOrderFilter(prevState => ({
      ...prevState,
      startDateCalendar: newValue.startDate,
      endDateCalendar: newValue.endDate,
      startDate: formatDateTime(newValue.startDate, prevState.startTime || '00:00'),
      endDate: formatDateTime(newValue.endDate, prevState.endTime || '23:59')
    }));
  };

  const handleStartTimeChange = (e) => {
    const startTime = e.target.value;
    setOrderFilter(prevState => ({
      ...prevState,
      startTime,
      startDate: formatDateTime(prevState.startDateCalendar, startTime)
    }));
  };

  const handleEndTimeChange = (e) => {
    const endTime = e.target.value;
    setOrderFilter(prevState => ({
      ...prevState,
      endTime,
      endDate: formatDateTime(prevState.endDateCalendar, endTime)
    }));
  };
    
  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <div className="filter-item-row">

        <div className="filter-item filter-item__time">
          <label htmlFor="start_time">Início:</label>
          <input 
            type="time" 
            id="start_time" 
            className="time"
            value={orderFilter.startTime || '00:00'} 
            onChange={handleStartTimeChange} 
            onFocus={(e) => e.target.showPicker()} 
          />
        </div>

        <div className="filter-item">
          <label htmlFor="data_de">Data:</label>

          <Datepicker 
            toggleClassName="hidden"
            i18n={"pt-br"} 
            displayFormat={"DD/MM/YYYY"}
            showFooter={true} 
            value={orderFilter} 
            onChange={handleDateChange}
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

        <div className="filter-item filter-item__time">
          <label htmlFor="end_time">Término:</label>
          <input 
            type="time" 
            id="end_time" 
            className="time"
            value={orderFilter.endTime || '23:59'} 
            onChange={handleEndTimeChange} 
            onFocus={(e) => e.target.showPicker()} 
            onClick={(e) => e.target.showPicker()} 
          />
        </div>

        <div className="filter-item">
          <label htmlFor="total_numbers">Quantidade:</label>
          <input type="text" id="total_numbers" name="total_numbers"
            onChange={(e) => setOrderFilter({ ...orderFilter, total_numbers: e.target.value })} 
            value={orderFilter.total_numbers || ''}
          />
        </div>

        <div className="filter-item">
          <label htmlFor="id_raffle">Sorteio:</label>
          <select name="id_raffle" id="id_raffle" required=""
            onChange={(e) => setOrderFilter({ ...orderFilter, rifas_id: e.target.value })}
            value={orderFilter.rifas_id}
          >
            <option value="">SELECIONE O SORTEIO</option>
            {optionsRifa.map((rifa) => (
              <option key={rifa.id} value={rifa.id}>
                {rifa.title}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-item">
          <label htmlFor="state">Estado:</label>
          <select 
            id="state" 
            name="state"
            onChange={(e) => setOrderFilter({ ...orderFilter, estado: e.target.value })}
            value={orderFilter.estado || ''}
          >
            <option value="">SELECIONE</option>
            {listaEstados.map((estado, index) => (
              <option key={index} value={estado}>{estado}</option>
            ))}
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
