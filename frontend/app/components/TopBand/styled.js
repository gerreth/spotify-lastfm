import styled from 'styled-components';

import { theme } from 'theme';

export const BandWrapper = styled.div`
  padding: ${2 * theme.baseSize}px;
  position: relative;
  width: 25%;

  @media screen and (min-width: 1366px) {
    width: 20%;
  }

  :before {
    content: '';
    display: block;
    padding-top: 100%;
  }
`;
