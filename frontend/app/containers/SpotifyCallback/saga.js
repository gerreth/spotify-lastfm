import { call, put, select, takeLatest } from 'redux-saga/effects';
import { push } from 'react-router-redux';
// project imports
import { getHashParam } from 'helper';

import {
  setSimilarBands,
  setSimilarBandsError,
  setTopBands,
  setTopBandsError,
} from '../Bands/actions';
import { topBandsIdSelector } from '../Bands/selectors';
// local imports
import { setToken } from './actions';
import { GET_BANDS } from './constants';

function* getBands() {
  let similarBands;
  let topBands;

  const token = getHashParam('access_token');
  yield put(setToken(token));

  try {
    topBands = yield call(makeRequest, 'top-bands', { token });
    yield put(setTopBands(topBands));
  } catch (error) {
    yield put(setTopBandsError());
  }

  const ids = yield select(topBandsIdSelector());

  try {
    similarBands = yield call(makeRequest, 'similar-bands', { token, ids });
    yield put(setSimilarBands(similarBands));
  } catch (error) {
    yield put(setSimilarBandsError());
  }

  yield put(push('/bands'));
}

function* saga() {
  yield takeLatest(GET_BANDS, getBands);
}

export default saga;

/**
 *  Requests
 */
const makeRequest = async (endpoint, data) => {
  const baseUrl = 'http://localhost:1001';
  const source = 'spotify';

  const options = {
    headers: { 'Content-Type': 'application/json' },
    json: true,
    method: 'POST',
    body: JSON.stringify(data),
  };

  const url = `${baseUrl}/${source}/${endpoint}`;

  const response = await fetch(url, options);

  if (response.status !== 200) {
    throw response;
  }

  return response.json();
};
