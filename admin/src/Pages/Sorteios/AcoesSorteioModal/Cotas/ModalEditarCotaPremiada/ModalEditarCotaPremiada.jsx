import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components"
import { stateCotasPremiadas, stateOpenModalEditarCotaPremiada, stateUserLogin, stateTabelaCotasInfo } from "../../../../../common/states/atom";
import { putDados } from "../../../../../common/http/http";

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

export default function ModalEditarCotaPremiada() {
  const userLogin = useRecoilValue(stateUserLogin);
  const [openModalEditarCotaPremiada, setOpenModalEditarCotaPremiada] = useRecoilState(stateOpenModalEditarCotaPremiada);
  // const [cotaPremiada, setCotaPremiada] = useState({qntd_cota: '', award: '', show_site: 'Y', status: 'available', rifas_id: id});
  const [cotaPremiada, setCotaPremiada] = useRecoilState(stateCotasPremiadas);
  const setTabelaCotasInfo = useSetRecoilState(stateTabelaCotasInfo);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCotaPremiada((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));

    console.log('modalEditarHandle:', cotaPremiada);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await putDados('/admin/dashboard/bilhete-premiado/editar/', cotaPremiada, userLogin);

      setOpenModalEditarCotaPremiada(!openModalEditarCotaPremiada)
      setTabelaCotasInfo(response.data)
      
      console.log(response.data)
    } catch (error) {
      console.error('Erro ao fazer POST:', error);
    }
  };

  return (
    <Form id="frmAddPack" onSubmit={handleSubmit}>
      <label htmlFor="frm_add_qtd" id="frm_lb_qtd">
        Cota
        <input
          type="number"
          className="number"
          id="frm_add_qtd"
          name="number_cota"
          min="1"
          max="20"
          value={cotaPremiada.number_cota || ''}
          onChange={handleChange}
          required
          disabled
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
          onChange={handleChange}
          required
          disabled={cotaPremiada.status === "resgatada" ? true : false}
        />
      </label>

      <label htmlFor="frm_add_visible">
        Mostrar no site
        <select
          name="show_site"
          id="frm_add_visible"
          value={cotaPremiada.show_site || ''}
          onChange={handleChange}
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
          onChange={handleChange}
        >
          {cotaPremiada.status === "resgatada" ? <option value="resgatada">Resgatada</option> : 
            <>
              <option value="disponivel">Disponível</option>
              <option value="bloqueada">Bloqueada</option>
              <option value="imediato">Imediato</option>
            </>
          }
        </select>
      </label>

      <input type="submit" value="Adicionar" />
    </Form>
  );
}
