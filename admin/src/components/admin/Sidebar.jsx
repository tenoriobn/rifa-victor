import logo2 from "../../assets/images/logo2.png";
import { Link, NavLink } from "react-router-dom";

export default function Sidebar(props) {
  const sidebarAnchorClasses = `border-b border-customTransparent p-2 cursor-pointer flex items-center gap-2 hover:bg-blue-900 hover:text-white transition-all duration-200 ${
    !props.isSidebarActive && "lg:justify-center"
  }`;

  return (
    <aside
      className={`fixed block z-30 top-0 lg:w-20 ${
        props.isSidebarActive
          ? "right-0 lg:right-[initial] lg:w-40"
          : "right-[100vw] lg:right-[initial]"
      } w-screen transition-all duration-200`}
    >
      <div className="bg-blue-950 border-customTransparent border-r pt-8 min-h-screen">
        <div>
          <div className="pr-3 pl-3 pb-10 flex items-center justify-between lg:justify-center">
            <Link to="/rifas" className="w-fit block cursor-pointer">
              <img
                src={logo2}
                alt="Sulkey Logo"
                className={`w-28 transition-all duration-200 ${
                  props.isSidebarActive ? "lg:w-28" : "lg:w-14"
                }`}
              />
            </Link>

            <i
              onClick={props.toggleSidebar}
              className="lg:hidden icon-x text-3xl cursor-pointer text-primary hover:text-secondary transition-all duration-200"
            ></i>
          </div>

          <ul>
            <li>
              <NavLink
                to="/rifas"
                className={({ isActive }) =>
                  isActive
                    ? `bg-blue-900 text-white ${sidebarAnchorClasses}`
                    : `bg-white text-blue-900 ${sidebarAnchorClasses}`
                }
              >
                <i
                  className={`icon-newspaper text-2xl ${
                    !props.isSidebarActive && "lg:text-4xl"
                  }`}
                ></i>
                <mark
                  className={`text-inherit font-medium text-base ${
                    !props.isSidebarActive && "lg:hidden"
                  }`}
                >
                  Rifas
                </mark>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  );
}
