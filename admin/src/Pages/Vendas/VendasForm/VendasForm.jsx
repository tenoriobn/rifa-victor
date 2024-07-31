/* eslint-disable react/prop-types */
import styled from "styled-components";
import Datepicker from "react-tailwindcss-datepicker"; 
import { postDados } from "../../../common/http/http";
import { useRecoilState, useSetRecoilState } from "recoil";
import { stateVendasOrderFilter, stateDadosVendas } from "../../../common/states/atom";

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

  .time, .filter-item__time {
    max-width: 114px;
    width: 100%;
  }
`;

export default function VendasForm({ rotaObterDados }) {
  const [vendasOrderFilter, setVendasOrderFilter] = useRecoilState(stateVendasOrderFilter);
  const setDadosVendas = useSetRecoilState(stateDadosVendas);

  console.log('vendasOrderFilter', vendasOrderFilter);

  const formatDateTime = (date, time) => {
    if (date && time) {
      return new Date(`${date}T${time}:00`).toISOString();
    }
    return date;
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    try {
      const response = await postDados(rotaObterDados, vendasOrderFilter);
      setDadosVendas(response.data);
    } catch (error) {
      console.error("There was an error fetching the data!", error);
    }
  };

  const handleDateChange = (newValue) => {
    setVendasOrderFilter(prevState => ({
      ...prevState,
      startDateCalendar: newValue.startDate,
      endDateCalendar: newValue.endDate,
      startDate: formatDateTime(newValue.startDate, prevState.startTime || '00:00'),
      endDate: formatDateTime(newValue.endDate, prevState.endTime || '23:59')
    }));
  };

  const handleStartTimeChange = (e) => {
    const startTime = e.target.value;
    setVendasOrderFilter(prevState => ({
      ...prevState,
      startTime,
      startDate: formatDateTime(prevState.startDateCalendar, startTime)
    }));
  };

  const handleEndTimeChange = (e) => {
    const endTime = e.target.value;
    setVendasOrderFilter(prevState => ({
      ...prevState,
      endTime,
      endDate: formatDateTime(prevState.endDateCalendar, endTime)
    }));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <div className="filter-item filter-item__time">
        <label htmlFor="start_time">Início:</label>
        <input 
          type="time" 
          id="start_time" 
          className="time"
          value={vendasOrderFilter.startTime || '00:00'} 
          onChange={handleStartTimeChange} 
          onFocus={(e) => e.target.showPicker()} 
        />
      </div>
      <div className="filter-item">
        <label htmlFor="init_date">Data:</label>
        <Datepicker 
          toggleClassName="hidden"
          classNames="datapicker"
          i18n={"pt-br"} 
          showShortcuts={true} 
          displayFormat={"DD/MM/YYYY"}
          showFooter={true} 
          value={vendasOrderFilter} 
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
          value={vendasOrderFilter.endTime || '23:59'} 
          onChange={handleEndTimeChange} 
          onFocus={(e) => e.target.showPicker()} 
          onClick={(e) => e.target.showPicker()} 
        />
      </div>
      <button type="submit" className="button-search">
        <i className="fas fa-search"></i> Filtrar
      </button>
    </Form>
  );
}
