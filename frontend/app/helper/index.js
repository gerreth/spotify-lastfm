export function getHashParam(key) {
  const href = window.location.toString();
  const matches = href.match(new RegExp(`${key}=([^&]*)`));
  return matches ? matches[1] : null;
}
