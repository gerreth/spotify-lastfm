/*
 * Band
 */
import React from 'react';
<<<<<<< Updated upstream
import Image from '../Image';
import { BandInnerWrapper, BandName } from './styled';

class Band extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { imageStatus: 'loading' };
  }

  async play() {
    console.log('TEST');
=======
import ProgressiveImage from 'react-progressive-image';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { BandInnerWrapper, BandName } from './styled';

const Band = props => {
  const play = () => {
>>>>>>> Stashed changes
    const options = {
      headers: {
        Authorization: `Bearer ${props.token}`,
        'content-type': 'application/json',
      },
      json: true,
      method: 'PUT',
      body: JSON.stringify({ context_uri: props.uri }),
    };

    const url = 'https://api.spotify.com/v1/me/player/play';

<<<<<<< Updated upstream
    const result = fetch(url, options);
    console.log({ result: result });
  }

  handleImageLoaded() {
    this.setState({ imageStatus: 'loaded' });
  }
=======
    fetch(url, options);
  };

  const { image, name, uri } = props;
>>>>>>> Stashed changes

  return (
    <BandInnerWrapper onClick={uri && play.bind(this)}>
      <BandName>{name}</BandName>
      <ProgressiveImage
        src={get(image, 'large.url')}
        placeholder={get(image, 'small.url')}
      >
        {src => <img src={src} alt="Band" />}
      </ProgressiveImage>
    </BandInnerWrapper>
  );
};

<<<<<<< Updated upstream
    return (
      <BandInnerWrapper onClick={uri && this.play.bind(this)}>
        <BandName>{name}</BandName>
        <Image image={image} />
      </BandInnerWrapper>
    );
  }
}
=======
Band.propTypes = {
  image: PropTypes.object,
  name: PropTypes.string,
  token: PropTypes.string,
  uri: PropTypes.string,
};
>>>>>>> Stashed changes

export default Band;
