/* eslint-disable max-len */
import {
  API_KEY,
  baseURL,
  uploadURL
} from './constants.js';

/**
 * Makes a GET request for variety of information about trending GIFs.
 * @async
 * @function getTrendingGifsByLimit
 * @param {number} [offset=0] Offset used for loading Gifs skipping the first some
 * @return { Promise } Promise object represents the information as JSON.
 */
const getTrendingGifsByLimit = async (offset=0) => {
  const response = await fetch(`${baseURL}trending?api_key=${API_KEY}&offset=${offset}&limit=40`);
  return response.json();
}

/**
 * Makes a GET request for variety of information about GIFs, searched by a keyword.
 * @async
 * @function getSearchedGifsByLimit
 * @param { string } searchValue The keyword.
 * @param {number} [offset=0] Offset used for loading Gifs skipping the first some
 * @return { Promise } Promise object represents the information as JSON.
 */
const getSearchedGifsByLimit = async (searchValue, offset=0) => {
  const response = await fetch(`${baseURL}search?api_key=${API_KEY}&q=${searchValue}&offset=${offset}&limit=40`);

  return response.json();
}

/**
 * Makes a GET request for variety of information about GIFs, searched by an ID.
 * @async
 * @function getGifInfo
 * @param { string } id The GIF's ID.
 * @return { Promise } Promise object represents the information as JSON.
 */
const getGifInfo = async (id) => {
  const response = await fetch(`${baseURL}${id}?api_key=${API_KEY}`);

  return response.json();
}

/**
 * Makes a GET request for variety of information about a random GIF.
 * @async
 * @function getRandomGif
 * @return { Promise } Promise object represents the information as JSON.
 */
const getRandomGif = async () => {
  const response = await fetch(`${baseURL}random?api_key=${API_KEY}`);
  return response.json();
}

/**
 * Makes a POST request for uploading a GIF from user's device.
 * @async
 * @function uploadGif
 * @param { FormData } gifFormData The GIF as FormData.
 * @return { Promise } Promise object represents the response's information as JSON.
 */
const uploadGif = async (gifFormData) => {
  const response = await fetch(`${uploadURL}?api_key=${API_KEY}`, {
    method: 'POST',
    body: gifFormData
  })
  return response.json();
}

export {
  getTrendingGifsByLimit,
  getSearchedGifsByLimit,
  getRandomGif,
  getGifInfo,
  uploadGif
}
