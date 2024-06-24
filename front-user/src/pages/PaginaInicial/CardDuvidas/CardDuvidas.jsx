import Whatsapp from "../assets/whatsapp.svg?react"

export default function CardDuvidas() {
  return (
    <div className="flex items-center justify-center mb-4">
      <div className="grow md:grow-0 h-full box-border relative text-neutral-600 mx-4 p-2 bg-slate-100 rounded-xl">
        <div className="flex items-end gap-2">
          <p 
            className="text-xl font-semibold text-neutral-800 mb-2"
          >
            🤔 Duvidas???
            <span className="font-thin text-sm text-neutral-700"> Fale conosco!</span>
          </p>
        </div>

        <div className="flex justify-center w-full">
          <a 
            href="https://wa.me/5511999999999"
            className="inline-flex items-center gap-x-2 px-2 py-1 text-sm font-semibold text-green-50 bg-green-600 hover:bg-green-700 active:bg-green-800 rounded-lg border border-solid border-green-700/50 transition-colors"
          >
            <Whatsapp />
            Whatsapp
          </a>
        </div>
      </div>
    </div>
  )
}
