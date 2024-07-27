/* eslint-disable react/prop-types */
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

export default function PedidosPagination({pagination, onPageChange}) {
  if (!pagination) {
    return <div>Carregando...</div>;
  }

  if (!pagination.links) {
    return null;
  }

  return (
    <Nav aria-label="Navegação de páginas">
      <ul className="pagination">
        {pagination.links.map((link, index) => (        
          <li key={index} className={`page-item ${link.active ? 'active' : ''}`}>
            <Link href="http://localhost:5173/dashboard/pedidos?page=1"
              onClick={() => onPageChange(link.url ? new URL(link.url).searchParams.get('page') : 1)}
              className="page-link"
              disabled={!link.url}
            >
            {link.label === '&laquo; Previous' ? 'Anterior' :
              link.label === 'Next &raquo;' ? 'Próximo' :
              link.label}
            </Link>
          </li>
        ))}
			</ul>
    </Nav>
  )
}
