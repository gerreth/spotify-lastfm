import { injectGlobal } from 'styled-components';

/* eslint no-unused-expressions: 0 */
injectGlobal`
  html,
  body {
    height: 100%;
    width: 100%;
  }

  * {
    margin: 0;
    padding: 0;
  }

  h1, h2, h3, h4, h5, h6 {
    font-size: 16px;
    font-weight: 500;
    margin: 0;
  }

  a {
    color: #111;
    text-decoration: none;
  }
`;
