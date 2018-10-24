import {
  RESET,
  SET_SIMILAR_BANDS,
  SET_SIMILAR_BANDS_ERROR,
  SET_TOP_BANDS,
  SET_TOP_BANDS_ERROR,
} from './constants';

export function resetBands() {
  return {
    type: RESET,
  };
}

export function setSimilarBands(similar) {
  return {
    type: SET_SIMILAR_BANDS,
    similar,
  };
}

export function setSimilarBandsError() {
  return {
    type: SET_SIMILAR_BANDS_ERROR,
  };
}

export function setTopBands(top) {
  return {
    type: SET_TOP_BANDS,
    top,
  };
}

export function setTopBandsError() {
  return {
    type: SET_TOP_BANDS_ERROR,
  };
}
