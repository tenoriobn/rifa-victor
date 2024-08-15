/* eslint-disable react/prop-types */
import SetaPaginacao from "../../../assets/Icons/setaPaginacao.svg?react"

export default function Paginacao({pagination, onPageChange}) {
  if (!pagination) {
    return <div>Carregando...</div>;
  }

  if (!pagination.links) {
    return null;
  }
  
  return (
    <div className="text-base text-right">
      <div className="inline-flex flex-wrap border border-solid border-slate-500 rounded-lg gap-2">
        {pagination.links.map((link, index) => (      
          <button 
            key={index}
            onClick={() => onPageChange(link.url ? new URL(link.url).searchParams.get('page') : 1)}
            className={`${ link.label === '&laquo; Previous' ? "h-10 px-4 transition-colors duration-300 rounded-l-lg focus:shadow-outline hover:bg-gray-100 flex items-center" : link.label === 'Next &raquo;' ? "h-10 px-4 transition-colors duration-300 rounded-r-lg focus:shadow-outline hover:bg-gray-200 flex items-center" :""}`}
          >
            { link.label === '&laquo; Previous' 
              ? <SetaPaginacao className="stroke-slate-500 " />

              : link.label === 'Next &raquo;' 

              ? <SetaPaginacao className="stroke-slate-500 rotate-180" />
              
              : <span 
                className={`w-6 h-6 inline-flex items-center justify-center rounded-full transition-colors duration-300 focus:shadow-outline  ${link.active ? 'bg-slate-500 text-white' : 'hover:bg-gray-200 text-slate-700'}`}
              >
                {link.label}
              </span>
            }
          </button>
        ))}
      </div>
    </div>
  )
}