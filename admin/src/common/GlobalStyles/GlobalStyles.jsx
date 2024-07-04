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
  }
`;

export default GlobalStyles;