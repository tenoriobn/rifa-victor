import SetaPaginacao from "../../../assets/Icons/setaPaginacao.svg?react"

export default function Paginacao() {
  return (
    <div className="text-base text-right">
      <div className="inline-flex flex-wrap border border-solid border-slate-500 rounded-lg gap-2">
        <button className="h-10 px-4 transition-colors duration-300 rounded-l-lg focus:shadow-outline hover:bg-slate-100 flex items-center">
          <SetaPaginacao className="stroke-slate-500 " />
        </button>

        <button>
          <span 
            className="w-6 h-6 inline-flex items-center justify-center rounded-full transition-colors duration-300 focus:shadow-outline bg-slate-500 text-white"
          >
            1
          </span>
        </button>

        <button 
          className="h-10 px-5 transition-colors duration-300 rounded-r-lg focus:shadow-outline hover:bg-slate-200 flex items-center"
        >
          <SetaPaginacao className="stroke-slate-500 rotate-180" />
        </button>
      </div>
    </div>
  )
}
