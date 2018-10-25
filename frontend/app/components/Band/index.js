/*
 * Band
 */
import React from 'react';
import ProgressiveImage from 'react-progressive-image';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { BandInnerWrapper, BandName } from './styled';

const Band = props => {
  const play = () => {
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

    fetch(url, options);
  };

  const { image, name, uri } = props;

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

Band.propTypes = {
  image: PropTypes.object,
  name: PropTypes.string,
  token: PropTypes.string,
  uri: PropTypes.string,
};

export default Band;
