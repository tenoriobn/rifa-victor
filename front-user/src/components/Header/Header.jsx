import { useState } from "react";
import iconSair from "../../../public/assets/images/iconSair.svg";

import { Link, NavLink, useLocation } from "react-router-dom";
import { useConfig } from "../../context/ConfigContext";

export default function Header() {
  const location = useLocation();
  // const config = useConfig();
  const [menuIsActive, setMenuIsActive] = useState(false);

  return (
    <header className=" bg-[#0a0a0a] header-height">
      <div className="pt-4 pb-8 px-4 flex items-center justify-between max-w-[42rem] m-auto">
        <Link to="/" className="cursor-pointer">
          <picture>
            {/* <img
              src={config.logoUrl}
              alt="Logo do aplicativo"
              className="h-7 md:h-10"
            /> */}
          </picture>
        </Link>

        <div className="flex items-center gap-4">
          <NavLink
            to="/meus-numeros"
            className={(navData) =>
              navData.isActive
                ? "text-grayBlue cursor-pointer"
                : "text-white hover:text-grayBlue normal-transition"
            }
          >
            <i className="icon-shopping_cart text-3xl"></i>
          </NavLink>

          <i
            onClick={() => setMenuIsActive(!menuIsActive)}
            className="icon-bars text-white hover:text-grayBlue text-3xl cursor-pointer normal-transition"
          ></i>
          {['/meus-numeros', '/ganhadores'].includes(location.pathname) && localStorage.getItem('phone') && (<button onClick={() => {
            localStorage.removeItem('phone');
            window.location.href = '/';
          }}><img className="cursor-pointer" src={iconSair} alt="" /></button>)}
        </div>

        <Menu menuIsActive={menuIsActive} setMenuIsActive={setMenuIsActive} />
      </div>
    </header>
  );
}

function activeMenu(setMenuIsActive) {
  setMenuIsActive(() => true);
}

function hideMenu(setMenuIsActive) {

  setMenuIsActive(() => false);
}

function Menu(props) {
  const config = useConfig();
  const menuItems = getMenuItems();

  const menuElements = menuItems.map((item) => {
    return (
      <MenuItemElement
        key={item.id}
        sendTo={item.sendTo}
        sendTitle={item.sendTitle}
        icon={item.icon}
      />
    );
  });

  return (
    <div
      className={`z-40 fixed ${
        props.menuIsActive ? "top-0" : "-top-[120vh]"
      } right-0 h-screen left-0 bg-grayBlack flex flex-col justify-between items-center normal-transition`}
    >
      <div className="px-4 pt-4 flex flex-col gap-8 max-w-lg w-full">
        <div className="flex items-center justify-between">
          <Link to="/" className="cursor-pointer">
            <picture>
              <img
                src={config.logoUrl}
                alt="Logo do aplicativo"
                className="h-12"
              />
            </picture>
          </Link>

          <i
            onClick={() => hideMenu(props.setMenuIsActive)}
            className="icon-times-circle-o text-white text-3xl cursor-pointer normal-transition hover:text-grayBlue"
          ></i>
        </div>

        <nav>
          <ul className="flex flex-col">{menuElements}</ul>
        </nav>
      </div>
    </div>
  );
}

function MenuItemElement(props) {
  return (
    <li className="text-white hover:text-grayBlue normal-transition py-4 border-b border-white">
      <NavLink
        onClick={() => hideMenu(props.setMenuIsActive)}
        to={props.sendTo}
        className={(navData) =>
          navData.isActive
            ? "text-grayBlue flex items-center gap-4"
            : "flex items-center gap-4"
        }
      >
        <i className={`${props.icon} text-2xl`}></i>
        <mark className="bg-transparent text-inherit font-normal text-base">
          {props.sendTitle}
        </mark>
      </NavLink>
    </li>
  );
}

function getMenuItems() {
  return [
    {
      id: 8,
      sendTo: "/",
      sendTitle: "Home",
      icon: "icon-trophy",
    },
    {
      id: 7,
      sendTo: "/produtos",
      sendTitle: "Produtos",
      icon: "icon-trophy",
    },
    {
      id: 3,
      sendTo: "/ganhadores",
      sendTitle: "Ganhadores",
      icon: "icon-trophy",
    },
    {
      id: 4,
      sendTo: "/meu-perfil",
      sendTitle: "Meu Perfil",
      icon: "icon-book",
    },
    {
      id: 5,
      sendTo: "/meus-pedidos",
      sendTitle: "Meus Pedidos",
      icon: "icon-book",
    },
    // {
    //   id: 1,
    //   sendTo: "/",
    //   sendTitle: "Sorteios",
    //   icon: "icon-list",
    // },
    // {
    //   id: 2,
    //   sendTo: "/meus-numeros",
    //   sendTitle: "Meus Números",
    //   icon: "icon-list-numbered",
    // },
    // {
    //   id: 6,
    //   sendTo: "/meus-pedidos",
    //   sendTitle: "Termos de Uso",
    //   icon: "icon-book",
    // },
  ];
}
