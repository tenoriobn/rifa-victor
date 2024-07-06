export default function DataPagamento() {
  return (
    <div className="category">
      <h3>DATAS E PAGAMENTO</h3>

      <label>
        Data do sorteio (Opcional)
        <input type="datetime-local" name="draw_date" />
      </label>

      <label>
        Inicio Venda (Opcional)
        <input type="datetime-local" name="sale_init_date" />
      </label>

      <label>
        Fim Venda (Opcional)
        <input type="datetime-local" name="sale_end_date" />
      </label>

      <label htmlFor="">
        Tempo Pagto (Minutos)
        <input type="phone" className="expires_time" name="expires_time" defaultValue="30" required />
      </label>

      <label htmlFor="">
        Taxa de Serviço
        <input type="text" className="tax" name="tax" id="tax" defaultValue="0,00%" />
      </label>

      <label htmlFor="">
        Texto Taxa de Serviço
        <input type="text" name="tax_text" maxLength="20" />
      </label>
    </div>
  )
}
