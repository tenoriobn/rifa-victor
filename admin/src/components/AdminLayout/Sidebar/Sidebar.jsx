import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { useRecoilState } from "recoil"
import { stateMenuActive } from "../../../common/states/atom";
import links from "./links.json";

const ContainerSidebar = styled.div`
  background: #20202a;
  box-sizing: border-box;
  box-shadow: 3px 1px 10px -9px #000;
  position: fixed;
  top: 0;
  bottom: 0;
  left: ${(props) => (props.$menuActive ? "0px" : "-304px")};
  padding: .5rem;
  overflow-x: auto;
  transition: .5s;
  width: 300px;

  span {
    float: right;
    padding: 8px;
  }

  @media (min-width: 992px) {
    left: 0px;

    span {
      display: none;
    }
  }
`;

const MenuHeader = styled.div`
  background: #20202a;
  text-align: center;
  line-height: 1.125rem;
  margin-top: 2.5rem;
  padding-bottom: 2.125rem;
  border-bottom: .0625rem solid #100f0f;
  border-bottom-left-radius: .625rem;
  border-bottom-right-radius: .625rem;

  button {
    background: none;
    border: none;
    cursor: pointer;
    color: #f5f5f5;
    font-size: 1rem;
    margin-bottom: 1.5rem;
  }

  .srv {
    font-size: .625rem;
  }
`;

const MenuBody = styled.div`
  margin-top: 2.1875rem;

  ul li a {
    display: block;
    background: #20202a;
    padding: 1rem 1rem 1rem 1.875rem;
    border-top-left-radius: .625rem;
    border-bottom: .125rem solid #2a2b37;
    border-bottom-left-radius: .625rem;
    border-bottom-right-radius: .625rem;
    text-transform: uppercase;
  }

  ul li a:hover {
    background-color: #1f3349;
    border-right: .4375rem solid #275680;
    border: none;
  }

  .active {
    background-color: #428534!important;
    border-right: .4375rem solid #4eac3a!important;
    border: none;
  }
`;

export default function Sidebar() {
  const [menuActive, setMenuActive ]= useRecoilState(stateMenuActive)

  return (
    <ContainerSidebar $menuActive={menuActive}>
      <span onClick={() => setMenuActive(!menuActive)}>X</span>

      <MenuHeader>
        <button>
          <i className="fas fa-external-link-alt" aria-hidden="true"></i> Sair
        </button>
        <div>
          <p>Cliente: 27 - Ana</p>
          <p>Site: 27 - Ana Lima Prêmios</p>
          <p className="srv">SRV: 001</p>
        </div>
      </MenuHeader>

      <MenuBody>
        <ul>
          {links.map((link, index) => (
            <li key={index}>
              <NavLink to={link.href} end onClick={() => setMenuActive(!menuActive)}>
                {link.ionIcon ? (
                  <ion-icon name={link.ionIcon} role="img" class="md hydrated"></ion-icon>
                ) : (
                  <i className={link.iconClass}></i>
                )}{" "}
                {link.text}
              </NavLink>
            </li>
          ))}
        </ul>
      </MenuBody>
    </ContainerSidebar>
  );
}
