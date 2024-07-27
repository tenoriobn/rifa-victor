import styled from "styled-components";
import { postDados } from "../../../../../common/http/http";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { stateCotasPremiadas, stateOpenModalAdicionarCota, stateTabelaCotasInfo, stateUserLogin } from "../../../../../common/states/atom";
import { useParams } from "react-router-dom";

const Form = styled.form`
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

  input[type='number']::-webkit-outer-spin-button,
  input[type='number']::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

export default function AdicionarCota() {
  const { id } = useParams();
  const userLogin = useRecoilValue(stateUserLogin);
  const [openModalAdicionarCota, setOpenModalAdicionarCota] = useRecoilState(stateOpenModalAdicionarCota);
  const setTabelaCotasInfo = useSetRecoilState(stateTabelaCotasInfo);
  const [cotaPremiada, setCotaPremiada] = useRecoilState(stateCotasPremiadas)

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await postDados('/admin/dashboard/bilhete-premiado/cadastrar', {...cotaPremiada, rifas_id: id}, userLogin);

      setTabelaCotasInfo(response.data.data)
      setOpenModalAdicionarCota(!openModalAdicionarCota)
      
      console.log(response.data)
    } catch (error) {
      console.error('Erro ao fazer POST:', error);
    }
  };

  return (
    <Form id="frmAddPack" onSubmit={handleSubmit}>
      <label htmlFor="frm_add_qtd" id="frm_lb_qtd">
        Quantidade (MAX: 20)
        <input
          type="number"
          className="number"
          id="frm_add_qtd"
          name="qntd_cota"
          min="1"
          max="20"
          value={cotaPremiada.qntd_cota || ''}
          onChange={(e) => setCotaPremiada({...cotaPremiada, qntd_cota: e.target.value})}
          required
        />
      </label>

      <label htmlFor="frm_add_text">
        Prêmio
        <input
          type="text"
          id="frm_add_text"
          name="award"
          maxLength="50"
          value={cotaPremiada.award || ''}
          onChange={(e) => setCotaPremiada({...cotaPremiada, award: e.target.value})}
          required
        />
      </label>

      <label htmlFor="frm_add_visible">
        Mostrar no site
        <select
          name="show_site"
          id="frm_add_visible"
          value={cotaPremiada.show_site || ''}
          onChange={(e) => setCotaPremiada({...cotaPremiada, show_site: e.target.value})}
        >
          <option value="sim">SIM</option>
          <option value="nao">NÃO</option>
        </select>
      </label>

      <label htmlFor="frm_add_st">
        Status
        <select
          name="status"
          id="frm_add_st"
          value={cotaPremiada.status || ''}
          onChange={(e) => setCotaPremiada({...cotaPremiada, status: e.target.value})}
        >
          <option value="disponivel">Disponível</option>
          <option value="bloqueada">Bloqueada</option>
          <option value="imediato">Imediato</option>
        </select>
      </label>

      <input type="submit" value="Adicionar" />
    </Form>
  );
}
