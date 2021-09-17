import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  *, *:before, *:after {
    box-sizing: border-box;
  }
  html, body {
    height: 100%;
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: #ffffff;
    color: #000000;
    font-size: 16px;
    margin: 0;
  }
  a {
    text-decoration: none;
    color: #000000;
  }

  .MuiList-root {
    height: 250px;
    overflow: auto;

    /* scrollbar */
    overflow: auto;
    padding-right: 1px;
    scrollbar-width: thin;

    scroll-padding: 100px;

    ::-webkit-scrollbar {
      width: 7px;
      height: 5px;
    }

    ::-webkit-scrollbar-thumb {
      background-color: hsl(196deg 100% 44%);
      border-radius: 25px;
    }

    ::-webkit-scrollbar-track {
      background: transparent;
    }

  }
`;
