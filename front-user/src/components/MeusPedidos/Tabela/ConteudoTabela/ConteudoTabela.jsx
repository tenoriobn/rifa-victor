export default function ConteudoTabela() {
  return (
    <tbody>
      <tr className="text-left bg-emerald-50 text-emerald-600">
        <td>
          <div className="p-2 border-0 border-l-4 border-solid border-emerald-400">
            <img src="https://imagedelivery.net/TuyDlh37fwpu3jSKwZ3-9g/1242c2aa-3ab5-46d0-9ebe-813df3e51900/ico" alt="" className="h-auto min-w-[64px] w-full aspect-[16/9] object-cover rounded-lg" />
          </div>
          
        </td>
        
        <td className="px-2">1911248</td>
        <td className="px-2">35</td>
        <td className="px-2 text-right">R$&nbsp;7,00</td>
        <td className="px-2">20/06/24, 16:28</td>
        <td className="px-2 whitespace-break-spaces text-center">
          <div className="rounded-lg p-1 text-xs flex flex-wrap items-center justify-center bg-emerald-100 text-emerald-600">
            Finalizado
          </div>
        </td>
        <td className="px-2">
          <a href="/checkout/667482c2f0a36-92ede" className="">
            <button className="relative inline-block group text-white rounded overflow-hidden shadow-transparent shadow-md hover:shadow-black/3 0 text-xs bg-blue-400">
              <div className="absolute left-0 top-0 bg-black w-0 group-hover:w-full transition-all h-1/2"></div>
              <div className="absolute right-0 bottom-0 bg-black w-0 group-hover:w-full transition-all h-1/2"></div>
              <div className="relative px-4 py-1 transition-all flex items-center justify-center gap-1"> Ver </div>
            </button>
          </a>
        </td>
      </tr>
    </tbody>
  )
}
