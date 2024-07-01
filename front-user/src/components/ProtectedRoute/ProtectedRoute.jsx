/* eslint-disable react/prop-types */
import { useRecoilValue } from "recoil";
import { estadoUsuario } from "../../common/state/atom";
import Acesso from "../../pages/Acesso/Acesso";

export default function ProtectedRoute({ element }) {
  const usuario = useRecoilValue(estadoUsuario);

  return usuario ? element : <Acesso />;
}
