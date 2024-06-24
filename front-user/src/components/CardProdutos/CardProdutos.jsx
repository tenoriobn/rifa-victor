/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import Bilhete from "../../assets/Icons/bilhete.svg?react";
import Calendario from "../../assets/Icons/calendario.svg?react";

const produtos = [
  {
    id: 1,
    titulo: "SAVEIRO CROSS DOS SONHOS",
    descricao: "SAVEIRO CROSS CABINE DUPLA",
    preco: "R$ 0,20",
    categoria: "ativas",
    imagem: "https://imagedelivery.net/TuyDlh37fwpu3jSKwZ3-9g/1242c2aa-3ab5-46d0-9ebe-813df3e51900/rifa",
    slug: "saveiro-cross-dos-sonhos" 
  },
  {
    id: 2,
    titulo: "PRODUTO FINALIZADO",
    descricao: "DESCRIÇÃO FINALIZADA",
    preco: "R$ 0,30",
    categoria: "finalizadas",
    imagem: "https://imagedelivery.net/TuyDlh37fwpu3jSKwZ3-9g/1242c2aa-3ab5-46d0-9ebe-813df3e51900/rifa",
    data: "13/04/2024",
    slug: "saveiro-cross-dos-sonhos-2" 
  },
  {
    id: 3,
    titulo: "SAVEIRO CROSS DOS SONHOS",
    descricao: "SAVEIRO CROSS CABINE DUPLA",
    preco: "R$ 0,20",
    categoria: "ativas",
    imagem: "https://imagedelivery.net/TuyDlh37fwpu3jSKwZ3-9g/1242c2aa-3ab5-46d0-9ebe-813df3e51900/rifa",
    slug: "saveiro-cross-dos-sonhos-3" 
  },
  {
    id: 4,
    titulo: "PRODUTO FINALIZADO",
    descricao: "DESCRIÇÃO FINALIZADA",
    preco: "R$ 0,30",
    categoria: "finalizadas",
    imagem: "https://imagedelivery.net/TuyDlh37fwpu3jSKwZ3-9g/1242c2aa-3ab5-46d0-9ebe-813df3e51900/rifa",
    data: "13/04/2024",
    slug: "saveiro-cross-dos-sonhos-4" 
  },
];

export default function CardProdutos({ categoria }) {
  const produtosFiltrados = produtos.filter(produto => produto.categoria === categoria);

  return (
    <div className="flex flex-col gap-4">
      {produtosFiltrados.map(produto => (
        <Link 
          key={produto.id} 
          to={`/produto/${produto.slug}`}
          className="flex w-auto overflow-hidden rounded-lg bg-neutral-200 hover:shadow-[4px_4px_4px_#0002] border border-solid border-neutral-400 ring-0 ring-amber-500/60 hover:ring-offset-4 hover:ring-2 transition-all"
        >
          <img 
            className="w-[80px] m-2 rounded-lg object-cover transition-all" 
            src={produto.imagem} 
            alt={`Imagem do ${produto.titulo}`}
          />

          <div className="flex grow flex-col bg-neutral-100 overflow-hidden p-2">
            <p className="text-lg w-full font-semibold text-neutral-900 text-left truncate">
              {produto.titulo}
            </p>

            <p className="text-sm w-full text-neutral-600 text-left truncate">
              {produto.descricao}
            </p>
            
            <div className="flex items-end justify-between mt-2">
              <div className="flex flex-col gap-2">
                {categoria === "finalizadas" && (
                  <div className='flex items-center gap-2'>
                    <Calendario className="icon text-amber-500" />
                    <p className="text-sm font-semibold text-zinc-700">{produto.data} - <span>(-69 Dias)</span></p>
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <Bilhete className="icon text-emerald-500 w-[18px] h-[18px]" />
                  <p className="font-bold text-lg leading-4 text-neutral-600 text-left truncate">{produto.preco}</p>
                </div>
              </div>

              <button className="bg-amber-500 hover:bg-black rounded px-4 py-1 transition-all">
                {categoria === "ativas" ? "Comprar" : "Ver"}
              </button>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
