import { useState, useEffect } from "react";
import Copia from "../../../../assets/Icons/copia.svg?react";

const qrcode = [{
  qrcode: "data:image/png;base64,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"
}];

export default function ModalPix() {
  const [modalVisivel, setModalVisivel] = useState(false);
  const [copiado, setCopiado] = useState(false);

  const copyToClipboard = () => {
    const qrCodeText = document.getElementById("qrcodeArea").value;
    navigator.clipboard.writeText(qrCodeText).then(() => {
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000); // Remove a mensagem após 2 segundos
    }, (err) => {
      console.error("Erro ao copiar o código: ", err);
    });
  };

  useEffect(() => {
    if (modalVisivel) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [modalVisivel]);

  return (
    <>
      <button 
        className="py-2 px-6 text-xl bg-blue-500 text-white rounded-lg border border-solid border-blue-500 hover:bg-blue-600 transition-colors active:bg-blue-700 disabled:bg-neutral-400"
        onClick={() => setModalVisivel(!modalVisivel)}
      >
        Pagar 
      </button>

      {modalVisivel && (
        <div
          className="fixed top-0 left-0 w-full h-full flex flex-wrap justify-center items-center bg-black/40 backdrop-blur-sm p-4 overflow-auto vfm vfm--fixed vfm--inset z-40"
          role="dialog"
          aria-modal="true"
        >
          <div className="vfm__overlay vfm--overlay vfm--absolute vfm--inset vfm--prevent-none"></div>
          <div 
            className="vfm__content vfm--outline-none box-border flex flex-col max-w-xl mx-4 p-4 bg-white text-neutral-800 border rounded-lg overflow-auto"
          >
            <h1 className="text-xl text-center">PIX - SAVEIRO CROSS DOS SONHOS </h1>

            <div>
              <img src={qrcode[0].qrcode} alt="QR Code" className="bg-white mx-auto"/>
            </div>

            <div>
              <p> Ou se preferir copie o código abaixo para realizar o pagamento: </p>

              <div className="relative">
                <button
                  className="cpQrcode w-full my-2 text-center justify-center flex gap-2 focus:ring-4 focus:outline-none rounded-lg border text-sm font-medium px-5 py-4 focus:z-10 bg-amber-400 text-amber-800 border-amber-600 hover:text-white hover:bg-amber-600 focus:ring-gray-600 transition-all"
                  onClick={copyToClipboard}
                >
                  <Copia />
                  Copiar código
                </button>

                <span className={`absolute -right-2 -top-2 text-sky-700 bg-sky-200 rounded border border-solid border-sky-500 px-3 py-1 transition ease duration-200 transform ${copiado ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                  Código copiado!
                </span>
              </div>

              <textarea 
                id="qrcodeArea" 
                className="my-2 border border-solid border-neutral-500 bg-white/10 rounded-sm break-all w-full p-2 leading-6 min-h-[120px]"
                readOnly
              >
                00020126330014br.gov.bcb.pix01110121959996452040000530398654047.005802BR5911LIAN45610536009Sao Paulo62240520mpqrinter8143154447763041418
              </textarea>
            </div>

            <button 
              className="mt-1 ml-auto text-white bg-sky-400 p-2 border border-sky-500 rounded-lg"
              onClick={() => setModalVisivel(!modalVisivel)}
            > 
              Fechar 
            </button>
          </div>
        </div>
      )}
    </>
  );
}
