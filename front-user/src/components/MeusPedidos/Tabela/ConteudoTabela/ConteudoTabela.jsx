import { useRecoilValue } from "recoil";
import { estadoPedidosUsuario } from "../../../../common/state/atom";
import { Link } from "react-router-dom";
import useFormattedDate from "../../../../common/state/hooks/useFormattedDate/useFormattedDate ";
import useCurrencyFormat from "../../../../common/state/hooks/useCurrencyFormat/useCurrencyFormat";

export default function ConteudoTabela() {
  const dadosTabela = useRecoilValue(estadoPedidosUsuario);
  const { formattedDate } = useFormattedDate();
  const { formatCurrency } = useCurrencyFormat();
  const baseURL = import.meta.env.VITE_BASE_URL;

  return (
    <tbody>
      {dadosTabela.map((item, index) => (
        <tr key={index} className={`text-left ${item.status === 0 ? "bg-amber-50 text-amber-600" : item.status === 1 ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600" }`}>
          <td>
            <div className={`p-2 border-0 border-l-4 border-solid ${item.status === 0 ? "border-amber-400" : item.status === 1 ? "border-emerald-400" : "border-red-400"} `}>
              <img 
                src={`${baseURL}/img/rifas/${item.rifa?.rifa_image[0]?.path}`}
                alt="" 
                className="h-auto min-w-[64px] w-full aspect-[16/9] object-cover rounded-lg" 
              />
            </div>
          </td>
          <td className="px-2">{item.cod}</td>
          <td className="px-2">{item.qntd_number}</td>
          <td className="px-2 text-right">{formatCurrency(item.value)}</td>
          <td className="px-2">{formattedDate(item.updated_at)}</td>
          <td className="px-2 whitespace-break-spaces text-center">
            <div className={`rounded-lg p-1 text-xs flex flex-wrap items-center justify-center ${item.status === 0 ? "bg-amber-100 text-amber-600"  : item.status === 1 ? "bg-emerald-100 text-emerald-600 " : "bg-red-100 text-red-600 "}`}>
              {item.status === 0 ? "Aguardando Pagamento" : item.status === 1 ? "Finalizado" : "Cancelado"}
            </div>
          </td>
          <td className="px-2">
            <Link to={`/checkout/${item.id}/${item.checkout}`} className="">
              <button className="relative inline-block group text-white rounded overflow-hidden shadow-transparent shadow-md hover:shadow-black/3 text-xs bg-blue-400">
                <div className="absolute left-0 top-0 bg-blue-500 w-0 group-hover:w-full transition-all duration-300 h-1/2"></div>
                <div className="absolute right-0 bottom-0 bg-blue-500 w-0 group-hover:w-full transition-all duration-300 h-1/2"></div>
                <div className="relative px-4 py-1 transition-all flex items-center justify-center gap-1">Ver</div>
              </button>
            </Link>
          </td>
        </tr>
      ))}
    </tbody>
  );
}
