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

import {
  gifView,
  singleGifView
} from './views.js';


/**
 * Displays trending GIFs.
 * @return { * } displayed GIFs.
 */
const displayTrendingGifs = async () => {
  const jsonTrendingGifs = await getTrendingGifsByLimit();
  const arrayOfTrendingGifsURL = getTrendingGifsInfo(jsonTrendingGifs);

  const $div = $('#main');
  $div.empty();

  return arrayOfTrendingGifsURL.forEach((el) => gifView(el[0], el[1], $div));
}
/**
 * Displays the searched GIFs by a keyword.
 * @param { string } searchValue The keyword.
 * @return { * } displayed GIFs.
 */
const displaySearchedGifs = async (searchValue) => {
  const jsonSearchedGifs = await getSearchedGifsByLimit(searchValue);
  const arrayOfSearchedGifsURL = getTrendingGifsInfo(jsonSearchedGifs);

  const $div = $('#main');
  $div.empty();

  return arrayOfSearchedGifsURL.forEach((el) => gifView(el[0], el[1], $div));
}

/**
 * Displays a single GIF by its ID.
 * @param { string } searchValue The GIF's ID.
 * @return { * } displayed GIFs.
 */
const displaySingleGif = async (searchValue) => {
  const jsonSingleGif = await getGifInfo(searchValue);
  const singleGif = getSingleGifInfo(jsonSingleGif);

  const $div = $('#main');
  // $div.empty();
  return singleGifView(singleGif[0], singleGif[1], singleGif[2], singleGif[3], singleGif[4], $div)
}

/**
 * Displays GIFs by a given array of ID.
 * @param { array } arrayOfIds The GIF's ID.
 * @return { * } displayed GIFs.
 */
const displayGifsByGivenIds = async (arrayOfIds) => {
  const arrayOfpromises=[];
  for (let i = 0; i < arrayOfIds.length; i++) {
    const testing =await getGifInfo(arrayOfIds[i])
    arrayOfpromises.push(testing);
  }
  const $div = $('#main');
  $div.empty();

  const singleGif = arrayOfpromises.map((el)=>getFavouriteGifInfo(el));

  return singleGif.forEach((el)=>gifView(el[0], el[1], $div));
}

/**
 * Displays a random GIF.
 * @return { * } displayed GIFs.
 */
const displayRandom = async () => {
  // const $div = $('#main');
  // $div.empty();
  const $div=$('#main');
  $div.empty();
  $div.append('<h1 id="random-gif-text">Random Gif');
  const randomGif= await getRandomGif();
  const randomGifUrl= getSingleGifInfo(randomGif);
  return gifView(randomGifUrl[0], randomGifUrl[1], $div);
  // return singleGifView(randomGifUrl[0], randomGifUrl[1], randomGifUrl[2], randomGifUrl[3], randomGifUrl[4], $div);
}


export {
  displayTrendingGifs,
  displaySearchedGifs,
  displaySingleGif,
  displayGifsByGivenIds,
  displayRandom
};
