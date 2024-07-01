import numerosJson from "./numeros.json";

export default function NumerosBilhetes() {
  const numeros = Array.isArray(numerosJson.valores) ? numerosJson.valores : [];

  return (
    <div className="flex flex-col gap-2 mt-4">
      <p className="font-bold whitespace-nowrap text-neutral-700">Seus números:</p>

      <div className="flex flex-wrap gap-2">
        {numeros.map((valor, index) => (
          <div 
            key={index}
            className="bg-green-100 border font-semibold border-green-400 text-green-700 px-3 py-2 rounded relative" 
            role="alert"
          >
            {valor}
          </div>
        ))}
      </div>
    </div>
  )
}
