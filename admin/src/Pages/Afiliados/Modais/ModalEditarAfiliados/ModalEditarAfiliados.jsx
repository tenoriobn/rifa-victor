/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { NumericFormat, PatternFormat } from "react-number-format";
import styled from "styled-components";
import { stateAfiliadosInfoModal, stateOpenModalEditarAfiliados, stateUserLogin } from "../../../../common/states/atom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { putDados } from "../../../../common/http/http";

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

export default function ModalEditarAfiliados({setAtualizaTabela}) {
  const [afiliadosInfo, setAfiliadosInfo] = useRecoilState(stateAfiliadosInfoModal);
  const userLogin = useRecoilValue(stateUserLogin);  
  const setOpenModalEditarAfiliados = useSetRecoilState(stateOpenModalEditarAfiliados);

  console.log('afiliadosInfo', afiliadosInfo)

  const handleSaveChanges = async (event) => {
    event.preventDefault();

    try {
      const response = await putDados(`admin/dashboard/afiliado/update/${afiliadosInfo.id}`, afiliadosInfo, userLogin);
      console.log('response', response)
      setAtualizaTabela(true);
      setOpenModalEditarAfiliados(false);

    } catch (error) {
      console.error("Erro ao enviar dados:", error);
    }
  };

  return (
    <Form id="frmAddPack" onSubmit={handleSaveChanges}>
      <label htmlFor="frm_add_price">
        Telefone do Afiliado
        <PatternFormat
          format="(##) #####-####"
          type="text"
          disabled
          name="cellphone"
          onChange={(e) => setAfiliadosInfo({ ...afiliadosInfo, cellphone: e.target.value })} 
          value={afiliadosInfo.cellphone || ''}
          required
        />
      </label>

      <label htmlFor="porcentagem">
        Porcentagem

        <NumericFormat
          type="text"
          className="tax"
          name="service_charge"
          id="tax"
          suffix="%"
          decimalSeparator=","
          thousandSeparator="."
          fixedDecimalScale={false}  
          allowNegative={false}
          isAllowed={(values) => {
            const { floatValue } = values;
            return floatValue === undefined || (floatValue <= 100 && Number.isInteger(floatValue));
          }}
          onValueChange={(values) => {
            const { floatValue } = values;
            setAfiliadosInfo((prevPacote) => ({
              ...prevPacote,
              porcent: floatValue ? Math.round(floatValue) : '',
            }));
          }}
          value={afiliadosInfo.porcent || ''}
        />
      </label>


      <label htmlFor="link_afiliado">
        Link Afiliado
        <input 
          id="link_afiliado" 
          name="type"
          onChange={(e) => setAfiliadosInfo({ ...afiliadosInfo, link: e.target.value })} 
          value={afiliadosInfo.link || ''}
        >
        </input>
      </label>

      <label htmlFor="frm_add_most_popular">
        Mais Popular
        <select 
          id="frm_add_most_popular" 
          name="type"
          disabled
          onChange={(e) => setAfiliadosInfo({ ...afiliadosInfo, type: e.target.value })} 
          value={afiliadosInfo.type || ''}
        >
          <option value="afiliado">Afiliado</option>
        </select>
      </label>

      <input type="submit" value="Adicionar" />
    </Form>
  );
}
