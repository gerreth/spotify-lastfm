import styled from 'styled-components';

export const BandWrapper = styled.div`
  position: relative;

  :before {
    content: '';
    display: block;
    padding-top: 100%;
  }

  img {
    bottom: 0;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    ${'' /* height: 100%; */} width: 100%;
    z-index: 1;
  }
`;
