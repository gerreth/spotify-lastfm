/*
 * Band
 */
import React from 'react';
import Image from '../Image';
import { BandInnerWrapper, BandName } from './styled';

class Band extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { imageStatus: 'loading' };
  }

  async play() {
    console.log('TEST');
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

    const result = fetch(url, options);
    console.log({ result: result });
  }

  handleImageLoaded() {
    this.setState({ imageStatus: 'loaded' });
  }

  render() {
    const { image, name, uri } = this.props;

    return (
      <BandInnerWrapper onClick={uri && this.play.bind(this)}>
        <BandName>{name}</BandName>
        <Image image={image} />
      </BandInnerWrapper>
    );
  }
}

export default Band;
