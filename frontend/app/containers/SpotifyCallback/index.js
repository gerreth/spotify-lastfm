/*
 * SpotifyCallback
 */
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import Loader from 'react-loader-spinner';
// project imports
import bandsReducer from '../Bands/reducer';
// local import
import { getBands } from './actions';
import reducer from './reducer';
import saga from './saga';
import { allBandsSelector } from '../Bands/selectors';

class SpotifyCallback extends React.Component {
  componentDidMount() {
    this.props.getBands();
  }

  render() {
    const status = bands => {
      if (bands.top.length === 0) return 'top bands';
      if (bands.similar.length === 0) return 'similar bands';
      return 'finished';
    };

    return (
      <div>
        <Loader type="Triangle" color="#333" height="30" width="30" />
        <p className="loading">Loading {status(this.props.bands)}...</p>
      </div>
    );
  }
}

SpotifyCallback.propTypes = {
  getBands: PropTypes.func,
  bands: PropTypes.shape({
    top: PropTypes.array,
    similar: PropTypes.array,
  }),
};

const mapStateToProps = createStructuredSelector({
  bands: allBandsSelector(),
});

const mapDispatchToProps = dispatch => ({
  getBands: () => dispatch(getBands()),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withBandsReducer = injectReducer({ key: 'bands', reducer: bandsReducer });
const withReducer = injectReducer({ key: 'spotify', reducer });
const withSaga = injectSaga({ key: 'SpotifyCallback', saga });

export default compose(
  withReducer,
  withBandsReducer,
  withSaga,
  withConnect,
)(SpotifyCallback);
