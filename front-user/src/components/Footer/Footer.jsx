import Whatsapp from "./assets/whatsapp.svg?react"
import Instagram from "./assets/instagram.svg?react"

export default function Footer() {
  return (
    <footer className="border-0 border-t border-solid border-t-neutral-700 text-neutral-300">
      <div className="max-w-2xl m-auto relative text-center flex flex-col mt-2 mb-4">

        <div className="inline-flex flex-wrap items-center justify-center gap-2 mb-4">
          <a 
            href="https://wa.me/+5543996403859"
            className="hover:scale-125 hover:px-2 transition-all"
            target="_blank"
          >
            <Whatsapp />
          </a>

          <a 
            href="https://instagram.com/ana_limapremios"
            className="hover:scale-125 hover:px-2 transition-all"
            target="_blank"
          >            
            <Instagram />
          </a>
        </div>

        <div className="inline-block group text-xs my-3">
          <p className="text-xs text-white text-center mb-1">
            <span className="font-semibold">OVERZ</span> a Plataforma Líder em Gestão de Sorteios!
          </p>

          <a href="https://wa.me/+5537998127715" className="px-2 border" target="_blank">CONTATO</a>
        </div>
      </div>
    </footer>
  );
}
