import styled from 'styled-components';

import { theme } from 'theme';

export const BandInnerWrapper = styled.div`
  bottom: ${theme.baseSize}px;
  left: ${theme.baseSize}px;
  position: absolute;
  right: ${theme.baseSize}px;
  top: ${theme.baseSize}px;

  img {
    bottom: 0;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    width: 100%;
    z-index: 1;
  }
`;

export const BandName = styled.div`
  background: rgba(255, 255, 255, 1);
  display: inline-block;
  font-size: 0.8em;
  font-weight: bold;
  padding: ${1 * theme.baseSize}px ${2 * theme.baseSize}px;
  position: relative;
  z-index: 2;
`;
