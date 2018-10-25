/*
 * Bands
 */
import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';

import SimilarBand from 'components/SimilarBand';

import { spotifyTokenSelector } from '../SpotifyCallback/selectors';
import { similarBandsSelector } from '../Bands/selectors';

import { BandsWrapper } from './styled';

class SimilarBands extends React.Component {
  render() {
    const similar = this.props.similar
      .sort((a, b) => {
        return a.name.localeCompare(b.name);
      })
      .map((band, index) => {
        return (
          <SimilarBand
            key={`${band.name}-${band.id || band.mbid}-${index}`}
            name={band.name}
            image={band.image}
            token={this.props.token}
            uri={band.uri}
          />
        );
      });

    return (
      <div>
        <BandsWrapper>{similar}</BandsWrapper>
      </div>
    );
  }
}

SimilarBands.propTypes = {
  similar: PropTypes.array,
  token: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  similar: similarBandsSelector(),
  token: spotifyTokenSelector(),
});

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(SimilarBands);
