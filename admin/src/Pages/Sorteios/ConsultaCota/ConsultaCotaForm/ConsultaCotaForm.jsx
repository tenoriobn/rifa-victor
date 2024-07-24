/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import styled from "styled-components";
import { stateAtualizaTableConsultaCota, stateConsultaCota, stateOptionsRifa } from "../../../../common/states/atom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { postDados } from "../../../../common/http/http";

const FilterItemRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-end;
  gap: .625rem;
  padding: .625rem 0;

  @media (min-width: 922px) {
    justify-content: center;
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

  select {
    width: 100%;

    background-color: #1a191f;
    border: 1px solid #275680;
    color: #fff;
    display: block;
    height: 40px;
    margin-right: 5px;
    border-radius: 5px;
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

export default function FiltroUsuarioForm() {
  const [search, setSearch] = useState('');
  const [selectSearch, setSelectSearch] = useState('');
  const setConsultaCota = useSetRecoilState(stateConsultaCota);
  const [atualizaTableConsultaCota, setAtualizaTableConsultaCota] = useRecoilState(stateAtualizaTableConsultaCota);
  const optionsRifa = useRecoilValue(stateOptionsRifa);

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    try {
      const response = await postDados('/admin/dashboard/rifa/procurar-numero-premiado/procurar-ganhador', { numeroWinner:search, rifa_id:selectSearch });
      setConsultaCota({ data: response, search });
    } catch (error) {
      console.error("There was an error fetching the data!", error);
    }
  };

  useEffect(() => {
    if (atualizaTableConsultaCota) {
      setAtualizaTableConsultaCota(false)
      handleSubmit();
    }
  }, [atualizaTableConsultaCota]);

  return (
    <form onSubmit={handleSubmit}>
      <FilterItemRow>
        <FilterInputContainer>
          <Label htmlFor="id">Pesquisar a cota sorteada:</Label>
          <input
            type="text"
            name="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Pesquisar pelo número da cota sorteada"
            required
          />
        </FilterInputContainer>

        <FilterInputContainer>
          <Label htmlFor="id">Selecionar sorteio:</Label>

          <select 
            name="id_raffle" 
            id="id_raffle" 
            value={selectSearch}
            onChange={(e) => setSelectSearch(e.target.value)}
            required
          >
            <option value="">SELECIONE O SORTEIO</option>
              {optionsRifa.map((rifa) => (
              <option key={rifa.id} value={rifa.id}>
                {rifa.title}
              </option>
            ))}
          </select>
        </FilterInputContainer>

        <Button type="submit">
          <i className="fas fa-search"></i> Filtrar
        </Button>
      </FilterItemRow>
    </form>
  );
}
