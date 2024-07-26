import { createGlobalStyle } from "styled-components";
import Theme from "./Theme/Theme";

const GlobalStyles = createGlobalStyle`
  body {
    padding: 0;
    margin: 0;
    background: ${Theme.colors.bgBody};
    box-sizing: border-box;
    outline: none;
    color: ${Theme.colors.white};
    font-family: ${Theme.font.montserrat};
    min-height: 100vh;
    overflow-x: hidden;

    li {
      list-style-type: none;
    }

    a {
      color: ${Theme.colors.white};
      text-decoration: none;
    }

    button, input, select {
      font-family: ${Theme.font.montserrat};
      outline: none;
    }
    
    select {
      cursor: pointer;
    }
  }

  ::-webkit-scrollbar {
    width: 8px;
    height: 6px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #292727;
    padding: 10px;
    border-radius: 10px;
    transition: all .3s ease-in-out;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #292727;
  }

  ::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0);
    border-radius: 10px;
  }

  ::-moz-scrollbar-thumb:hover {
    background: #070707;
    width: 8px;
  }
`;

export default GlobalStyles;