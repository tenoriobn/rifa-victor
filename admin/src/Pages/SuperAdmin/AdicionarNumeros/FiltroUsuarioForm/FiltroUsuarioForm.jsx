/* eslint-disable react/prop-types */
import styled from "styled-components";
import { useState } from "react";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { stateInfoAdicionarNumeros, stateOptionsRifa } from "../../../../common/states/atom";
import { postDados } from "../../../../common/http/http";
import { PatternFormat } from "react-number-format";

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

// const usuarioFiltrado = {
//   nome: "Juliano Oliveira Amaral",
//   cota: "007149",
//   data: "17/04/2024",
//   rifas: [
//     {
//       name: "F250 OU 50K NO PIX",
//       id: 1,
//     },
//     {
//       name: "RIFA 2",
//       id: 2,
//     },
//   ],
// }

export default function FiltroUsuarioForm({ onNotifyError }) {
  const [search, setSearch] = useState('');
  const setInfoAdicionarNumeros = useSetRecoilState(stateInfoAdicionarNumeros)

  const [selectSearch, setSelectSearch] = useState('');
  const optionsRifa = useRecoilValue(stateOptionsRifa);

  const handleSelectChange = (e) => {
    const [id, title] = e.target.value.split('|');
    setSelectSearch({ id, title });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await postDados('/admin/dashboard/client/procurar/pelo-telefone', { cellphone:search, rifa_id:selectSearch });
      setInfoAdicionarNumeros({ data: response, selectSearch, search });
    } catch (error) {
      console.error("There was an error fetching the data!", error);
      onNotifyError(error.response.data.msg);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FilterItemRow>
        <FilterInputContainer>
          <Label htmlFor="id">Telefone do usuário:</Label>
          <PatternFormat
            format="(##) #####-####"
            type="text"
            name="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Pesquise o usuário a receber"
          />
        </FilterInputContainer>
        
        <FilterInputContainer>
          <Label htmlFor="id">Selecionar sorteio:</Label>

          <select 
            name="id_raffle" 
            id="id_raffle" 
            value={`${selectSearch.id}|${selectSearch.title}`}
            onChange={handleSelectChange}
            required
          >
            <option value="">SELECIONE O SORTEIO</option>
              {optionsRifa?.map((rifa) => (
              <option key={rifa?.id} value={`${rifa?.id}|${rifa?.title}`}>
                {rifa?.title}
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
