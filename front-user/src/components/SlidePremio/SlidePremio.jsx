import { useState } from 'react';

export default function SlidePremio() {
  const [imgPremioSlide, setImgPremioSlide] = useState('https://imagedelivery.net/TuyDlh37fwpu3jSKwZ3-9g/1242c2aa-3ab5-46d0-9ebe-813df3e51900/rifa');

  const thumbnails = [
    {
      id: 1,
      src: 'https://imagedelivery.net/TuyDlh37fwpu3jSKwZ3-9g/1242c2aa-3ab5-46d0-9ebe-813df3e51900/rifa'
    },
    {
      id: 2,
      src: 'https://imagedelivery.net/TuyDlh37fwpu3jSKwZ3-9g/a5f42fa1-5e0f-4e91-85cc-8162deefba00/rifa'
    }
  ];

  return (
    <>
      <div className="aspect-[16/9] mb-4">
        <img 
          src={imgPremioSlide} 
          className="w-full h-full object-cover rounded-lg mb-4"
          alt="Imagem do Premio" 
        />
      </div>

      <div className="flex flex-wrap gap-4 justify-center my-2">
        {thumbnails.map((thumbnail) => (
          <img 
            key={thumbnail.id}
            src={thumbnail.src}
            className={`w-16 h-16 object-cover rounded-lg mb-4 transition-all cursor-pointer ${imgPremioSlide !== thumbnail.src ? 'hover:scale-110' : ''}`}
            alt={`Miniatura ${thumbnail.id}`}
            onClick={() => setImgPremioSlide(thumbnail.src)}
          />
        ))}
      </div>
    </>
  );
}