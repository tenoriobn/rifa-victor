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
    transition: all .3s ease-in-out;
  }

  .pagination li.active a {
    background-color: #07b353;
    border: 1px solid #07b353;
  }

  .pagination a:hover:not(.active) {
    background-color: #275680;
    border: 1px solid #275680;
  }
`;

export default function PedidosPagination() {
  return (
    <Nav aria-label="Navegação de páginas">
      <ul className="pagination">
        <li className="active">
          <Link href="http://http://localhost:5173/dashboard/pedidos?page=1">1</Link>
        </li>

        <li>
          <Link href="http://http://localhost:5173/dashboard/pedidos?page=2">2</Link>
        </li>

        <li>
          <Link href="http://http://localhost:5173/dashboard/pedidos?page=3">3</Link>
        </li>
      
        <li>
          <Link href="http://http://localhost:5173/dashboard/pedidos?page=4" aria-label="Próxima">
            <span aria-hidden="true">Próxima</span>
          </Link>
        </li>

        <li>
          <Link href="http://http://localhost:5173/dashboard/pedidos?page=4" aria-label="Última">
            <span aria-hidden="true">Última</span>
          </Link>
        </li>
			</ul>
    </Nav>
  )
}
