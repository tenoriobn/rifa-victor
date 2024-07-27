/* eslint-disable react-hooks/exhaustive-deps */
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { postDados } from "../../../../../common/http/http";
import { statePacote, stateTabelaPacotesInfo, stateUserLogin, stateOpenModalAdicionarPacote } from "../../../../../common/states/atom";
import { NumericFormat } from 'react-number-format';
import { useEffect, useState } from "react";
import useCurrencyInputPacote from "../../../../../common/states/Hook/useCurrencyInputPacote";

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

export default function ModalAdicionarPacote() {
  const { id } = useParams();
  const userLogin = useRecoilValue(stateUserLogin);
  const setTabelaPacotesInfo = useSetRecoilState(stateTabelaPacotesInfo);
  const [pacote, setPacote] = useRecoilState(statePacote)
  const [openModalAdicionarPacote, setOpenModalAdicionarPacote] = useRecoilState(stateOpenModalAdicionarPacote);
  const [, setQntdCota] = useState()

  useEffect(() => {
    const calculateTotal = () => {
      const qntdCota = pacote.qntd_cota ? parseInt(pacote.qntd_cota, 10) : 0;
      const valueCota = pacote.value_cota ;
      const total = qntdCota * valueCota;

      setPacote((prevPacote) => ({
        ...prevPacote,
        valor_total: total.toFixed(2),
        rifas_id: id,
      }));
    };

    calculateTotal();
  }, [pacote.qntd_cota, pacote.value_cota]);

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

  const { value: formattedPrice, handleChange: handlePriceChange, handleBlur: handlePriceBlur } = useCurrencyInputPacote(setQntdCota);

  return (
    <Form id="frmAddPack" onSubmit={handleSubmit}>
      <label htmlFor="frm_add_number_price">
        Valor por cota
        <input
          name="value_cota"
          value={formattedPrice}
          onChange={handlePriceChange}
          onBlur={handlePriceBlur}
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
          onChange={(e) => setPacote((prevPacote) => ({...prevPacote, qntd_cota: e.target.value}))}
          required
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

      <input type="submit" value="Adicionar" />
    </Form>
  )
}
