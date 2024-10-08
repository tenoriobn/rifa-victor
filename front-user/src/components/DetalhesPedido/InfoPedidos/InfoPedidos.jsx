import Whatsapp from "../../../assets/Icons/whatsapp.svg?react";
import { useRecoilValue } from "recoil";
import { estadoCheckoutInfo } from "../../../common/state/atom";
import useCurrencyFormat from "../../../common/state/hooks/useCurrencyFormat/useCurrencyFormat";
import useFormattedDate from "../../../common/state/hooks/useFormattedDate/useFormattedDate ";
// import usePhoneFormat from "../../../common/state/hooks/usePhoneFormat/usePhoneFormat";

export default function InfoPedidos() {
  const checkoutInfo = useRecoilValue(estadoCheckoutInfo);
  const { formattedDate } = useFormattedDate();
  const { formatCurrency } = useCurrencyFormat();
  // const siteConfig = useRecoilValue(stateSiteConfig);
  // const { formatPhone } = usePhoneFormat();

  // console.log('checkoutInfo', checkoutInfo.rifa.rifa_others.whatsapp_group)

  // const formattedPhone = formatPhone(checkoutInfo.rifa.rifa_others.whatsapp_group);

  const informacoes = [
    { label: '🔢 Código:', value: checkoutInfo?.cod },
    { label: '🛍 Total de Cotas:', value: checkoutInfo?.qntd_number },
    { label: '➕ Taxa:', value: formatCurrency(checkoutInfo?.rifa?.rifa_payment?.service_charge) },
    { label: '💲 Total:', value: formatCurrency(checkoutInfo?.value), class: "font-bold" }
  ];

  return (
    <div className="flex flex-col-reverse md:flex-row w-full gap-8">
      <div className="grow bg-white p-4 rounded-md">
        {informacoes.map((info, index) => (
          <p key={index} className={`text-neutral-700 ${info.class}`}>
            <span className="font-semibold">{info.label} </span>
            {info.value}
          </p>
        ))}
        
        {checkoutInfo?.status === 0 &&
          <div className="mt-4 flex gap-2 text-neutral-700">
            <p className="font-bold">⚠ Status:</p>
            <p className="text-green-500">Aguardando pagamento</p>
          </div>
        }

        {checkoutInfo?.status === 1 &&
          <div className="mt-4 flex gap-2 text-neutral-700">
            <p className="font-bold">✅ Status:</p>
            <p className="text-emerald-500">Finalizado</p>
          </div>
        }

        {checkoutInfo?.status === 2 &&
          <div className="mt-4 flex gap-2 text-neutral-700">
            <p className="font-bold">❌ Status:</p>
            <p className="text-red-500">Cancelado</p>
          </div>
        }

        {checkoutInfo?.status === 1 &&
          <div className="flex gap-2 text-neutral-700">
            <div className="font-bold">🗓 Pago em:</div>
            <div>{formattedDate(checkoutInfo.updated_at)}</div>
          </div>
        }

        <a 
          href={checkoutInfo?.rifa?.rifa_others?.whatsapp_group}
          target="_blank"
          className="relative cursor-pointer inline-block group text-white rounded overflow-hidden shadow-transparent shadow-md hover:shadow-black/3 0 text-xs bg-green-500"
        >
          <div className="absolute left-0 top-0 bg-green-700 w-0 group-hover:w-full transition-all duration-300 h-1/2"></div>
          <div className="absolute right-0 bottom-0 bg-green-700 w-0 group-hover:w-full transition-all duration-300 h-1/2"></div>

          <div className="relative px-4 py-1 transition-all flex items-center justify-center gap-1">
            <Whatsapp />
            Grupo Whatsapp
          </div>
        </a>
      </div>
    </div>
  )
}
