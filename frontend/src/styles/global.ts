import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :root {
    --blue-900: #011526;
    --blue-600: #073a59;
    --blue-500: #165f8c;
    --blue-200: #599dd9;
    --blue-50: #a0dbf2;
    --white: #FFFFFF;
    --red-400: #F20505
  }

  @media (max-width: 1080px) {
    html {
      font-size: 93.75%;
    }
  }

  @media (max-width: 720px) {
    html {
      font-size: 87.5%;
    }
  }

  body {
    background: var(--blue-900);
    color: var(--white);
  }

  body, button, select, textarea, input {
    font-family: 'DM Sans', sans-serif;
    font-size: 1rem;
    font-weight: 400;
  }

  button {
    cursor: pointer;
  }
`