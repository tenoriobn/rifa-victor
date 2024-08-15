import Whatsapp from "./assets/whatsapp.svg?react"
import Instagram from "./assets/instagram.svg?react"
import { useRecoilValue } from "recoil";
import { stateSiteConfig } from "../../common/state/atom";
import usePhoneFormat from "../../common/state/hooks/usePhoneFormat/usePhoneFormat";

export default function Footer() {
  const siteConfig = useRecoilValue(stateSiteConfig);
  const { formatPhone } = usePhoneFormat();
  const formattedPhone = formatPhone(siteConfig.whatsapp);

  return (
    <footer className="border-0 border-t border-solid border-t-neutral-300 text-neutral-300">
      <div className="max-w-2xl m-auto relative text-center flex flex-col mt-2 mb-4">

        <div className="inline-flex flex-wrap items-center justify-center gap-2">
          <a 
            href={`https://wa.me/${formattedPhone}`}
            className="hover:scale-125 hover:px-2 transition-all"
            target="_blank"
          >
            <Whatsapp className="fill-black/90" />
          </a>

          <a 
            href={`https://instagram.com/${siteConfig.instagram}`}
            className="hover:scale-125 hover:px-2 transition-all"
            target="_blank"
          >            
            <Instagram className="fill-black/90" />
          </a>
        </div>

        <div className="inline-block group text-xs my-3">
          <p className="text-xs text-neutral-800 text-center mb-1">
            {/* <span className="font-semibold">OVERZ</span>  */}
            {siteConfig.footer_company}
          </p>

          <a href={siteConfig.helpdesk_url} className="text-neutral-800 px-2 border border-neutral-800" target="_blank">CONTATO</a>
        </div>
      </div>
    </footer>
  );
}
