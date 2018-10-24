import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { theme } from 'theme';

export const HeaderWrapper = styled.div`
  background: #fff;
  border-bottom: solid rgba(0, 0, 0, 0.1) 1px;
  display: flex;
  justify-content: space-between;
  padding: ${2 * theme.baseSize}px ${theme.baseSize}px;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 3;
`;

export const MainNav = styled.div``;
export const SubNav = styled.div``;

export const StyledLink = styled(Link)`
  display: inline-block;
  font-weight: bold;
  line-height: ${4 * theme.baseSize}px;
  padding: 0 ${theme.baseSize}px;
`;
