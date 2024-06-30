const dadosTabela = [
  {
    imgSrc: "https://imagedelivery.net/TuyDlh37fwpu3jSKwZ3-9g/1242c2aa-3ab5-46d0-9ebe-813df3e51900/ico",
    codigo: "1911248",
    quantidade: 35,
    preco: "R$ 7,00",
    data: "20/06/24, 16:28",
    status: "Finalizado",
    link: "/checkout/667482c2f0a36-92ede"
  },
  {
    imgSrc: "https://imagedelivery.net/TuyDlh37fwpu3jSKwZ3-9g/1242c2aa-3ab5-46d0-9ebe-813df3e51900/ico",
    codigo: "1911248",
    quantidade: 135,
    preco: "R$ 35,00",
    data: "20/06/28, 19:28",
    status: "Cancelada",
    link: "/checkout/667482c2f0a36-92ede"
  },
];

export default function ConteudoTabela() {
  return (
    <tbody>
      {dadosTabela.map((item, index) => (
        <tr key={index} className={`text-left ${item.status === "Cancelada" ? "bg-red-50 text-red-600" : "bg-emerald-50 text-emerald-600"}`}>
          <td>
            <div className={`p-2 border-0 border-l-4 border-solid ${item.status === "Cancelada" ? "border-red-400" : "border-emerald-400"} `}>
              <img src={item.imgSrc} alt="" className="h-auto min-w-[64px] w-full aspect-[16/9] object-cover rounded-lg" />
            </div>
          </td>
          <td className="px-2">{item.codigo}</td>
          <td className="px-2">{item.quantidade}</td>
          <td className="px-2 text-right">{item.preco}</td>
          <td className="px-2">{item.data}</td>
          <td className="px-2 whitespace-break-spaces text-center">
            <div className={`rounded-lg p-1 text-xs flex flex-wrap items-center justify-center ${item.status === "Cancelada" ? "bg-red-100 text-red-600 " : "bg-emerald-100 text-emerald-600 "}`}>
              {item.status}
            </div>
          </td>
          <td className="px-2">
            <a href={item.link} className="">
              <button className="relative inline-block group text-white rounded overflow-hidden shadow-transparent shadow-md hover:shadow-black/3 text-xs bg-blue-400">
                <div className="absolute left-0 top-0 bg-blue-500 w-0 group-hover:w-full transition-all duration-300 h-1/2"></div>
                <div className="absolute right-0 bottom-0 bg-blue-500 w-0 group-hover:w-full transition-all duration-300 h-1/2"></div>
                <div className="relative px-4 py-1 transition-all flex items-center justify-center gap-1">Ver</div>
              </button>
            </a>
          </td>
        </tr>
      ))}
    </tbody>
  );
}
