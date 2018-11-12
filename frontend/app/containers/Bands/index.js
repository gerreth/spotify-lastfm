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

const baseUrl = 'http://localhost:1001';
const source = 'spotify';

const fetchTopBands = async token => {
  const url = `${baseUrl}/${source}/gereeet/top-bands?token=${token}`;
  const settings = { method: 'GET' };

  const response = await makeRequest(url, settings);

  return response;
};

const makeRequest = async (url, settings) => {
  const options = {
    headers: { 'Content-Type': 'application/json' },
    json: true,
    ...settings,
  };

  const response = await fetch(url, options);

  if (response.status !== 200) {
    throw response;
  }

  return response.json();
};

class Bands extends React.Component {
  fetchBands = async () => {
    const { token } = this.props;

    const response = await fetchTopBands(token);
    console.log({ response });
  };

  render() {
    const top = this.props.bands.top.map(band => (
      <TopBand
        key={`${band.name}-${band.id || band.mbid}`}
        name={band.name}
        image={band.image}
        token={this.props.token}
        uri={band.uri}
      />
    ));

    const similar = this.props.bands.similar
      .sort((a, b) => a.name.localeCompare(b.name))
      .map(band => (
        <SimilarBand
          key={`${band.name}-${band.id || band.mbid}`}
          name={band.name}
          image={band.image}
          token={this.props.token}
          uri={band.uri}
        />
      ));

    return (
      <div>
        <div onClick={this.fetchBands}>Fetch</div>
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
