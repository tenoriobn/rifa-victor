import { useRecoilValue } from "recoil";
import { stateAfiliadosInfoModal } from "../../../../common/states/atom";

export default function ModalVerAfiliados() {
  const afiliadosInfo = useRecoilValue(stateAfiliadosInfoModal);
  console.log(afiliadosInfo);
  
  return (
    <div>ModalVerAfiliados</div>
  )
}
