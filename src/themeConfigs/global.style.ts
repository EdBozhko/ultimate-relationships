'use client';

import * as styled from 'styled-components';
import { SCREENS, BREAKPOINTS } from './constants/screen.ts';

const GlobalStyle = styled.createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html,
  body,
  header,
  main,
  nav,
  section,
  h1,
  h2,
  h3,
  iframe,
  ul,
  li,
  textarea,
  button,
  input,
  label,
  div,
  span,
  table,
  tr,
  td,
  form {
    margin: 0;
    padding: 0;
    font-weight: normal;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }

  iframe {
    border: none;
  }

  ul,
  li {
    list-style: none;
  }

  textarea {
    font-family: monospace;
    resize: none;
    border: none;
  }

  input {
    border: none;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  a,
  label,
  button {
    cursor: pointer;
  }

  button {
    border: none;
    font: inherit;
    outline: none;
    background-color: transparent;
    box-shadow: none;
  }

  html,
  body,
  #root,
  #__next {
    max-width: 100vw;
    width: 100vw;
    height: 100vh;
    height: calc(var(--vh, 1vh) * 100);
    margin: 0;
    padding: 0;
    overflow: hidden;
    scroll-behavior: smooth;
  }

  html {
    font-size: ${100 / BREAKPOINTS.mobileScreenWidth}vw;

    @media ${SCREENS.tablet} {
      font-size: ${100 / BREAKPOINTS.mobileScreenWidth}vw;
    }

    @media ${SCREENS.fullHd} {
      font-size: ${100 / BREAKPOINTS.fullHdScreenWidth}vw;
    }
  }
`;

export default GlobalStyle;
