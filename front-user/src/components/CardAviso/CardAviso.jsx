/* eslint-disable react/prop-types */
export default function CardAviso({classes, subtitulo, mensagem}) {
  return (
    <div className={`text-lg border-2 border-dashed p-4 rounded-lg my-4 ${classes}`}>
      <span className="font-semibold">{subtitulo}</span> 
      {mensagem} 
    </div>

    // <div className="text-lg border-2 border-dashed p-4 border-yellow-600 bg-yellow-100 text-yellow-700 rounded-lg my-4">
    //   <span className="font-semibold">Nada aqui...</span> 
    //   Parece que estamos sem ofertas disponíveis no momento, mas não se preocupe, em breve teremos novidades! Fique ligado! 
    // </div>
  )
}
