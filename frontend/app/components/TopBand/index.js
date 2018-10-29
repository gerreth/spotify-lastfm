/*
 * Top Band
 */
import React from 'react';
import PropTypes from 'prop-types';

import Band from '../Band';
import { BandWrapper } from './styled';

<<<<<<< HEAD
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
=======
class TopBand extends React.PureComponent {
  render() {
    return (
      <BandWrapper>
        <Band {...this.props} />
      </BandWrapper>
    );
  }
}
>>>>>>> b5b943e9c334e2d0460eaa2db758860e4c482839

export default TopBand;
