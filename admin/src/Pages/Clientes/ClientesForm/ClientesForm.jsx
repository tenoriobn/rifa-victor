import { useState } from "react";
import { PatternFormat } from "react-number-format";
import styled from "styled-components";

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-end;
  gap: 0.625rem;
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
    margin-bottom: 0.3125rem;
    color: #f5f5f5;
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
    gap: 6px;
  }
`;

export default function ClientesForm() {
  const [filtro, setFiltro] = useState({});
  // const [tabelaPacotesInfo, setTabelaPacotesInfo] = useRecoilState(stateTabelaPacotesInfo);

  console.log('filtro', filtro)

  // const handleSubmit = async (e) => {
  //   if (e) e.preventDefault();
  //   try {
  //     const response = await postDados('/admin/dashboard/ rota aqui', orderFilter);
  //     setTabelaPacotesInfo(response);
  //   } catch (error) {
  //     console.error("There was an error fetching the data!", error);
  //   }
  // };

  // console.log(tabelaPacotesInfo)

  const handleSubmit = (e) => {
    e.preventDefault();

    // Por exemplo:
    // fetch("/api/filtrar-clientes", {
    //   method: "POST",
    //   body: JSON.stringify(filtro),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });
  };

  return (
        // onSubmit={handleSubmit}
    <Form onSubmit={handleSubmit} method="POST" action="/dashboard/rifas/cotas/174">
      <div className="filter-item">
        <label htmlFor="customer_id">ID:</label>
        <input
          type="text"
          name="customer_id"
          placeholder="ID Cliente"

          onChange={(e) => setFiltro({ ...filtro, customer_id: e.target.value })} 
          value={filtro.customer_id || ''}
          autoComplete="off"
        />
      </div>

      <div className="filter-item">
        <label htmlFor="name">Nome:</label>
        <input
          type="text"
          name="name"
          placeholder="Pesquise pelo nome"
          onChange={(e) => setFiltro({ ...filtro, name: e.target.value })} 
          value={filtro.name || ''}
          autoComplete="off"
        />
      </div>

      <div className="filter-item">
        <label htmlFor="phone">Telefone:</label>
        <PatternFormat
          format="(##) #####-####"
          type="text"
          name="phone"
          placeholder="Pesquise pelo telefone"
          onChange={(e) => setFiltro({ ...filtro, phone: e.target.value })} 
          value={filtro.phone || ''}
          autoComplete="off"
        />
      </div>

      <button type="submit" className="button-search">
        <i className="fas fa-search"></i> Filtrar
      </button>
    </Form>
  );
}
