import { Link } from "react-router-dom";
import styled from "styled-components";

const Nav = styled.nav`
  .pagination {
    display: flex;
    justify-content: center;
    padding: 16px;
  }

  .pagination li {
    display: block;
    margin: 0;
    padding: 5px;
  }

  .pagination li a {
    display: block;
    border: 1px solid #fff;
    border-radius: 4px;
    padding: 5px 10px;
    text-align: center;
  }

  .pagination li.active a {
    background-color: #07b353;
    border: 1px solid #07b353;
  }
`;

export default function UsuariosPaginacao() {
  return (
    <Nav aria-label="Navegação de páginas">
      <ul className="pagination">
        
        <li className="active">
          <Link href="http://127.0.0.1:5173/dashboard/users?page=1">
            1				
          </Link>
        </li>
      </ul>
    </Nav>
  )
}
