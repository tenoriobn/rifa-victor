import Estrela from "../../../assets/Icons/estrela.svg?react";

export default function CardCotasAtivas() {
  const cotasAtivas = [
    { id: '1', numero: '054524', valor: '5.000,00' },
    { id: '2', numero: '114153', valor: '300,00' },
    { id: '3', numero: '143501', valor: '300,00' },
    { id: '4', numero: '154189', valor: '1.000,00' },
    { id: '5', numero: '229371', valor: '300,00' },
    { id: '6', numero: '229372', valor: '1.000,00' },
    { id: '7', numero: '229373', valor: '300,00' },
    { id: '8', numero: '229374', valor: '300,00' },
    { id: '9', numero: '229375', valor: '1.000,00' },
    { id: '10', numero: '229376', valor: '300,00' },
    { id: '11', numero: '229380', valor: '300,00' },
    { id: '12', numero: '229381', valor: '500,00' },
    { id: '13', numero: '229382', valor: '500,00' },
    { id: '14', numero: '229383', valor: '300,00' },
    { id: '15', numero: '229384', valor: '1000,00' },
    { id: '16', numero: '229385', valor: '500,00' },
    { id: '17', numero: '229386', valor: '300,00' },
    { id: '18', numero: '229387', valor: '500,00' },
    { id: '19', numero: '229396', valor: '300,00' },
    { id: '20', numero: '229326', valor: '300,00' },
    { id: '21', numero: '229316', valor: '1000,00' },
    { id: '22', numero: '229346', valor: '500,00' },
  ];

  return (
    <div className='grid grid-cols-2 md:grid-cols-3 gap-4 mt-4'>
      {cotasAtivas.map((cotaAtiva) => (
        <article 
          key={cotaAtiva.id} 
          className='bg-sky-200 border border-solid border-sky-400 p-1 rounded-lg text-center'
        >
          <div className='flex items-center justify-center gap-1 text-lg font-bold'>
            <Estrela className="icon stroke-amber-500" />
            <p className='text-neutral-700'>{cotaAtiva.numero}</p>
          </div>
          <p className="text-neutral-700 mt-1">{cotaAtiva.valor}</p>
        </article>
      ))}


    </div>
  )
}
