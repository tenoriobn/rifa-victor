import { Link } from "react-router-dom";
import { useSetRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { stateOpenModalAcoesSorteio, stateIdModalAcoesSorteio } from "../../../common/states/atom";

const StyledLink = styled(Link)`
  color: white;
  border: none;
  border-radius: .3125rem;
  padding: .625rem .9375rem;
  cursor: pointer;
  margin-bottom: .625rem;
  max-width: 170px;
  width: 100%;
  box-sizing: border-box;
  transition: all .3s ease-in-out;

  &:hover {
    opacity: .8;
  }

  &.button-edit {
    background-color: #f4b400;
  }

  &.button-view {
    background-color: #4e73df;
  }

  &.button-activate {
    background-color: #28a745;
  }

  &.button-export {
    background-color: #36b9cc;
  }

  &.button-upsell {
    background-color: #FF7F50;
  }

  &.button-search {
    background-color: #858796;
  }

  &.button-prizedraw {
    background-color: #3F51B5;
  }

  &.button-godson {
    background-color: #3d546f;
  }
`;

const linksData = [
  {
    id: "btn_edit",
    className: "button-edit",
    to: "/dashboard/rifas/editar/",
    iconClass: "fas fa-edit",
    text: "Editar"
  },
  {
    id: "btn_images",
    className: "button-view",
    to: "/dashboard/rifas/imagens/",
    iconClass: "fa-solid fa-image",
    text: "Imagens"
  },
  {
    id: "btn_cotas",
    className: "button-activate",
    to: "/dashboard/rifas/cotas/",
    iconClass: "fa-solid fa-list-ol",
    text: "Cotas"
  },
  {
    id: "btn_paks",
    className: "button-export",
    to: "/dashboard/rifas/packs/",
    iconClass: "fa-solid fa-box-open",
    text: "Pacotes"
  },
  {
    id: "btn_upsell",
    className: "button-upsell",
    to: "/dashboard/rifas/upsell/",
    iconClass: "fa-solid fa-arrow-up-1-9",
    text: "Upsell"
  },
  {
    id: "btn_consulta",
    className: "button-search",
    to: "/dashboard/consultaCota/",
    iconClass: "fa-brands fa-searchengin",
    text: "Consulta Cota"
  },
  {
    id: "btn_sorteio",
    className: "button-prizedraw",
    to: "/dashboard/sorteio/",
    iconClass: "fas fa-gift",
    text: "Sorteio"
  },
  {
    id: "btn_afiliados",
    className: "button-godson",
    to: "/dashboard/afiliados",
    iconClass: "ion-icon name='accessibility-sharp' role='img' class='md hydrated'",
    text: "Afiliados"
  }
];

export default function AcoesSorteioModal() {
  const setOpenModalAcoesSorteio = useSetRecoilState(stateOpenModalAcoesSorteio);
  const idModalAcoesSorteio = useRecoilValue(stateIdModalAcoesSorteio);

  return (
    <>
      {linksData.map(link => (
        <StyledLink
          key={link.id}
          id={link.id}
          className={link.className}
          to={link.id === "btn_afiliados" ? link.to : `${link.to}${idModalAcoesSorteio}`}
          onClick={() => setOpenModalAcoesSorteio(false)}
        >
          <i className={link.iconClass}></i> {link.text}
        </StyledLink>
      ))}
    </>
  );
}
