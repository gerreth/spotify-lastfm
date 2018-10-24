/*
 * Similar Band
 */
import React from 'react';

import Band from '../Band';
import { BandWrapper } from './styled';

class SimilarBand extends React.PureComponent {
  render() {
    const { image, name, token, uri } = this.props;

    return (
      <BandWrapper>
        <Band image={image} name={name} token={token} uri={uri} />
      </BandWrapper>
    );
  }
}

export default SimilarBand;
