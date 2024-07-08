import { useState } from "react";
import styled from "styled-components";

const FilterItemRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-end;
  gap: .625rem;
  padding: .625rem 0;

  @media (min-width: 922px) {
    justify-content: flex-start;
  }
`;

const FilterInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 300px;
  width: 100%;

  input {
    outline: none;
    box-sizing: border-box;
    background: inherit;
    display: block;
    color: #fff;
    border: .0625rem solid #275680;
    border-radius: .3125rem;
    padding: .625rem;
    height: 40px;
    transition: all .3s ease-in-out;
  }
`;

const Label = styled.label`
  display: block;
  margin-bottom: .3125rem;
  color: #f5f5f5;
`;

const Button = styled.button`
  cursor: pointer;
  background-color: #858796;
  border: none;
  border-radius: .3125rem;
  color: white;
  padding: .625rem .9375rem;
  height: 40px;
  transition: all .3s ease-in-out;

  &:hover {
    background-color: #7a7b86;
  }
`;

export default function UsuariosForm() {
  const [searchValue, setSearchValue] = useState('');

  console.log(searchValue)

  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Valor de pesquisa:', searchValue);
    // Lógica para enviar o valor para o backend aqui
  };

  return (
    <form onSubmit={handleSubmit}>
      <FilterItemRow>
        <FilterInputContainer>
          <Label htmlFor="search">Nome ou E-mail:</Label>
          <input
            type="text"
            name="search"
            value={searchValue}
            onChange={handleChange}
            placeholder="Pesquise pelo nome ou e-mail"
          />
        </FilterInputContainer>

        <Button type="submit">
          <i className="fas fa-search"></i> Filtrar
        </Button>
      </FilterItemRow>
    </form>
  );
}
