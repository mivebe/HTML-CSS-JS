/* eslint-disable max-len */
import {
  displayTrendingGifsByClick,
  displaySearchedGifsByClick,
  displayUploadInputByClick,
  uploadGifByClick,
  displayFavouriteGifsByClick,
  displayMyUploadsByClick,
  displaySingleGifByClick,
  favouriteGifByClick
} from './events.js';

import {
  displayTrendingGifs,
  displaySearchedGifs,
  displaySingleGif,
  displayGifsByGivenIds,
  displayRandom
} from './display.js';

import { getUploadedGifId } from './extract-data.js';

import { uploadView } from './views.js'

import { uploadGif } from './requests.js'


$(() => {
  displayTrendingGifs();

  displaySearchedGifsByClick((ev) => {
    ev.preventDefault();
    const searchWord = $('#searchInput');

    displaySearchedGifs(searchWord.val());
    searchWord.val('');
  });

  displayFavouriteGifsByClick((ev) => {
    ev.preventDefault();

    const favouritesString = localStorage.getItem('favourite');
    if (favouritesString === '' || favouritesString === null) {
      displayRandom();
    } else {
      const arrOfId = localStorage.getItem('favourite').split(',');
      displayGifsByGivenIds(arrOfId);
    }
  });

  displayTrendingGifsByClick((ev) => {
    ev.preventDefault();
    displayTrendingGifs();
  });

  displayUploadInputByClick((ev) => {
    ev.preventDefault();
    uploadView($('#main'));
  });

  uploadGifByClick(async () => {
    const gifFormInput = document.getElementById('input-upload').files[0];
    const gifFormData = new FormData();
    gifFormData.append('file', gifFormInput);

    const response = await uploadGif(gifFormData);
    const uploadedGifId = await getUploadedGifId(response);

    let currentUploads = localStorage.getItem('upload');
    if (currentUploads === '' || currentUploads === null) {
      localStorage.setItem('upload', uploadedGifId);
    } else {
      const arrayOfUploads = Array.of(currentUploads);
      const newString = arrayOfUploads.concat(uploadedGifId);
      localStorage.setItem('upload', newString);
    }
  });

  displayMyUploadsByClick((ev) => {
    ev.preventDefault();
    const allUploadedGifsIds = localStorage.getItem('upload');
    if (allUploadedGifsIds === null || allUploadedGifsIds === '') {
      displayRandom();
    } else {
      const arrOfId = localStorage.getItem('upload').split(',');
      displayGifsByGivenIds(arrOfId);
    }
  })

  displaySingleGifByClick((ev) => {
    const gifId = $(ev.target).attr('alt');
    displaySingleGif(gifId);
  });

  favouriteGifByClick(() => {
    const gifId = $('.current-gif').attr('alt');
    let currentFavourites = localStorage.getItem('favourite');

    if (currentFavourites === '' || currentFavourites === null) {
      localStorage.setItem('favourite', gifId);
    } else {
      const arrayOfFavs = currentFavourites.split(',');
      if (arrayOfFavs.includes(gifId)) {
        const result = arrayOfFavs.filter((el) => el !== gifId).join(',');

        localStorage.setItem('favourite', result);
      } else {
        const newString = currentFavourites.concat(',', gifId);
        localStorage.setItem('favourite', newString);
      }
    }
  });
  $(document).on('click', function (ev) {
    const $arrTest = $(ev.target).parentsUntil($('main'));
    //console.log($arrTest);
    const $searchedId = $($arrTest[$arrTest.length - 4]).attr('id');
    const $test = $(ev.target).attr('id');
    const $toRemove = $('#single-gif-info');
    if ($searchedId !== 'single-gif-info' && $test !== 'single-gif-info') {
      // console.log('wrong');
      $toRemove.remove();
      // console.log(test);
    }
  });
});
