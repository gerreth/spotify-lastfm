import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the test state domain
 */
const spotifySelector = state => state.get('spotify', initialState);

/**
 * Other specific selectors
 */
const spotifyTokenSelector = () =>
  createSelector(spotifySelector, substate => substate.get('token'));

export default spotifySelector;
export { spotifyTokenSelector };
