/*
 * Similar Band
 */
import React from 'react';

import { BandWrapper, BandInnerWrapper, BandName } from './styled';

class SimilarBand extends React.PureComponent {
  render() {
    const { image, name } = this.props;
    const background = {
      // background: `url(${image.url})`,
      backgroundSize: 'cover',
    };
    return (
      <BandWrapper>
        <BandInnerWrapper style={background}>
          <BandName>{name}</BandName>
        </BandInnerWrapper>
      </BandWrapper>
    );
  }
}

export default SimilarBand;
