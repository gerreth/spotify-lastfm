/*
 * Bands
 */
import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import _ from 'lodash';

import Band from './Band';

import { spotifyTokenSelector } from '../SpotifyCallback/selectors';
import { similarBandsSelector } from '../Bands/selectors';
import { BandWrapper } from './styled';

class Discovery extends React.Component {
  constructor(props) {
    super(props);
    const bands = _.shuffle(props.similar);
    this.state = { index: 0, bands };
  }

  increment() {
    const { index } = this.state;
    this.setState({ index: index + 1 });
  }

  decrement() {
    const { index } = this.state;
    this.setState({ index: index > 0 ? index - 1 : 0 });
  }

  play(token, uri) {
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
        'content-type': 'application/json',
      },
      json: true,
      method: 'PUT',
      body: JSON.stringify({ context_uri: uri }),
    };

    const url = 'https://api.spotify.com/v1/me/player/play';

    fetch(url, options);
  }

  next(token) {
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
        'content-type': 'application/json',
      },
      json: true,
      method: 'POST',
    };

    const url = 'https://api.spotify.com/v1/me/player/next';

    fetch(url, options);
  }

  getBand() {
    const { id, image, name, uri } = this.state.bands[this.state.index];

    const options = {
      headers: {
        Authorization: `Bearer ${this.props.token}`,
        'content-type': 'application/json',
      },
      json: true,
      method: 'PUT',
      body: JSON.stringify({ context_uri: uri }),
    };

    const url = 'https://api.spotify.com/v1/me/player/play';

    fetch(url, options);

    return (
      <Band
        id={id}
        image={image}
        name={name}
        uri={uri}
        token={this.props.token}
        next={this.increment.bind(this)}
        previous={this.decrement.bind(this)}
      />
    );
  }

  render() {
    const DiscoveryWrapper = { padding: '8px' };

    return (
      <div style={DiscoveryWrapper}>
        <BandWrapper>{this.getBand()}</BandWrapper>
      </div>
    );
  }
}

Discovery.propTypes = {
  similar: PropTypes.arrayOf(PropTypes.string),
  token: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  similar: similarBandsSelector(),
  token: spotifyTokenSelector(),
});

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(Discovery);
