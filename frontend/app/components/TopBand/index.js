/*
 * Top Band
 */
import React from 'react';
import PropTypes from 'prop-types';

import Band from '../Band';
import { BandWrapper } from './styled';

<<<<<<< Updated upstream
class TopBand extends React.PureComponent {
  render() {
    const { image, name, token, uri } = this.props;

    return (
      <BandWrapper>
        <Band image={image} name={name} token={token} uri={uri} />
      </BandWrapper>
    );
  }
}
=======
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
>>>>>>> Stashed changes

export default TopBand;
