/* eslint-disable max-len */
import {
  getTrendingGifsByLimit,
  getSearchedGifsByLimit,
  getGifInfo,
  getRandomGif,
} from './requests.js';

import {
  getTrendingGifsInfo,
  getSingleGifInfo,
  getFavouriteGifInfo,
} from './extract-data.js'

import { $mainDiv } from './constants.js'

import {
  gifView,
  singleGifView
} from './views.js';

/**
 * Displays trending GIFs.
 * @async
 * @function displayTrendingGifs
 * @param {number} [offset = 0] Offset used for loading Gifs skipping the first some.
 * @return { void } Displayed GIFs.
 */
const displayTrendingGifs = async (offset=0) => {
  localStorage.setItem('currentTab', 'trending')
  const jsonTrendingGifs = await getTrendingGifsByLimit(offset);
  const arrayOfTrendingGifsURL = getTrendingGifsInfo(jsonTrendingGifs);

  return arrayOfTrendingGifsURL.forEach((el) => gifView(el[0], el[1], $mainDiv));
}
/**
 * Displays the searched GIFs by a keyword.
 * @async
 * @function displaySearchedGifs
 * @param { string } searchValue The keyword.
 *  @param {number} [offset = 0] Offset used for loading Gifs skipping the first some
 * @return { void } displayed GIFs.
 */
const displaySearchedGifs = async (searchValue, offset = 0) => {
  localStorage.setItem('currentTab', 'search')
  const jsonSearchedGifs = await getSearchedGifsByLimit(searchValue, offset);
  const arrayOfSearchedGifsURL = getTrendingGifsInfo(jsonSearchedGifs);
  $('#searchInput').val('');

  if (arrayOfSearchedGifsURL.length === 0) {
    toastr.error(`Used keyword: ${searchValue}`, 'No matches!')
  } else {
    toastr.success(`Used keyword: ${searchValue}`, 'We found these cool GIFs!');
  }

  return arrayOfSearchedGifsURL.forEach((el) => gifView(el[0], el[1], $mainDiv));
}

/**
 * Displays a single GIF by its ID.
 * @async
 * @function displaySingleGif
 * @param { string } searchValue The GIF's ID.
 * @return { void } displayed GIFs.
 */
const displaySingleGif = async (searchValue) => {
  const jsonSingleGif = await getGifInfo(searchValue);
  const singleGif = getSingleGifInfo(jsonSingleGif);

  return singleGifView(singleGif[0], singleGif[1], singleGif[2], singleGif[3], singleGif[4], $mainDiv)
}

/**
 * Displays GIFs by a given array of ID.
 * @async
 * @function displayGifsByGivenIds
 * @param { array } arrayOfIds The GIF's ID.
 * @return { void } displayed GIFs.
 */
const displayGifsByGivenIds = async (arrayOfIds) => {
  const arrayOfpromises = [];
  for (let i = 0; i < arrayOfIds.length; i++) {
    const testing = await getGifInfo(arrayOfIds[i])
    arrayOfpromises.push(testing);
  }

  $mainDiv.empty();

  const singleGif = arrayOfpromises.map((el) => getFavouriteGifInfo(el));

  return singleGif.forEach((el) => gifView(el[0], el[1], $mainDiv));
}

/**
 * Displays a random GIF.
 * @async
 * @function displayRandom
 * @return { void } displayed GIFs.
 */
const displayRandom = async () => {
  toastr.warning('Add some GIFs to this section!', 'Whoopsie, nothing to show...');

  $mainDiv.empty();
  $mainDiv.append(`<h1 id="random-gif-text">Here's a random GIF:`);
  const randomGif = await getRandomGif();
  const randomGifUrl = getSingleGifInfo(randomGif);
  return gifView(randomGifUrl[0], randomGifUrl[1], $mainDiv);
}

export {
  displayTrendingGifs,
  displaySearchedGifs,
  displaySingleGif,
  displayGifsByGivenIds,
  displayRandom
};
