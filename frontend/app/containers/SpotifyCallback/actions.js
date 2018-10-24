import { GET_BANDS, RESET, SET_TOKEN } from './constants';

export function resetSpotifyToken() {
  return {
    type: RESET,
  };
}

export function getBands() {
  return {
    type: GET_BANDS,
  };
}

export function setToken(token) {
  return {
    type: SET_TOKEN,
    token,
  };
}
