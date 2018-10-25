/*
 * Similar Band
 */
import React from 'react';
import PropTypes from 'prop-types';

import Band from '../Band';
import { BandWrapper } from './styled';

<<<<<<< Updated upstream
class SimilarBand extends React.PureComponent {
  render() {
    return (
      <BandWrapper>
        <Band {...this.props} />
      </BandWrapper>
    );
  }
}
=======
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
>>>>>>> Stashed changes

export default SimilarBand;
