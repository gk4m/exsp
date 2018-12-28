export function getParameterByName(name, url) {
  if (!url) {
    url = window.location.href;
  }

  // eslint-disable-next-line
  const paramName = name.replace(/[\[\]]/g, '\\$&');

  const regex = new RegExp(`[?&]${paramName}(=([^&#]*)|&|#|$)`);
  const results = regex.exec(url);

  if (!results) return null;
  if (!results[2]) return '';

  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

export const waitFor = ms => new Promise(r => setTimeout(r, ms));

export const asyncForEach = async (array, callback) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
};
