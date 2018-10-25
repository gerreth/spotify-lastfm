/*
 * Band
 */
import React from 'react';
import Image from '../Image';
import { BandInnerWrapper, BandName } from './styled';

class Band extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  async play() {
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

  render() {
    const { image, name, uri } = this.props;
    const background = {
      background: `url(${image && image.large && image.large.url})`,
      backgroundSize: 'cover',
    };

    return (
      <BandInnerWrapper
        onClick={uri && this.play.bind(this)}
        style={background}
      >
        <BandName>{name}</BandName>
        {/* <Image image={image} /> */}
      </BandInnerWrapper>
    );
  }
}

export default Band;
