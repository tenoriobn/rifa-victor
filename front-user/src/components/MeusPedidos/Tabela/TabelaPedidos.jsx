import CabecalhoTabela from "./CabecalhoTabela/CabecalhoTabela";
import ConteudoTabela from "./ConteudoTabela/ConteudoTabela";

export default function TabelaPedidos() {
  return (
    <div className=" overflow-hidden overflow-x-auto">
      <table
        className="w-full whitespace-nowrap text-left border-separate border-spacing-y-1 text-neutral-700 py-5"
      >
        <CabecalhoTabela />

        <ConteudoTabela />
        <ConteudoTabela />
      </table>
    </div>
  )
}
