import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { stateMenuActive } from "../../../common/states/atom";
import links from "./links.json";
import linksConfiguracoes from "./linksConfiguracoes.json";
import linksSuperAdmin from "./linksSuperAdmin.json";
import { removerToken } from "../../../common/http/http";

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
  z-index: 99;

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

  .dropdown > ul {
    display: ${(props) => (props.$submenuActive ? "block" : "none")};
  }

  .menu-config {
    padding-left: 48px;
  }
`;

const MenuSuperAdmin = styled(MenuBody)`
  margin-top: 0px!important;
`;

export default function Sidebar() {
  const [menuActive, setMenuActive] = useRecoilState(stateMenuActive);
  const [submenuActive, setSubmenuActive] = useState(false);
  const [superAdminActive, setSuperAdminActive] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    removerToken();
    navigate('/');
  }

  return (
    <ContainerSidebar $menuActive={menuActive}>
      <span onClick={() => setMenuActive(!menuActive)}>X</span>

      <MenuHeader>
        <button onClick={handleLogout}>
          <i className="fas fa-external-link-alt" aria-hidden="true"></i> Sair
        </button>
        <div>
          <p>Cliente: 27 - Ana</p>
          <p>Site: 27 - Ana Lima Prêmios</p>
          <p className="srv">SRV: 001</p>
        </div>
      </MenuHeader>

      <MenuBody $submenuActive={submenuActive}>
        <ul>
          {links.map((link, index) => (
            <li key={index}>
              <NavLink to={link.href} end onClick={() => setMenuActive(!menuActive)}>
                {link.ionIcon ? (
                  <ion-icon name={link.ionIcon} role="img" className="md hydrated"></ion-icon>
                ) : (
                  <i className={link.iconClass}></i>
                )}{" "}
                {link.text}
              </NavLink>
            </li>
          ))}

          <li className="dropdown">
            <a href="#" onClick={() => setSubmenuActive(!submenuActive)}>
              <i className="fas fa-cogs"></i> CONFIGURAÇÕES
            </a>
            <ul>
              {linksConfiguracoes.map((link, index) => (
                <li key={index}>
                  <NavLink className="menu-config" to={link.href} end onClick={() => setMenuActive(!menuActive)}>
                    <i className={link.iconClass}></i> {link.text}
                  </NavLink>
                </li>
              ))}
            </ul>
          </li>


        </ul>
      </MenuBody>
      
    
        <MenuSuperAdmin className="superadmin">
          <ul>
            <li className="dropdown">
              <a href="#" onClick={() => setSuperAdminActive(!superAdminActive)}>
                <i className="fas fa-cogs"></i> SUPER ADMIN
              </a>
            </li>
              {superAdminActive &&  
                <>
                  {linksSuperAdmin.map((link, index) => (
                    <li key={index}>
                      <NavLink className="menu-config" to={link.href} end onClick={() => setMenuActive(!menuActive)}>
                        <i className={link.iconClass}></i> {link.text}
                      </NavLink>
                    </li>
                  ))}

                </>
              }
          </ul>
        </MenuSuperAdmin>

    </ContainerSidebar>
  );
}
