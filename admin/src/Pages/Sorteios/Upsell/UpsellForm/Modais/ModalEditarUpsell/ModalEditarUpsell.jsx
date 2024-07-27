/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { postDados } from "../../../../../../common/http/http";
import { stateUpsellInfo, stateUpsellInfoTable, stateUserLogin, stateOpenModalEditarUpsell } 
from "../../../../../../common/states/atom";
import { NumericFormat } from 'react-number-format';
import { useEffect, useState } from "react";
import useCurrencyInputUpsell from "../../../../../../common/states/Hook/useCurrencyInputUpsell";

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

export default function ModalAdicionarUpsell({setAtualizaTabela}) {
  const setOpenModalEditarUpsell = useSetRecoilState(stateOpenModalEditarUpsell);
  const { id } = useParams();
  const userLogin = useRecoilValue(stateUserLogin);
  const setUpsellInfoTable = useSetRecoilState(stateUpsellInfoTable);
  const [upsellInfo, setUpsellInfo] = useRecoilState(stateUpsellInfo)
  // const setOpenModalAdicionarUpsell = useSetRecoilState(stateOpenModalAdicionarUpsell);
  const [, setQntdCota] = useState();
  const { value: formattedPrice, handleChange: handlePriceChange, handleBlur: handlePriceBlur } = useCurrencyInputUpsell(setQntdCota);

  useEffect(() => {
    const calculateTotal = () => {
      const qntdCota = upsellInfo.qntd_cota ? parseInt(upsellInfo.qntd_cota, 10) : 0;
      const valueCota = upsellInfo.price_cota ;
      const total = qntdCota * valueCota;

      setUpsellInfo((prevUpsell) => ({
        ...prevUpsell,
        price_total: total.toFixed(2),
        rifas_id: id,
      }));
    };

    calculateTotal();
  }, [upsellInfo.qntd_cota, upsellInfo.price_cota]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await postDados('/admin/dashboard/upsell/cadastrar', upsellInfo, userLogin);

      setAtualizaTabela(true);
      
      setUpsellInfoTable(response.data)
      setOpenModalEditarUpsell(false)
      
    } catch (error) {
      console.error('Erro ao fazer POST:', error);
    }
  };

  return (
    <Form id="frmAddPack" onSubmit={handleSubmit}>
      <label htmlFor="frm_add_number_price">
        Valor por cota
        <input
          name="price_cota"
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
          value={upsellInfo.qntd_cota || ""}
          onChange={(e) => setUpsellInfo((prevUpsell) => ({...prevUpsell, qntd_cota: e.target.value}))}
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
          name="price_total"
          value={upsellInfo.price_total || ""}
          onChange={(e) => setUpsellInfo((prevUpsell) => ({...prevUpsell, price_total: e.target.value}))}
          // disabled
        />
      </label>

      <label htmlFor="">
        Quantidade Minima
        <input type="number" id="frm_qtd_min" name="qtd_min" maxLength="4" required
          value={upsellInfo.qntd_min || ""}
          onChange={(e) => setUpsellInfo((prevUpsell) => ({...prevUpsell, qntd_min: e.target.value}))}
        />
      </label>

      <label htmlFor="">
        Quantidade Máxima
        <input type="number" id="frm_qtd_max" name="qtd_max" maxLength="4" required 
          value={upsellInfo.qntd_max || ""}
          onChange={(e) => setUpsellInfo((prevUpsell) => ({...prevUpsell, qntd_max: e.target.value}))}
        />
      </label>

      <label htmlFor="">
        Localização
        <select name="position" id="frm_position" required
          value={upsellInfo.localizacao || ""}
          onChange={(e) => setUpsellInfo((prevUpsell) => ({...prevUpsell, localizacao: e.target.value}))}
        >
          <option value="checkout">No Checkout</option>
          <option value="paid">Após Pagto</option>
        </select>
      </label>

      <label htmlFor="">
        Status
        <select name="st" id="frm_st"
          value={upsellInfo.status || ""}
          onChange={(e) => setUpsellInfo((prevUpsell) => ({...prevUpsell, status: e.target.value}))}
        >
          <option value="ativo">ATIVO</option>
          <option value="finalizado">FINALIZADO</option>
        </select>
      </label>

      <input type="submit" value="Adicionar" />
    </Form>
  )
}