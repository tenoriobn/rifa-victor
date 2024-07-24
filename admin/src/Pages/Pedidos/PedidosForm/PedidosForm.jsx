import styled from "styled-components";
import { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import { stateOptionsRifa, statePedidosInfo } from "../../../common/states/atom";
import { useRecoilState, useRecoilValue } from "recoil";
import { postDados } from "../../../common/http/http";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin: 1.875rem 0;

  .filter-item-row {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: flex-end;
    gap: .625rem;

  }

  .filter-item {
    flex-grow: 1;
    max-width: 300px;
  }

  .filter-item-buttons {
    display: flex;
  }

  input {
    height: 40px;
    margin-right: 5px;
    border-radius: 5px;
    color: #fff;
    padding: 10px;
    width: 100%;
    background: 0 0;
    border: 1px solid #275680;
    box-sizing: border-box;
  }

  .filter-item label {
    display: block;
    margin-bottom: .3125rem;
    color: #f5f5f5;
  }

  select {
    background-color: #20202a;
    color: #fff;
    border: .0625rem solid #275680;
    padding: .625rem;
    border-radius: .3125rem;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    height: 40px;
    width: 100%;
    line-height: normal;
    padding-right: 30px;
  }

  .button-activate {
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 10px 15px;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 5px;
    margin-right: 4px;
    height: 38px;
    box-sizing: border-box;
  }

  .button-search {
    background-color: #858796;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 10px 15px;
    cursor: pointer;
    height: 40px;
    display: flex;
    align-items: center;
    gap: 5px;
  }
`;

export default function PedidosForm() {
  const [showFilters, setShowFilters] = useState(false);
  const [orderFilter, setOrderFilter] = useState({});
  const [pedidosInfo, setPedidosInfo] =  useRecoilState(statePedidosInfo);
  const optionsRifa = useRecoilValue(stateOptionsRifa);

  console.log('orderFilter', orderFilter)

    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await postDados('/admin/dashboard/pedidos/filtro', orderFilter);
      setPedidosInfo(response.data);

      console.log('response aqui: ', response)
    } catch (error) {
      console.error("There was an error fetching the data!", error);
    }
  };

  console.log(pedidosInfo)

  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <div className="filter-item-row">
        <div className="filter-item" style={{minWidth: "260px"}}>
          <label htmlFor="init_date">Data:</label>
          {/* <input type="text" name="datetimes" /> */}

        <Datepicker 
          toggleClassName="hidden"
          i18n={"pt-br"} 
          displayFormat={"DD/MM/YYYY"}
          showFooter={true} 
          value={orderFilter} 
          onChange={(newValue) => setOrderFilter(newValue)}
          configs={{
              shortcuts: {
              today: "Hoje", 
              yesterday: "Ontem", 
              past: period => `Ultimos ${period} Dias`, 
              currentMonth: "Mês Atual", 
              pastMonth: "Mês Anterior" 
            },
              footer: {
              cancel: "Cancelar", 
              apply: "Aplicar" 
            }
          }} 
        /> 

        </div>

        <div className="filter-item">
          <label htmlFor="id">Pedido:</label>
          <input type="text" name="id" placeholder="NUMERO DO PEDIDO" autoComplete="off" 
            onChange={(e) => setOrderFilter({ ...orderFilter, id: e.target.value })} 
            value={orderFilter.id || ''}
          />
        </div>

        <div className="filter-item">
          <label htmlFor="id_customer">ID Cliente:</label>
          <input type="text" name="id_customer" placeholder="ID DO CLIENTE" autoComplete="off" 
            onChange={(e) => setOrderFilter({ ...orderFilter, client_id: e.target.value })} 
            value={orderFilter.client_id || ''}
          />
        </div>

        <div className="filter-item">
          <label htmlFor="status">Status:</label>
          <select name="status" id=""
            onChange={(e) => setOrderFilter({ ...orderFilter, status: e.target.value })} 
            value={orderFilter.status || ''}
          >
            <option value="">STATUS: Todos</option>
            <option value="1">Aprovado</option>
            <option value="5">Divergente</option>
            <option value="0">Pendente</option>
            <option value="2">Cancelado</option>
          </select>
        </div>

        <div className="filter-item filter-item-buttons">
          <label htmlFor="status">&nbsp;</label>
          <a className="button-activate" onClick={() => setShowFilters(!showFilters)}>
            <i id="btn_filtro" className={showFilters ? "fas fa-minus-circle" : "fas fa-plus-circle"}></i>
          </a>
          <button type="submit" className="button-search"><i className="fas fa-search"></i> Filtrar</button>
        </div>
      </div>
      
      {showFilters && (
        <>
          <div className="filter-item-row filtro" id="filtro1" style={{display: "flex"}}>
              <div className="filter-item">
                <label htmlFor="id_raffle">Sorteio:</label>
                <select name="id_raffle" id="id_raffle"
                  onChange={(e) => setOrderFilter({ ...orderFilter, rifas_id: e.target.value })}
                  value={orderFilter.rifas_id}
                >
                  <option value="">SELECIONE O SORTEIO</option>
                  {optionsRifa.map((rifa) => (
                    <option key={rifa.id} value={rifa.id}>
                      {rifa.title}
                    </option>
                  ))}
                </select>
              </div>


              <div className="filter-item">
                <label htmlFor="orderby">Ordem:</label>
                <select name="orderby" id="orderby"
                  onChange={(e) => setOrderFilter({ ...orderFilter, ordem: e.target.value })} 
                  value={orderFilter.ordem || ''}
                >
                  <option value="DESC">Novos</option>
                  <option value="ASC">Antigos</option>
                  <option value="valor_menor">Valor Menor - Maior</option>
                  <option value="valor_maior">Valor Maior - Menor</option>
                  <option value="qntd_menor">Quantidade Menor - Maior</option>
                  <option value="qntd_maior">Quantidade Maior - Menor</option>
                </select>
              </div>
              <div className="filter-item">
                <label htmlFor="itemsPerPage">Registros por Página:</label>
                <select name="itemsPerPage" id="itemsPerPage"
                  onChange={(e) => setOrderFilter({ ...orderFilter, registroPagina: e.target.value })} 
                  value={orderFilter.registroPagina || ''}
                >
                  <option value="1">1</option>
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="30">30</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </select>
              </div>

              <div className="filter-item">
                <label htmlFor="number">Cota:</label>
                <input type="text" name="number" placeholder="COTA"autoComplete="off" 
                  onChange={(e) => setOrderFilter({ ...orderFilter, qntd_number: e.target.value })} 
                  value={orderFilter.qntd_number || ''}
                />
              </div>
          </div>

          <div className="filter-item-row filtro" id="filtro2" style={{display: "flex"}}>
            <div className="filter-item">
              <label htmlFor="id_affiliate">Qtd. Inicial:</label>
              <input type="text" className="qtd" name="qtd_init" placeholder="Qtd. Inicial" autoComplete="off" maxLength="10" 
                onChange={(e) => setOrderFilter({ ...orderFilter, qntd_number_start: e.target.value })} 
                value={orderFilter.qntd_number_start || ''}
              />
            </div>
            <div className="filter-item">
              <label htmlFor="id_affiliate">Qtd. Final:</label>
              <input type="text" className="qtd" name="qtd_fim" placeholder="Qtd. Final" autoComplete="off" maxLength="10" 
                onChange={(e) => setOrderFilter({ ...orderFilter, qntd_number_end: e.target.value })} 
                value={orderFilter.qntd_number_end || ''}
              />
            </div>
            <div className="filter-item">
              <label htmlFor="id_affiliate">Valor Inicial:</label>
              <input type="text" className="price" name="val_init" placeholder="Valor Inicial" autoComplete="off" 
                onChange={(e) => setOrderFilter({ ...orderFilter, value_start: e.target.value })} 
                value={orderFilter.value_start || ''}
              />
            </div>
            <div className="filter-item">
              <label htmlFor="id_affiliate">Valor Final:</label>
              <input type="text" className="price" name="val_fim" placeholder="Valor Final" autoComplete="off" 
                onChange={(e) => setOrderFilter({ ...orderFilter, value_end: e.target.value })} 
                value={orderFilter.value_end || ''}
              />
            </div>
          </div>

          <div className="filter-item-row filtro" id="filtro3" style={{display: "flex"}}>
            <div className="filter-item">
              <label htmlFor="id_affiliate">ID Afiliado:</label>
              <input type="text" name="id_affiliate" placeholder="ID DO AFILIADO" autoComplete="off" 
                onChange={(e) => setOrderFilter({ ...orderFilter, idAfiliado: e.target.value })} 
                value={orderFilter.idAfiliado || ''}
              />
            </div>
            <div className="filter-item">
              <label htmlFor="transacao">Transação:</label>
              <input type="text" name="transacao" placeholder="ID DA TRANSAÇÃO" autoComplete="off" 
                onChange={(e) => setOrderFilter({ ...orderFilter, pix_id: e.target.value })} 
                value={orderFilter.pix_id || ''}
              />
            </div>
          </div>
        </>
      )}
    </Form>
  )
}
