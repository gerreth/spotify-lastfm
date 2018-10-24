import styled from 'styled-components';

import { theme } from 'theme';

export const BandWrapper = styled.div`
  padding: ${2 * theme.baseSize}px;
  position: relative;
  width: 12.5%;

  @media screen and (min-width: 1366px) {
    width: 10%;
  }

  :before {
    content: '';
    display: block;
    padding-top: 100%;
  }
`;
