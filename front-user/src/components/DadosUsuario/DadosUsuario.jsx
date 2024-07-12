import { useRecoilValue } from "recoil";
import { estadoUsuario } from "../../common/state/atom";
// import { useNavigate } from "react-router-dom";
// import { useEffect } from "react";
import { motion } from "framer-motion";
import { transicaoAnimada } from "../../common/util/transicaoAnimada";

export default function DadosUsuario() {
  const usuario = useRecoilValue(estadoUsuario);
  // const [finalizarPedido, setFinalizarPedido] = useRecoilState(estadoFinalizarPedido);
  // const navigate = useNavigate()

  // useEffect(() => {
  //   if (finalizarPedido) {
  //     navigate('/checkout');
  //     setFinalizarPedido(false);
  //   }
  // }, [finalizarPedido, setFinalizarPedido, navigate]);

  const animacao = transicaoAnimada();

  return (
    <motion.div className="bg-sky-100 border-sky-300 border-solid border-2 rounded-lg p-2" {...animacao}>
      <h2 className="text-lg font-semibold text-sky-600 mb-2">Usuário</h2>
      <p className="text-sky-600">Nome: {usuario.name} {usuario.surname}</p>
      <p className="text-sky-600">Telefone: {usuario.cellphone}</p>
    </motion.div>
  )
}
