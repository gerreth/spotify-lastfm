/*
 * Similar Band
 */
import React from 'react';

import Band from '../Band';
import { BandWrapper } from './styled';

class SimilarBand extends React.PureComponent {
  render() {
    return (
      <BandWrapper>
        <Band {...this.props} />
      </BandWrapper>
    );
  }
}

export default SimilarBand;
