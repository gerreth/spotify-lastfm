/*
 * Bands
 */
import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import _ from 'lodash';

import Image from 'components/Image';

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
        Authorization: 'Bearer ' + token,
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
        Authorization: 'Bearer ' + token,
        'content-type': 'application/json',
      },
      json: true,
      method: 'POST',
    };

    const url = 'https://api.spotify.com/v1/me/player/next';

    fetch(url, options);
  }

  getBand() {
    const band = this.state.bands[this.state.index];

    this.play(this.props.token, band.uri);

    return (
      <div
        style={{
          // boxShadow: '1px 1px 3px 0px rgba(0,0,0,.2)',
          border: 'solid rgba(0, 0, 0, 0.1) 1px',
          margin: '0 auto',
          width: '500px',
        }}
      >
        <div style={{ padding: '16px 0' }}>
          <p style={{ fontSize: '0.7em', textTransform: 'uppercase' }}>
            This is
          </p>
          <p style={{ fontWeight: 'bold' }}>{band.name}</p>
        </div>
        <BandWrapper
          onClick={() => {
            this.next(this.props.token);
          }}
        >
          <img src={band.image.large.url} />
          <div
            style={{
              bottom: '0px',
              display: 'flex',
              fontWeight: 'bold',
              justifyContent: 'space-between',
              left: '0px',
              padding: '16px',
              position: 'absolute',
              right: '0px',
              zIndex: 3,
            }}
          >
            <span
              style={{ background: '#fff', padding: '8px 16px' }}
              onClick={this.decrement.bind(this)}
            >
              {'<'}
            </span>
            <span
              style={{ background: '#fff', padding: '8px 16px' }}
              onClick={this.increment.bind(this)}
            >
              {'>'}
            </span>
          </div>
        </BandWrapper>
      </div>
    );
  }

  render() {
    return (
      <div style={{ padding: '8px' }}>
        <div style={{ textAlign: 'center' }}>{this.getBand()}</div>
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
