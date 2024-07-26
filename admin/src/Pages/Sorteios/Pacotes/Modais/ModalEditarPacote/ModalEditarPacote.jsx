import styled from "styled-components";
import { putDados } from "../../../../../common/http/http";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { stateOpenModalEditarPacote, statePacote, stateTabelaPacotesInfo, stateUserLogin } from "../../../../../common/states/atom";
import { NumericFormat } from "react-number-format";

const Form = styled.form`
  font-size: .9rem;
  width: 100%;

  label {
    display: block;
  }

  input {
    display: block;
    margin-bottom: 10px;
    width: 100%;
    height: 40px;
    border-radius: 5px;
    background: #41414b;
    border: none;
    outline: 0;
    margin-top: 10px;
    padding: 10px 5px;
    color: #fff;
    box-sizing: border-box;
  }

  select {
    display: block;
    margin-bottom: 10px;
    width: 100%;
    height: 40px;
    border-radius: 5px;
    background-color: #41414b;
    border: none;
    outline: 0;
    margin-top: 10px;
    padding: 10px 5px;
    color: #fff;
  }

  input[type=submit] {
    background-color: #07b353;
    color: #fff;
    font-weight: 700;
    width: 100%;
    height: 40px;
    border-radius: 5px;
    outline: 0;
    border: none;
    cursor: pointer;
    margin-top: 20px;
    transition: all .3s ease-in-out;
  }

  input[type=submit]:hover {
    opacity: .8;
  }
`;

export default function ModalEditarPacote() {
  const userLogin = useRecoilValue(stateUserLogin);
  const [pacote, setPacote] = useRecoilState(statePacote)
  const setTabelaPacotesInfo = useSetRecoilState(stateTabelaPacotesInfo);
  const [openModalEditarPacote, setOpenModalEditarPacote] = useRecoilState(stateOpenModalEditarPacote);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPacote((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await putDados('/admin/dashboard/pacotes/editar', pacote, userLogin);

      setOpenModalEditarPacote(!openModalEditarPacote)
      setTabelaPacotesInfo(response.data)
      
      console.log(response.data)
    } catch (error) {
      console.error('Erro ao fazer POST:', error);
    }
  };


  return (
    <Form id="frmAddPack" onSubmit={handleSubmit}>
      <label htmlFor="frm_add_number_price">
        Valor por cota
        <NumericFormat
          thousandSeparator="."
          decimalSeparator=","
          prefix="R$ "
          decimalScale={2}
          name="valor_total"
          value={pacote.value_cota || ""}
          onChange={handleChange}
          // disabled
        />
      </label>

      <label htmlFor="frm_add_qtd">
        Quantidade de cotas
        <input
          type="number"
          id="frm_add_qtd"
          name="qntd_cota"
          maxLength="4"
          value={pacote.qntd_cota || ""}
          onChange={handleChange}
          required
          // disabled
        />
      </label>

      <label htmlFor="frm_add_price">
        Valor Total
        <NumericFormat
          thousandSeparator="."
          decimalSeparator=","
          prefix="R$ "
          decimalScale={2}
          name="valor_total"
          value={pacote.valor_total || ""}
          onChange={(e) => setPacote((prevPacote) => ({...prevPacote, valor_total: e.target.value}))}
          disabled
        />
      </label>

      <label htmlFor="frm_add_most_popular">
        Mais Popular
        <select
          id="frm_add_most_popular"
          name="popular"
          value={pacote.popular || ""}
          onChange={(e) => setPacote((prevPacote) => ({...prevPacote, popular: e.target.value}))}
        >
          <option value="sim">Sim</option>
          <option value="nao">Não</option>
        </select>
      </label>

      <label htmlFor="frm_add_pkg">
        Cod. Promocional
        <input
          type="text"
          id="frm_add_pkg"
          name="cod_promo"
          style={{ textTransform: "uppercase" }}
          maxLength="10"
          value={pacote.cod_promo || ""}
          onChange={(e) => setPacote((prevPacote) => ({...prevPacote, cod_promo: e.target.value}))}
        />
      </label>

      <label htmlFor="">
        Status
        <select 
          name="status" 
          id="frm_st"
          value={pacote.status || "ativo"}
          onChange={(e) => setPacote((prevPacote) => ({...prevPacote, status: e.target.value}))}
        >
          <option defaultValue="A">Ativo</option>
          <option defaultValue="F">Finalizado</option>
        </select>
      </label>

      <input type="submit" value="Atualizar" />
    </Form>
  )
}

