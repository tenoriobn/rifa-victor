import { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import styled from "styled-components";

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

    &::-webkit-calendar-picker-indicator {
      filter: invert(1);
    }
  }
`;

export default function AfiliadosForm() {
  const [orderFilter, setOrderFilter] = useState({});
  // const [tabelaAfiliadosInfo, setTabelaAfiliadosInfo] = useRecoilState(stateTabelaAfiliadoInfo);

  console.log('data', orderFilter)

  // const handleSubmit = async (e) => {
  //   if (e) e.preventDefault();
  //   try {
  //     const response = await postDados('/admin/dashboard/ rota aqui', orderFilter);
  //     setTabelaPacotesInfo(response);
  //   } catch (error) {
  //     console.error("There was an error fetching the data!", error);
  //   }
  // };

  // console.log(tabelaAfiliadosInfo)


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
    // onSubmit={handleSubmit}

    <Form>
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
        <label htmlFor="init_date">Data:</label>
        {/* <input type="text" name="datetimes" /> */}

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

      <button type="submit" className="button-search">
        <i className="fas fa-search"></i> Filtrar
      </button>
    </Form>
  )
}
