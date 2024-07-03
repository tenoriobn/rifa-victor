import styled from "styled-components"
import Theme from "../../common/GlobalStyles/Theme/Theme";
import { useRecoilState } from "recoil"
import { stateMenuActive } from "../../common/states/atom";

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  gap: 1.25rem;
  box-sizing: border-box;
  background-color: ${Theme.colors.bgHeader};
  right: 0;
  height: 70px;
  left: 300px;
  padding: .75rem;
  z-index: 99;

  button {
    cursor: pointer;
    background: transparent;
    padding: 0px;
    border: none;
    
    i {
      color: ${Theme.colors.white};
      font-size: 1.5rem;
    }
  }

  h2 {
    font-size: 1.5rem;
    font-weight: 600;
    text-transform: uppercase;
  }

  @media (min-width: 992px) {
    padding: 1.25rem;

    button {
      display: none;
    }
  }
`;

export default function Header() {
  const [menuActive, setMenuActive] = useRecoilState(stateMenuActive)

  return (
    <HeaderContainer>
      <button onClick={() => setMenuActive(!menuActive)}>
        <i className="fa-solid fa-bars"></i>
      </button>

      <h2><i className="fa-solid fa-gauge"></i> Vendas</h2>
    </HeaderContainer>
  )
}
