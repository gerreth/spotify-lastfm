/*
 * LastfmCallback
 */
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import { getBands, setToken } from './actions';
import reducer from './reducer';
import bandsReducer from '../Bands/reducer';
import { allBandsSelector } from '../Bands/selectors';

import saga from './saga';

class LastfmCallback extends React.PureComponent {
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
        <p className="loading">Loading {status(this.props.bands)}...</p>
      </div>
    );
  }
}

LastfmCallback.propTypes = {
  setToken: PropTypes.func,
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
  setToken: token => dispatch(setToken(token)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withBandsReducer = injectReducer({ key: 'bands', reducer: bandsReducer });
const withReducer = injectReducer({ key: 'lastfm', reducer });
const withSaga = injectSaga({ key: 'LastfmCallback', saga });

export default compose(
  withReducer,
  withBandsReducer,
  withSaga,
  withConnect,
)(LastfmCallback);
