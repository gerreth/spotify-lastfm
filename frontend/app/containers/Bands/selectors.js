import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the test state domain
 */
const bandsSelector = state => state.get('bands', initialState).toJS();

/**
 * Other specific selectors
 */
const allBandsSelector = () =>
  createSelector(bandsSelector, substate => {
    return {
      similar: substate.similar,
      top: substate.top,
    };
  });

const topBandsSelector = () =>
  createSelector(bandsSelector, substate => substate.top);

const similarBandsSelector = () =>
  createSelector(bandsSelector, substate => substate.similar);

const topBandsIdSelector = () =>
  createSelector(bandsSelector, substate => {
    const top = substate.top;
    return top.map(band => band.id);
  });

const topBandsNameSelector = () =>
  createSelector(bandsSelector, substate => {
    const top = substate.top;
    return top.map(band => band.name);
  });

export default bandsSelector;
export {
  allBandsSelector,
  similarBandsSelector,
  topBandsSelector,
  topBandsIdSelector,
  topBandsNameSelector,
};
