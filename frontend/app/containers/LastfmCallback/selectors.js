import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the test state domain
 */
const lastfmSelector = state => state.get('lastfm', initialState);

/**
 * Other specific selectors
 */
const lastfmTokenSelector = () =>
  createSelector(lastfmSelector, substate => substate.get('token'));

export default lastfmSelector;
export { lastfmTokenSelector };
