import styled from "styled-components";
import { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";

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

  console.log(orderFilter)

  return (
    <Form method="POST" action="/dashboard/rifas/cotas/174">
      <div className="filter-item-row">
        <div className="filter-item" style={{minWidth: "260px"}}>
          <label htmlFor="init_date">Data:</label>
          {/* <input type="text" name="datetimes" /> */}

        <Datepicker 
          toggleClassName="hidden"
          i18n={"pt-br"} 
          displayFormat={"DD/MM/YYYY"}
          showFooter={true} 
          value={orderFilter.data} 
          onChange={(newValue) => setOrderFilter(prevOrderFilter => ({ ...prevOrderFilter, data: newValue }))}
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
            onChange={(e) => setOrderFilter({ ...orderFilter, pedido: e.target.value })} 
            value={orderFilter.pedido || ''}
          />
        </div>

        <div className="filter-item">
          <label htmlFor="id_customer">ID Cliente:</label>
          <input type="text" name="id_customer" placeholder="ID DO CLIENTE" autoComplete="off" 
            onChange={(e) => setOrderFilter({ ...orderFilter, idCliente: e.target.value })} 
            value={orderFilter.idCliente || ''}
          />
        </div>

        <div className="filter-item">
          <label htmlFor="status">Status:</label>
          <select name="status" id=""
            onChange={(e) => setOrderFilter({ ...orderFilter, status: e.target.value })} 
            value={orderFilter.status || ''}
          >
            <option value="">STATUS: Todos</option>
            <option value="F">Aprovado</option>
            <option value="FI">Divergente</option>
            <option value="A">Pendente</option>
            <option value="C">Cancelado</option>
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
                <select name="id_raffle" id=""
                  onChange={(e) => setOrderFilter({ ...orderFilter, sorteio: e.target.value })} 
                  value={orderFilter.sorteio || ''}
                >
                  <option defaultValue="">- Todos -</option>
                  <option defaultValue="174">SAVEIRO CROSS DOS SONHOS</option>
                </select>
              </div>
              <div className="filter-item">
                <label htmlFor="orderby">Ordem:</label>
                <select name="orderby" id="orderby"
                  onChange={(e) => setOrderFilter({ ...orderFilter, ordem: e.target.value })} 
                  value={orderFilter.ordem || ''}
                >
                  <option defaultValue="DESC">Novos</option>
                  <option defaultValue="ASC">Antigos</option>
                  <option defaultValue="priceAsc">Valor Menor - Maior</option>
                  <option defaultValue="priceDesc">Valor Maior - Menor</option>
                  <option defaultValue="price">Quantidade Menor - Maior</option>
                  <option defaultValue="price">Quantidade Maior - Menor</option>
                </select>
              </div>
              <div className="filter-item">
                <label htmlFor="itemsPerPage">Registros por Página:</label>
                <select name="itemsPerPage" id="itemsPerPage"
                  onChange={(e) => setOrderFilter({ ...orderFilter, registroPagina: e.target.value })} 
                  value={orderFilter.registroPagina || ''}
                >
                  <option defaultValue="1">1</option>
                  <option defaultValue="10">10</option>
                  <option defaultValue="20">20</option>
                  <option defaultValue="30">30</option>
                  <option defaultValue="50">50</option>
                  <option defaultValue="100">100</option>
                </select>
              </div>
              <div className="filter-item">
                <label htmlFor="number">Cota:</label>
                <input type="text" name="number" placeholder="COTA"autoComplete="off" 
                  onChange={(e) => setOrderFilter({ ...orderFilter, cota: e.target.value })} 
                  value={orderFilter.cota || ''}
                />
              </div>
          </div>

          <div className="filter-item-row filtro" id="filtro2" style={{display: "flex"}}>
            <div className="filter-item">
              <label htmlFor="id_affiliate">Qtd. Inicial:</label>
              <input type="text" className="qtd" name="qtd_init" placeholder="Qtd. Inicial" autoComplete="off" maxLength="10" 
                onChange={(e) => setOrderFilter({ ...orderFilter, qtdInicial: e.target.value })} 
                value={orderFilter.qtdInicial || ''}
              />
            </div>
            <div className="filter-item">
              <label htmlFor="id_affiliate">Qtd. Final:</label>
              <input type="text" className="qtd" name="qtd_fim" placeholder="Qtd. Final" autoComplete="off" maxLength="10" 
                onChange={(e) => setOrderFilter({ ...orderFilter, qtdFinal: e.target.value })} 
                value={orderFilter.qtdFinal || ''}
              />
            </div>
            <div className="filter-item">
              <label htmlFor="id_affiliate">Valor Inicial:</label>
              <input type="text" className="price" name="val_init" placeholder="Valor Inicial" autoComplete="off" 
                onChange={(e) => setOrderFilter({ ...orderFilter, valorInicial: e.target.value })} 
                value={orderFilter.valorInicial || ''}
              />
            </div>
            <div className="filter-item">
              <label htmlFor="id_affiliate">Valor Final:</label>
              <input type="text" className="price" name="val_fim" placeholder="Valor Final" autoComplete="off" 
                onChange={(e) => setOrderFilter({ ...orderFilter, valorFinal: e.target.value })} 
                value={orderFilter.valorFinal || ''}
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
                onChange={(e) => setOrderFilter({ ...orderFilter, transacao: e.target.value })} 
                value={orderFilter.transacao || ''}
              />
            </div>
          </div>
        </>
      )}
    </Form>
  )
}
