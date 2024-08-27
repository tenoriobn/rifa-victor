/* eslint-disable react-hooks/exhaustive-deps */
import {  useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { estadoErroCadastro, estadoFinalizarPedido, estadoFormularioPreenchido, estadoRenderizaComponenteCadastro, estadoTermosAceito, estadoUsuario, estadoValorCompra, estadoCheckoutId, estadoValorRange, estadoQrCode, estadoProdutos } from "../../common/state/atom";
import useAlternarFormularios from "../../common/state/hooks/FormulariosAcesso/useAlternarFormularios";
import FormulariosAcesso from "./FormulariosAcesso/FormulariosAcesso";
import TermosCondicoes from "./TermosCondicoes/TermosCondicoes";
import SetaEsquerda from "../../assets/Icons/seta.svg?react";
import Verificado from "../../assets/Icons/verificado.svg?react";
import MensagemErro from "../MensagemErro/MensagemErro";
import { transicaoAnimada } from "../../common/util/transicaoAnimada";
import { motion } from 'framer-motion';
import { postDados } from '../../common/http/http';
import { ToastContainer, toast } from 'react-toastify';
import { trackPurchase } from "../../common/util/facebookPixel";

export default function AcessoUsuario() {
  const { id, affiliateId } = useParams();
  const [finalizarPedido, setFinalizarPedido] = useRecoilState(estadoFinalizarPedido);
  const renderizaComponenteCadastro = useRecoilValue(estadoRenderizaComponenteCadastro);
  const [checkoutReq, setCheckoutReq] = useRecoilState(estadoCheckoutId);

  const valorCompra = useRecoilValue(estadoValorCompra);
  const termosAceito = useRecoilValue(estadoTermosAceito);
  const camposPreenchidos = useRecoilValue(estadoFormularioPreenchido);
  const valorRange = useRecoilValue(estadoValorRange); 
  const { voltarParaRifa } = useAlternarFormularios();
  const usuario = useRecoilValue(estadoUsuario);
  const erroCadastro = useRecoilValue(estadoErroCadastro);
  const animacao = transicaoAnimada();
  const navigate = useNavigate();
  const setQrCode = useSetRecoilState(estadoQrCode);
  const produto = useRecoilValue(estadoProdutos);

  useEffect(() => {

  }, [id]);


  console.log('affiliateId', affiliateId)

  useEffect(() => {
    if (usuario?.id && finalizarPedido) {
      const dadosParaEnviar = {
        value: parseFloat(valorCompra.replace(',', '.')),
        client_id: usuario.id,
        qntd_number: produto.rifa_awarded.cotas_double === "sim" ? valorRange * 2 : valorRange,
        rifas_id: id,
        ganho_afiliado: affiliateId,
      };
  
      const enviarDados = async () => {
        try {
          const response = await postDados(`produtos/comprar-rifa/${affiliateId}`, dadosParaEnviar, true);

          setQrCode([
            response.data.qrCode,
            response.data.qrCodeBase64
          ])

          setCheckoutReq(response);
          setFinalizarPedido(false);
        } catch (error) {
          console.error('Erro ao comprar rifa:', error);
          notifyError(error.response.data.msg);

          setFinalizarPedido(false);
        }
      };

      enviarDados();
    }
  }, [usuario, finalizarPedido, valorCompra, valorRange, id, navigate, setFinalizarPedido]);

  useEffect(() => {
    if (checkoutReq.success === true && checkoutReq.data.id) {
      const idCheckout = checkoutReq.data.id;
      const slugCheckout = checkoutReq.data.checkout;
      navigate(`/checkout/${idCheckout}/${slugCheckout}`);
      setCheckoutReq({})

      
      const valorConvertido = parseFloat(valorCompra.replace(',', '.')); 

      trackPurchase(valorConvertido, 'BRL', [id]);
    }
  }, [checkoutReq]);

  const handleClick = () => {
    setFinalizarPedido(true);
  };

  const notifyError = (message) => {
    toast.error(message);
  };


  return (
    <motion.div {...animacao}>
      {erroCadastro && <MensagemErro />}
      <FormulariosAcesso />

      <div className="mb-4 p-2 bg-emerald-100 text-emerald-600 border-emerald-500/40 border border-solid rounded-lg">
        <p>
          Valor do pedido: 
          <span className="font-bold text-lg"> R$&nbsp;{valorCompra}</span>
        </p>
      </div>

      <TermosCondicoes />

      <div className="flex flex-col gap-2 sm:flex-row items-center justify-between">
        <button
          className="relative inline-block group text-white rounded overflow-hidden shadow-transparent shadow-md hover:shadow-black/3 0 bg-red-600"
          onClick={voltarParaRifa}
        >
          <div className="absolute left-0 top-0 bg-red-700 w-0 group-hover:w-full transition-all duration-300 h-1/2"></div>
          <div className="absolute right-0 bottom-0 bg-red-700 w-0 group-hover:w-full transition-all duration-300 h-1/2"></div>
          <div className="relative px-4 py-1 transition-all flex items-center justify-center gap-1">
            <SetaEsquerda className="icon stroke-white fill-white rotate-90" />
            Voltar 
          </div>
        </button>

        <button 
          className="relative inline-block group text-white rounded overflow-hidden shadow-transparent shadow-md hover:shadow-black/3 0 bg-emerald-600 disabled:bg-gray-300"
          disabled={!termosAceito || (renderizaComponenteCadastro && !camposPreenchidos) || (!renderizaComponenteCadastro && (!termosAceito || !usuario))}
          onClick={handleClick}
        >
          {termosAceito && (renderizaComponenteCadastro ? camposPreenchidos : usuario) && (
            <>
              <div className="absolute left-0 top-0 bg-emerald-700 w-0 group-hover:w-full transition-all h-1/2"></div>
              <div className="absolute right-0 bottom-0 bg-emerald-700 w-0 group-hover:w-full transition-all h-1/2"></div>
            </>
          )}
          <div className="relative px-4 py-1 transition-all flex items-center justify-center gap-1">
            Finalizar Pedido 
            <Verificado className="icon" />
          </div>
        </button>
      </div>

      <ToastContainer theme="colored" />
    </motion.div>
  );
}
