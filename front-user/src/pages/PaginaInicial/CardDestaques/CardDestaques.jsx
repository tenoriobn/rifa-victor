import Bilhete from "../../../assets/Icons/bilhete.svg?react";

export default function CardDestaques() {
  return (
    <div className="flex w-auto overflow-hidden rounded-lg bg-neutral-200 hover:shadow-[4px_4px_4px_#0002] border border-solid border-neutral-400 ring-0 ring-amber-500/60 hover:ring-offset-4 hover:ring-2 transition-all flex-col mb-6 cursor-pointer">
      <img src="https://imagedelivery.net/TuyDlh37fwpu3jSKwZ3-9g/1242c2aa-3ab5-46d0-9ebe-813df3e51900/rifa"
        alt="Foto do Prêmio" 
        className="aspect-[16/9] w-full max-h-[200px] object-cover transition-all"
      />

      <div className="flex grow flex-col bg-neutral-100 overflow-hidden p-2">
        <p className="text-lg w-full font-semibold text-neutral-900 text-left truncate">
          SAVEIRO CROSS DOS SONHOS 
        </p>

        <p className="text-sm w-full text-neutral-600 text-left truncate">SAVEIRO CROSS CABINE DUPLA</p>

        <div className="flex justify-between mt-2">
          <div className='flex items-center gap-2'>
            <Bilhete className="icon text-emerald-500 w-[18px] h-[18px]" />
            <p className="font-bold text-lg leading-4 text-neutral-600 text-left truncate">R$ 0,20</p>
          </div>

          <button className="bg-amber-500 rounded px-4 py-1">Comprar</button>
        </div>
      </div>
    </div>
  )
}
