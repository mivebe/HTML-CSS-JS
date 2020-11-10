/* eslint-disable eqeqeq */
/* eslint-disable max-len */
import {
  uploadView,
  removingView,
  loadingView,
} from './views.js'

import { uploadGif } from './requests.js'

import {
  saveFavouriteGifIdLocalStorageById,
  saveUploadedGifIdToLocalStorage,
  checkValuesInLocalStorageByKey
} from './storage.js'

import {
  $mainDiv
} from './constants.js'

import {
  displayTrendingGifs,
  displaySearchedGifs,
  displaySingleGif
} from './display.js';

import {
  getUploadedGifId,
  getValueByAttr,
  createFormData,
  getContainerValue
} from './extract-data.js';

let TrendingOffset = 40;
let SearchOffset = 40;

/**
 * Displays new 40 GIFs when scrolling down the page.
 * @function scrollingCallback
 */
const scrollingCallback = () => {
  if ($(window).scrollTop() === $(document).height() - $(window).height()) {
    const currentTab = localStorage.getItem('currentTab');
    if (currentTab === 'trending') {
      displayTrendingGifs(TrendingOffset);
      TrendingOffset += 40;
    } else if (currentTab === 'search') {
      const searchWord = localStorage.getItem('searchWord')
      displaySearchedGifs(searchWord, SearchOffset);
      SearchOffset += 40;
    }
  }
}

/**
 * Displays 40 trending GIFs on the page.
 * @function displayTrendingCallback
 * @param { string } ev
 */
const displayTrendingCallback = (ev) => {
  ev.preventDefault();

  $mainDiv.empty();
  TrendingOffset = 40;
  displayTrendingGifs();
}

/**
 * Displays 40 GIFs, searched by a keyword, on the page.
 * @function displayTrendingCallback
 * @param { string } ev
 */
const displaySearchedCallback = (ev) => {
  ev.preventDefault();
  const searchWord = getContainerValue($('#searchInput'));
  if (searchWord.length !== 0) {
    localStorage.setItem('searchWord', searchWord);

    $mainDiv.empty();

    displaySearchedGifs(searchWord);
    SearchOffset = 40;
  } else {
    toastr.error('You must select a keyword first!', 'Attention!')
  }
}

/**
 * Favourites a GIF when doubleclicked on it.
 * @function doubleClickLikeCallback
 */
const doubleClickLikeCallback = () => {
  const gifId = getValueByAttr($('.current-gif'), 'alt');
  saveFavouriteGifIdLocalStorageById(gifId);
}

/**
 * Displays favourited GIFs on the page.
 * @function displayFavouritesCallback
 * @param { string } ev
 */
const displayFavouritesCallback = (ev) => {
  ev.preventDefault();
  localStorage.setItem('currentTab', 'favourite');
  checkValuesInLocalStorageByKey('favourite');
}

/**
 * Displays upload input on the page.
 * @function displayUploadInputCallback
 * @param { string } ev
 */
const displayUploadInputCallback = (ev) => {
  ev.preventDefault();
  localStorage.setItem('currentTab', 'Upload');
  uploadView($mainDiv);
}

/**
 * Displays uploaded GIFs on the page.
 * @function displayUploadInputCallback
 * @param { string } ev
 */
const displayMyUploadsCallback = (ev) => {
  ev.preventDefault();
  localStorage.setItem('currentTab', 'myUpload');
  checkValuesInLocalStorageByKey('upload');
}

/**
 * Closes single GIF preview.
 * @function clickAnywhereToCloseCallback
 * @param { string } ev
 */
const clickAnywhereToCloseCallback = (ev) => {
  const $arrTest = $(ev.target).parentsUntil($('main'));
  const searchedId = getValueByAttr($($arrTest[$arrTest.length - 4]), 'id');
  const test = getValueByAttr($(ev.target), 'id');
  removingView('single-gif-info', searchedId, test);
}

/**
 * Saves a favourited GIF's ID in localStorage.
 * @function favouriteAGifCallback
 */
const favouriteAGifCallback = () => {
  const gifId = getValueByAttr($('.current-gif'), 'alt');
  saveFavouriteGifIdLocalStorageById(gifId);
}

/**
 * Displays a single GIF preview.
 * @function clickAnywhereToCloseCallback
 * @param { string } ev
 */
const displaySingleCallback = (ev) => {
  const gifId = getValueByAttr($(ev.target), 'alt');
  displaySingleGif(gifId);
}

/**
 * Saves the uploaded GIF's ID in localStorage.
 * @async
 * @function clickAnywhereToCloseCallback
 */
const uploadGifCallback = async () => {
  if ($('#input-upload').get(0).files.length !== 0) {
    const gifFormData = createFormData($('#input-upload'));
    loadingView($mainDiv);
    console.log(gifFormData);
    const response = await uploadGif(gifFormData);
    const uploadedGifId = getUploadedGifId(response);

    uploadView($mainDiv);
    toastr.success('Go to MyUploads now...', 'Success!');

    saveUploadedGifIdToLocalStorage(uploadedGifId);
  } else {
    toastr.error('No GIF selected.', 'Oh, nooo!');
  }
}
export {
  displaySingleCallback,
  favouriteAGifCallback,
  uploadGifCallback,
  clickAnywhereToCloseCallback,
  displayMyUploadsCallback,
  displayUploadInputCallback,
  displayFavouritesCallback,
  doubleClickLikeCallback,
  displaySearchedCallback,
  displayTrendingCallback,
  scrollingCallback
};
