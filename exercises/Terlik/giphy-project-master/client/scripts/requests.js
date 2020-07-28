/* eslint-disable max-len */
import {
  API_KEY,
  baseURL,
  uploadURL
} from './constants.js';

/**
 * Makes a GET request for variety of information about trending GIFs.
 * @return { Promise } Promise object represents the information as JSON.
 */
const getTrendingGifsByLimit = async () => {
  const response = await fetch(`${baseURL}trending?api_key=${API_KEY}&limit=40`);
  return response.json();
}
/**
 * Makes a GET request for variety of information about GIFs, searched by a keyword.
 * @param { string } searchValue The keyword.
 * @return { Promise } Promise object represents the information as JSON.
 */
const getSearchedGifsByLimit = async (searchValue) => {
  const response = await fetch(`${baseURL}search?api_key=${API_KEY}&q=${searchValue}&limit=40`);

  return response.json();
}
/**
 * Makes a GET request for variety of information about GIFs, searched by an ID.
 * @param { string } id The GIF's ID.
 * @return { Promise } Promise object represents the information as JSON.
 */
const getGifInfo = async (id) => {
  const response = await fetch(`${baseURL}${id}?api_key=${API_KEY}`);

  return response.json();
}
/**
 * Makes a GET request for variety of information about a random GIF.
 * @return { Promise } Promise object represents the information as JSON.
 */
const getRandomGif = async () => {
  const response = await fetch(`${baseURL}random?api_key=${API_KEY}`);
  return response.json();
}
/**
 * Makes a POST request for uploading a GIF from user's device.
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
