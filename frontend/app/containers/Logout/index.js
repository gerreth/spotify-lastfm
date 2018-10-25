/*
 * Logout
 */
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { resetBands } from '../Bands/actions';
import { resetLastfmToken } from '../LastfmCallback/actions';
import { resetSpotifyToken } from '../SpotifyCallback/actions';

/* eslint-disable react/prefer-stateless-function */
class Logout extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.resetBands();
    this.props.resetLastfmToken();
    this.props.resetSpotifyToken();
    this.props.history.push('/login');
  }

  render() {
    return <div>Logout</div>;
  }
}

Logout.propTypes = {
  resetBands: PropTypes.func,
  resetLastfmToken: PropTypes.func,
  resetSpotifyToken: PropTypes.func,
};

const mapDispatchToProps = dispatch => ({
  resetBands: () => dispatch(resetBands()),
  resetLastfmToken: () => dispatch(resetLastfmToken()),
  resetSpotifyToken: () => dispatch(resetSpotifyToken()),
});

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(withConnect)(Logout);
