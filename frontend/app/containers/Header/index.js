/*
 * Header
 */

import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';

import { HeaderWrapper, StyledLink } from './styled';

import { lastfmTokenSelector } from 'containers/LastfmCallback/selectors';
import { spotifyTokenSelector } from 'containers/SpotifyCallback/selectors';

/* eslint-disable react/prefer-stateless-function */
class Header extends React.PureComponent {
  render() {
    const { lastfm, spotify } = this.props;
    const loggedIn = lastfm !== null || spotify !== null;

    const log = loggedIn ? (
      <StyledLink to="/logout">Logout</StyledLink>
    ) : (
      <StyledLink to="/login">Login</StyledLink>
    );

    const privateLinks = loggedIn ? (
      <React.Fragment>
        <StyledLink to="/bands">Bands</StyledLink>
        <StyledLink to="/similar-bands">Similar Bands</StyledLink>
        <StyledLink to="/discovery">Discovery</StyledLink>
      </React.Fragment>
    ) : null;

    return (
      <HeaderWrapper>
        <div>
          <StyledLink to="/">Home</StyledLink>
          {privateLinks}
        </div>
        <div>{log}</div>
      </HeaderWrapper>
    );
  }
}

Header.propTypes = {
  lastfm: PropTypes.string,
  spotify: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  lastfm: lastfmTokenSelector(),
  spotify: spotifyTokenSelector(),
});

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(Header);
