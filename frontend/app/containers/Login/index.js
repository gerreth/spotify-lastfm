/*
 * Login
 */

import React from 'react';
import querystring from 'querystring';

import { StyledButton } from './styled';

/* eslint-disable react/prefer-stateless-function */
export default class Login extends React.Component {
  constructor(props) {
    super(props);

    this.spotifyLogin = this.spotifyLogin.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleKeyPress() {
    return true;
  }

  spotifyLogin() {
    const config = {
      client_id: process.env.SPOTIFY_CLIENT_ID,
      redirect_uri: 'http://localhost:1000/spotify/callback',
      response_type: 'token',
      scope: 'user-read-private user-read-email user-top-read',
      show_dialog: true,
    };

    const url = `https://accounts.spotify.com/authorize?${querystring.stringify(
      config,
    )}`;

    window.location.href = url;
  }

  lastfmLogin() {
    const config = {
      api_key: process.env.LASTFM_API_KEY,
    };

    const url = `http://www.last.fm/api/auth/?${querystring.stringify(config)}`;

    window.location.href = url;
  }

  render() {
    return (
      <div>
        <StyledButton
          onClick={this.spotifyLogin}
          onKeyPress={this.handleKeyPress}
        >
          <p>Log in with spotify</p>
        </StyledButton>
        <StyledButton
          onClick={this.lastfmLogin}
          onKeyPress={this.handleKeyPress}
        >
          <p>Log in with lastfm</p>
        </StyledButton>
      </div>
    );
  }
}
