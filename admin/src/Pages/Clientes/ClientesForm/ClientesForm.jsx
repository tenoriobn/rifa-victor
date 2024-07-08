import { useState } from "react";
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
    height: 38px;
  }
`;

export default function ClientesForm() {
  const [filtro, setFiltro] = useState({
    customer_id: "",
    name: "",
    cpf: "",
    phone: "",
    email: "",
  });

  console.log('filtro:', filtro)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFiltro((prevFiltro) => ({
      ...prevFiltro,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Filtro enviado:", filtro);
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
    <Form onSubmit={handleSubmit} method="POST" action="/dashboard/rifas/cotas/174">
      <div className="filter-item">
        <label htmlFor="customer_id">ID:</label>
        <input
          type="text"
          name="customer_id"
          placeholder="ID Cliente"
          value={filtro.customer_id}
          onChange={handleChange}
          autoComplete="off"
        />
      </div>

      <div className="filter-item">
        <label htmlFor="name">Nome:</label>
        <input
          type="text"
          name="name"
          placeholder="Pesquise pelo nome"
          value={filtro.name}
          onChange={handleChange}
          autoComplete="off"
        />
      </div>

      <div className="filter-item">
        <label htmlFor="cpf">CPF:</label>
        <input
          type="text"
          name="cpf"
          placeholder="Pesquise pelo CPF"
          value={filtro.cpf}
          onChange={handleChange}
          autoComplete="off"
        />
      </div>

      <div className="filter-item">
        <label htmlFor="phone">Telefone:</label>
        <input
          type="text"
          name="phone"
          placeholder="Pesquise pelo telefone"
          value={filtro.phone}
          onChange={handleChange}
          autoComplete="off"
        />
      </div>

      <div className="filter-item">
        <label htmlFor="email">E-mail:</label>
        <input
          type="text"
          name="email"
          placeholder="Pesquise pelo email"
          value={filtro.email}
          onChange={handleChange}
          autoComplete="off"
        />
      </div>

      <button type="submit" className="button-search">
        <i className="fas fa-search"></i> Filtrar
      </button>
    </Form>
  );
}
