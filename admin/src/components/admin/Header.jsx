import user from "../../assets/images/user.png";
import { Link } from "react-router-dom";

export default function Header(props) {
  return (
    <header
      className={`fixed top-0 left-0 right-0 z-20 transition-all duration-200 ${
        props.isSidebarActive ? "lg:left-40" : "lg:left-20"
      } `}
    >
      <div className="flex shadow-md items-center justify-between p-3 pt-4 pb-4 bg-white border-customTransparent border-b lg:p-4">
        <i
          onClick={props.toggleSidebar}
          className={`icon-bars text-3xl cursor-pointer hover:text-blue-900 transition-all duration-200 ${
            props.isSidebarActive ? "text-blue-900" : "text-primary"
          }`}
        ></i>

        <Link to="/perfil" className="cursor-pointer block rounded-full w-fit">
          <img
            src={user}
            alt="Imagem de usuário"
            className="rounded-full w-12 h-12 object-cover"
          />
        </Link>
      </div>
    </header>
  );
}
