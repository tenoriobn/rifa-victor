/* eslint-disable react/prop-types */
import styled from "styled-components"
import Theme from "../../common/GlobalStyles/Theme/Theme";
import { useRecoilState } from "recoil"
import { stateMenuActive } from "../../common/states/atom";
import { Link } from "react-router-dom";

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
    font-size: 1rem;
    font-weight: 600;
    text-transform: uppercase;
  }

  @media (min-width: 768px) {
    h2 {
      font-size: 1.25rem;
    }
  }

  @media (min-width: 992px) {
    padding: 1.25rem;

    h2 {
      font-size: 1.5rem;
    }

    button {
      display: none;
    }
  }
`;

export const LinkItem = styled(Link)`
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 15px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  transition: all .3s ease-in-out;

  &:hover {
    background-color: #0056b3;
  }
`;

export default function Header({ children }) {
  const [menuActive, setMenuActive] = useRecoilState(stateMenuActive)

  return (
    <HeaderContainer>
      <button onClick={() => setMenuActive(!menuActive)}>
        <i className="fa-solid fa-bars"></i>
      </button>

      {children}
    </HeaderContainer>
  )
}
