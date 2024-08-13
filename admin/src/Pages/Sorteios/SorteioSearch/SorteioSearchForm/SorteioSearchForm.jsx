import styled from "styled-components";
import Datepicker from "react-tailwindcss-datepicker";
import { useState } from "react";
import { postDados } from "../../../../common/http/http";
import { useParams } from "react-router-dom";
import { stateConsultaCota } from "../../../../common/states/atom";
import { useSetRecoilState } from "recoil";

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

    &::-webkit-calendar-picker-indicator {
      filter: invert(1);
    }
  }

  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
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
`;

export default function SorteioSearchForm() {
  const [orderFilter, setOrderFilter] = useState({});
  const setConsultaCota = useSetRecoilState(stateConsultaCota);
  const { id } = useParams();

  const formatDateTime = (date, time) => {
    if (date && time) {
      // Format date and time into 'YYYY-MM-DD HH:MM:SS'
      return `${date} ${time}:00`;
    }
    return null;
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

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    try {
      const response = await postDados(`admin/dashboard/rifas/${id}/filtro`, orderFilter);
      setConsultaCota(response.data)
    } catch (error) {
      console.error("There was an error fetching the data!", error);
    }
  };

  return (
    <Form method="POST" onSubmit={handleSubmit}>
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

      <div className="filter-item" style={{maxWidth: "300px"}}>
        <label>Periodo de Data:</label>
        {/* <input type="text" name="datetimes" value="" /> */}
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

      <div className="filter-item" style={{maxWidth: "180px"}}>
        <label htmlFor="status">Qtd Sortear:</label>
        <input type="number" name="qtd" min="1" max="10" 
          onChange={(e) => setOrderFilter({ ...orderFilter, qtdSortear: e.target.value })} 
          value={orderFilter.qtdSortear || ''}
        />
      </div>

      <div className="filter-item">
        <label htmlFor="qtd_cotas">Qtd Cotas &gt;=:</label>
        <input type="text" id="qtd_cotas" name="qtd_cotas" maxLength="4"
          onChange={(e) => setOrderFilter({ ...orderFilter, qtdCotas: e.target.value })}
          value={orderFilter.qtdCotas || ''}
        />
      </div>

      <div className="filter-item">
        <label htmlFor="tipo">TIPO:</label>
        <select id="tipo" name="tipo"
          onChange={(e) => setOrderFilter({ ...orderFilter, tipo: e.target.value })}
          value={orderFilter.tipo || ''}
        >
          <option value="">SELECIONE</option>
          <option value="PP">Por Pedido</option>
          <option value="TC">Soma dos Pedidos</option>
        </select>
      </div>

      <button type="submit" className="button-search">
        <i className="fas fa-search"></i> SORTEAR
      </button>
    </Form>
  )
}
