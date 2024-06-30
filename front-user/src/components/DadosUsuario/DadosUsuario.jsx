import { useRecoilState, useRecoilValue } from "recoil";
import { estadoFinalizarPedido, estadoUsuario } from "../../common/state/atom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function DadosUsuario() {
  const usuario = useRecoilValue(estadoUsuario);
  const [finalizarPedido, setFinalizarPedido] = useRecoilState(estadoFinalizarPedido);
  const navigate = useNavigate()

  useEffect(() => {
    if (finalizarPedido) {
      navigate('/checkout');
      setFinalizarPedido(false);
    }
  }, [finalizarPedido, setFinalizarPedido, navigate])

  return (
    <div className="bg-sky-100 border-sky-300 border-solid border-2 rounded-lg p-2">
      <h2 className="text-lg font-semibold text-sky-600 mb-2">Usuário</h2>
      <p className="text-sky-600">Nome: {usuario.name} {usuario.surname}</p>
      <p className="text-sky-600">Telefone: {usuario.cellphone}</p>
    </div>
  )
}
