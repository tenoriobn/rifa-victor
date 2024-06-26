/* eslint-disable react/prop-types */

export default function CabecalhoSecao({ subtitulo, paragrafo, Icone }) {
  return (
    <div className="flex items-center gap-2 text-xl bg-slate-300 rounded p-2 mb-2">
      <Icone className="stroke-amber-500" />
      <h2 className="text-xl font-semibold text-neutral-800">
        {subtitulo}
        <span className="font-thin text-sm text-neutral-700"> {paragrafo}</span>
      </h2>
    </div>
  )
}
