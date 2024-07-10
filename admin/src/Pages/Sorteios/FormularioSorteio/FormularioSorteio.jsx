import seta from "../../../assets/icons/seta.svg"
import styled from "styled-components";
import options from "./options.json"
import { stateFiltroSorteio } from "../../../common/states/atom";
import { useRecoilState } from "recoil";

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

const FilterSelectContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 180px;
  width: 100%;

  select {
    background-image: url(${seta});
    background-repeat: no-repeat;
    background-position: right 10px center;
    background-size: 12px 12px;

    background-color: #20202a;
    border: .0625rem solid #275680;
    border-radius: .3125rem;
    color: #fff;
    padding: .625rem;
    height: 40px;

    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    outline: none;
  }
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

export default function FormularioSorteio() {
  const [filtroSorteio, setFiltroSorteio] = useRecoilState(stateFiltroSorteio);



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFiltroSorteio((prevFiltro) => ({
      ...prevFiltro,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para usar o filtroSorteio, por exemplo, enviar para o backend
  
  };

  return (
    <form method="post" onSubmit={handleSubmit}>
      <FilterItemRow>
        <FilterInputContainer>
          <Label htmlFor="nome">Nome:</Label>
          <input
            type="text"
            id="nome"
            name="nome"
            placeholder="Nome"
            onChange={handleChange}
            defaultValue={filtroSorteio.nome || ''}
          />
        </FilterInputContainer>

        <FilterSelectContainer>
          <Label htmlFor="status">Status:</Label>
          <select
            id="status"
            name="status"
            onChange={handleChange}
            defaultValue={filtroSorteio.status || 'A'}
          >
            {options.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </FilterSelectContainer>

        <Button type="submit">
          <i className="fas fa-search"></i> Filtrar
        </Button>
      </FilterItemRow>
    </form>
  );
}
