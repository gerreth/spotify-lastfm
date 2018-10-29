/*
 * Top Band
 */
import React from 'react';
import PropTypes from 'prop-types';

import Band from '../Band';
import { BandWrapper } from './styled';

const TopBand = props => (
  <BandWrapper>
    <Band {...props} />
  </BandWrapper>
);

TopBand.propTypes = {
  image: PropTypes.object,
  name: PropTypes.string,
  token: PropTypes.string,
  uri: PropTypes.string,
};

export default TopBand;
