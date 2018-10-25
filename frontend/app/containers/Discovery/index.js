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
    this.state = { index: 0 };
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

  getBand() {
    const bands = _.shuffle(this.props.similar);
    const band = bands[this.state.index];

    this.play(this.props.token, band.uri);

    return (
      <div
        style={{
          // boxShadow: '1px 1px 3px 0px rgba(0,0,0,.2)',
          position: 'relative',
          width: '600px',
        }}
      >
        <div style={{ padding: '16px 0' }}>
          <p style={{ fontSize: '0.7em', textTransform: 'uppercase' }}>
            This is
          </p>
          <p style={{ fontWeight: 'bold' }}>{band.name}</p>
        </div>
        <BandWrapper>
          <img src={band.image.large.url} />
        </BandWrapper>
        <div
          style={{
            display: 'flex',
            fontWeight: 'bold',
            justifyContent: 'space-between',
            padding: '16px',
          }}
        >
          <span onClick={this.decrement.bind(this)}>{'<'}</span>
          <span onClick={this.increment.bind(this)}>{'>'}</span>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div>
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
