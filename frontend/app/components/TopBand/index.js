/*
 * Top Band
 */
import React from 'react';

import Band from '../Band';
import { BandWrapper } from './styled';

class TopBand extends React.PureComponent {
  render() {
    return (
      <BandWrapper>
        <Band {...this.props} />
      </BandWrapper>
    );
  }
}

export default TopBand;
