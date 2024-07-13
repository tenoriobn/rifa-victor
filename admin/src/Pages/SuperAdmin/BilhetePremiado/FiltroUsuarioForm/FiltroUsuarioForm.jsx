import styled from "styled-components";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { stateFiltroUsuarioTable } from "../../../../common/states/atom";

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

const usuarioFiltrado = [
  {
    nome: "Juliano Oliveira Amaral",
    rifa: "F250 OU 50K NO PIX",
    cota: "007149",
    data: "17/04/2024",
  },
];

export default function FiltroUsuarioForm() {
  const [search, setSearch] = useState('');
  const setFiltroUsuarioTable = useSetRecoilState(stateFiltroUsuarioTable)

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // const response = await postDados.post('/api/search', { search });
      // setFiltroUsuarioTable(response.data)
      setFiltroUsuarioTable(usuarioFiltrado)
    } catch (error) {
      console.error("There was an error fetching the data!", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FilterItemRow>
        <FilterInputContainer>
          <Label htmlFor="id">Bilhete Premiado:</Label>
          <input
            type="text"
            name="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Pesquise pelo bilhete premiado"
          />
        </FilterInputContainer>

        <Button type="submit">
          <i className="fas fa-search"></i> Filtrar
        </Button>
      </FilterItemRow>
    </form>
  );
}
