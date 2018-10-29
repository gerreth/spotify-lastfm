/*
 * Band
 */
import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';

class Band extends React.Component {
  constructor(props) {
    super(props);
  }

  async request(endpoint) {
    const baseUrl = 'http://localhost:1001';
    const source = 'user';
    const data = { band: { id: this.props.id, name: this.props.name } };

    const options = {
      headers: { 'Content-Type': 'application/json' },
      json: true,
      method: 'POST',
      body: JSON.stringify(data),
    };

    const url = `${baseUrl}/${source}/${endpoint}`;

    const response = await fetch(url, options);

    if (response.status !== 200) {
      throw response;
    }

    return response.json();
  }

  dislike() {
    this.request('dislike');
    this.props.next();
  }

  like() {
    this.request('like');
    this.props.next();
  }

  render() {
    const { image, name } = this.props;

    const BandWrapper = {};

    const BandNameWrapper = {
      fontWeight: 'bold',
      padding: '10px 0',
      textAlign: 'center',
    };

    const BandImageWrapper = {
      background: `url(${get(image, 'large.url')})`,
      backgroundSize: 'cover',
      height: '600px',
      position: 'relative',
      width: '600px',
    };

    const LikeWrapper = {
      display: 'flex',
      justifyContent: 'space-between',
    };

    const Dislike = {
      background: 'rgb(255,255,255)',
      display: 'inline-block',
      lineHeight: '60px',
      textAlign: 'center',
      width: '60px',
    };

    const Like = {
      background: 'rgb(255,255,255)',
      display: 'inline-block',
      lineHeight: '60px',
      textAlign: 'center',
      width: '60px',
    };

    return (
      <div style={BandWrapper}>
        <div style={BandNameWrapper}>{name}</div>
        <div style={BandImageWrapper} />
        <div style={LikeWrapper}>
          <span style={Dislike} onClick={this.props.previous}>
            {'<<'}
          </span>
          <span style={Dislike} onClick={this.dislike.bind(this)}>
            dislike
          </span>
          <span style={Like} onClick={this.like.bind(this)}>
            like
          </span>
          <span style={Like} onClick={this.props.next}>
            {'>>'}
          </span>
        </div>
      </div>
    );
  }
}

Band.propTypes = {
  image: PropTypes.object,
  name: PropTypes.string,
  token: PropTypes.string,
  uri: PropTypes.string,
};

export default Band;
