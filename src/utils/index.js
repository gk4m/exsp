export function getParameterByName(name, url) {
  let newUrl = url;

  if (!newUrl) {
    newUrl = window.location.href;
  }

  // eslint-disable-next-line
  const paramName = name.replace(/[\[\]]/g, '\\$&');

  const regex = new RegExp(`[?&]${paramName}(=([^&#]*)|&|#|$)`);
  const results = regex.exec(newUrl);

  if (!results) return null;
  if (!results[2]) return '';

  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

export const waitFor = ms => new Promise(r => setTimeout(r, ms));

export const asyncForEach = async (array, callback) => {
  for (let index = 0; index < array.length; index++) {
    // eslint-disable-next-line no-await-in-loop
    await callback(array[index], index, array);
  }
};

export const msToMinutes = (millis) => {
  const minutes = Math.floor(millis / 60000);
  const seconds = ((millis % 60000) / 1000).toFixed(0);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};
