import { Link } from "react-router-dom";
import styled from "styled-components";
import { useRecoilValue } from "recoil"
import { stateMenuActive } from "../../../common/states/atom";

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

  @media (min-width: 992px) {
    left: 0px;
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

const links = [
  { href: "/", iconClass: "fa-solid fa-gauge", text: "Vendas", active: true },
  { href: "/rifas", iconClass: "fa-solid fa-dice", text: "Sorteios" },
  { href: "/pedidos", iconClass: "fa-solid fa-receipt", text: "Pedidos" },
  { href: "/clientes", iconClass: "fa-solid fa-users", text: "Clientes" },
  { href: "/ranqueamento", iconClass: "fa-solid fa-ranking-star", text: "Ranking" },
  { href: "/ganhadores", iconClass: "fa-solid fa-trophy", text: "Ganhadores" },
  { href: "/afiliados", ionIcon: "accessibility-sharp", text: "Afiliados" },
  { href: "/configuracoes", iconClass: "fas fa-cogs", text: "Configurações" },
];

export default function Sidebar() {
  const menuActive = useRecoilValue(stateMenuActive)

  return (
    <ContainerSidebar $menuActive={menuActive}>
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
              {link.ionIcon ? (
                <Link to={link.href}>
                  <ion-icon name={link.ionIcon} role="img" class="md hydrated"></ion-icon> {link.text}
                </Link>
              ) : (
                <Link to={link.href} className={link.active ? "active" : ""}>
                  <i className={link.iconClass}></i> {link.text}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </MenuBody>
    </ContainerSidebar>
  );
}
