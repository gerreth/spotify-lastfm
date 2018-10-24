/*
 * SpotifyCallback reducer
 */
import { fromJS } from 'immutable';

import { RESET, SET_TOKEN } from './constants';

export const initialState = fromJS({
  token: null,
});

function spotifyCallbackReducer(state = initialState, action) {
  switch (action.type) {
    case RESET:
      return initialState;
    case SET_TOKEN:
      return state.set('token', action.token);
    default:
      return state;
  }
}

export default spotifyCallbackReducer;
