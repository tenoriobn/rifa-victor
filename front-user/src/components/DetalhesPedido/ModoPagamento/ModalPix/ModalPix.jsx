import { useState, useEffect } from "react";
import Copia from "../../../../assets/Icons/copia.svg?react";
import { useRecoilValue } from "recoil";
import { estadoCheckoutInfo, estadoQrCode } from "../../../../common/state/atom";
import QRCode from "qrcode"; // Importa a biblioteca QRCode

export default function ModalPix() {
  const [modalVisivel, setModalVisivel] = useState(false);
  const [copiado, setCopiado] = useState(false);
  const [qrCodeImage, setQrCodeImage] = useState(""); // Estado para armazenar a imagem do QR Code
  const qrCode = useRecoilValue(estadoQrCode);
  const checkoutInfo = useRecoilValue(estadoCheckoutInfo);

  useEffect(() => {
    if (modalVisivel) {
      document.body.style.overflow = 'hidden';

      QRCode.toDataURL(qrCode[0])
        .then(url => {
          setQrCodeImage(url);
        })
        .catch(err => {
          console.error("Erro ao gerar o QR Code: ", err);
        });
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [modalVisivel, qrCode]);

  const copyToClipboard = () => {
    const qrCodeText = document.getElementById("qrcodeArea").value;
    navigator.clipboard.writeText(qrCodeText).then(() => {
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    }, (err) => {
      console.error("Erro ao copiar o código: ", err);
    });
  };

  return (
    <>
      <button 
        className="py-2 px-6 text-xl bg-blue-500 text-white rounded-lg border border-solid border-blue-500 hover:bg-blue-600 transition-colors duration-300 active:bg-blue-700 disabled:bg-neutral-400"
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
            <h1 className="text-xl text-center">{checkoutInfo?.rifa?.title} </h1>

            <div>
              <img src={qrCodeImage} alt="QR Code" className="bg-white mx-auto w-[196px] h-[196px]"/>
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
                value={qrCode[0]}
                readOnly
              />
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
