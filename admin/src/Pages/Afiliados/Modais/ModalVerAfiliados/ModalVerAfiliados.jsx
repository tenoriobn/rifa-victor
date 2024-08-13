import { useRecoilValue } from "recoil";
import { stateAfiliadosInfoModal } from "../../../../common/states/atom";
import styled from "styled-components";

const AfiliadoInfoModalContainer = styled.div`
  width: 100%;
  line-height: 20px;
  margin-bottom: 10px;

  b {
    font-weight: bold;
  }

  p {
    font-size: .9rem;
  }
`;


export default function ModalVerAfiliados() {
  const afiliadosInfo = useRecoilValue(stateAfiliadosInfoModal);
  console.log(afiliadosInfo);
  
  return (
    <AfiliadoInfoModalContainer>
      <label><b>Name</b></label>
      <p>{afiliadosInfo?.name}</p>
    </AfiliadoInfoModalContainer>
  )
}
