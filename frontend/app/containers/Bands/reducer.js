/*
 * Bands reducer
 */
import { fromJS } from 'immutable';

import {
  RESET,
  SET_SIMILAR_BANDS,
  SET_SIMILAR_BANDS_ERROR,
  SET_TOP_BANDS,
  SET_TOP_BANDS_ERROR,
} from './constants';

export const initialState = fromJS({
  error: null,
  similar: [],
  top: [],
});

function bandsReducer(state = initialState, action) {
  switch (action.type) {
    case RESET:
      return initialState;
    case SET_SIMILAR_BANDS:
      return state.set('similar', action.similar);
    case SET_SIMILAR_BANDS_ERROR:
      return state.set('error', 'similar');
    case SET_TOP_BANDS:
      return state.set('top', action.top);
    case SET_TOP_BANDS_ERROR:
      return state.set('error', 'top');
    default:
      return state;
  }
}

export default bandsReducer;
