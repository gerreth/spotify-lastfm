/*
 * Similar Band
 */
import React from 'react';
import PropTypes from 'prop-types';

import Band from '../Band';
import { BandWrapper } from './styled';

const SimilarBand = props => (
  <BandWrapper>
    <Band {...props} />
  </BandWrapper>
);

Band.propTypes = {
  image: PropTypes.object,
  name: PropTypes.string,
  token: PropTypes.string,
  uri: PropTypes.string,
};

export default SimilarBand;
