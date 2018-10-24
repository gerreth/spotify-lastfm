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

  img {
    height: 100%;
    width: 100%;
  }
`;

export const BandInnerWrapper = styled.div`
  background: rgba(0, 0, 0, 0.02);
  bottom: ${theme.baseSize}px;
  left: ${theme.baseSize}px;
  position: absolute;
  right: ${theme.baseSize}px;
  top: ${theme.baseSize}px;
`;

export const BandName = styled.div`
  background: rgba(255, 255, 255, 1);
  display: inline-block;
  font-size: 0.7em;
  font-weight: bold;
  padding: ${0.75 * theme.baseSize}px ${1.5 * theme.baseSize}px;
  position: relative;
`;
