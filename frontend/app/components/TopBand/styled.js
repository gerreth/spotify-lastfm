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

  img {
    border: solid rgba(0, 0, 0, 1) 1px;
    height: 100%;
    width: 100%;
  }
`;

export const BandInnerWrapper = styled.div`
  bottom: ${theme.baseSize}px;
  left: ${theme.baseSize}px;
  position: absolute;
  right: ${theme.baseSize}px;
  top: ${theme.baseSize}px;
`;

export const BandName = styled.div`
  background: rgba(255, 255, 255, 1);
  display: inline-block;
  font-size: 0.8em;
  font-weight: bold;
  padding: ${1 * theme.baseSize}px ${2 * theme.baseSize}px;
  position: relative;
`;
