/*
 * Bands
 */
import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';

import TopBand from 'components/TopBand';
import SimilarBand from 'components/SimilarBand';

import { spotifyTokenSelector } from '../SpotifyCallback/selectors';

import { allBandsSelector } from './selectors';
import { BandsWrapper } from './styled';

class Bands extends React.Component {
  render() {
    const top = this.props.bands.top.map((band, index) => {
      return (
        <TopBand
          key={`${band.name}-${band.id || band.mbid}-${index}`}
          name={band.name}
          image={band.image}
          token={this.props.token}
          uri={band.uri}
        />
      );
    });

    const similar = this.props.bands.similar
      .sort((a, b) => {
        return a.name.localeCompare(b.name);
      })
      .map((band, index) => {
        console.log(band.image);
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
        <BandsWrapper>{top}</BandsWrapper>
        <BandsWrapper>{similar}</BandsWrapper>
      </div>
    );
  }
}

Bands.propTypes = {
  bands: PropTypes.shape({
    similar: PropTypes.array,
    top: PropTypes.array,
  }),
  token: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  bands: allBandsSelector(),
  token: spotifyTokenSelector(),
});

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(Bands);
