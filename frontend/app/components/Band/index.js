/*
 * Band
 */
import React from 'react';

import { BandWrapper, BandInnerWrapper, BandName } from './styled';

class Band extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { imageStatus: 'loading' };
  }

  play() {
    const options = {
      headers: {
        Authorization: 'Bearer ' + this.props.token,
        'content-type': 'application/json',
      },
      json: true,
      method: 'PUT',
      body: JSON.stringify({ context_uri: this.props.uri }),
    };

    const url = 'https://api.spotify.com/v1/me/player/play';

    fetch(url, options);
  }

  handleImageLoaded() {
    this.setState({ imageStatus: 'loaded' });
  }

  render() {
    const { image, name, uri } = this.props;

    return (
      <BandInnerWrapper onClick={uri && this.play.bind(this)}>
        <BandName>{name}</BandName>
        <img
          src={image && image.url}
          style={{ opacity: this.state.imageStatus === 'loading' ? 0 : 1 }}
          onLoad={this.handleImageLoaded.bind(this)}
        />
      </BandInnerWrapper>
    );
  }
}

export default Band;
