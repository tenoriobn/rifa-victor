import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { postDados } from "../../../../../common/http/http";
import { statePacote, stateTabelaPacotesInfo, stateUserLogin, stateOpenModalAdicionarPacote } from "../../../../../common/states/atom";

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
    background: #41414b;
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

export default function ModalAdicionarPacote() {
  const { id } = useParams();
  const userLogin = useRecoilValue(stateUserLogin);
  const setTabelaPacotesInfo = useSetRecoilState(stateTabelaPacotesInfo);
  const [pacote, setPacote] = useRecoilState(statePacote)
  const [openModalAdicionarPacote, setOpenModalAdicionarPacote] = useRecoilState(stateOpenModalAdicionarPacote);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPacote((prevValues) => ({
      ...prevValues,
      [name]: value,
      rifas_id: id
    }));
  };

  console.log(pacote)

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await postDados('/admin/dashboard/pacote/cadastrar', pacote, userLogin);
      
      setTabelaPacotesInfo(response.data)
      setOpenModalAdicionarPacote(!openModalAdicionarPacote)
      
    } catch (error) {
      console.error('Erro ao fazer POST:', error);
    }
  };


  return (
    <Form id="frmAddPack" onSubmit={handleSubmit}>
      <label htmlFor="frm_add_number_price">
        Valor por cota
        <input
          type="text"
          id="frm_add_number_price"
          name="value_cota"
          className="moneyCota"
          value={pacote.value_cota || ""}
          onChange={handleChange}
          required
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
        />
      </label>

      <label htmlFor="frm_add_price">
        Valor Total
        <input
          type="text"
          id="frm_add_price"
          name="valor_total"
          value={pacote.valor_total || ""}
          onChange={handleChange}
        />
      </label>

      <label htmlFor="frm_add_most_popular">
        Mais Popular
        <select
          id="frm_add_most_popular"
          name="popular"
          value={pacote.popular || ""}
          onChange={handleChange}
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
          onChange={handleChange}
        />
      </label>

      <input type="submit" value="Adicionar" />
    </Form>
  )
}
