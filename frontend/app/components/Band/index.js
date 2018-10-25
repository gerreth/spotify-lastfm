/*
 * Band
 */
import React from 'react';
import ProgressiveImage from 'react-progressive-image';
import { get } from 'lodash';
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

    return (
      <BandInnerWrapper onClick={uri && this.play.bind(this)}>
        <BandName>{name}</BandName>
        <ProgressiveImage
          src={get(image, 'large.url')}
          placeholder={get(image, 'small.url')}
        >
          {src => <img src={src} alt="an image" />}
        </ProgressiveImage>
      </BandInnerWrapper>
    );
  }
}

export default Band;
