/* eslint-disable max-len */
/**
 * Binds an event handler to element with id "trend".
 * @param { function } callback Function describing what should be done when the target is clicked.
 * @return { event } An event, binded to the target.
 */
const displayTrendingGifsByClick = (callback) => $(document).on('click', '#trend', callback);

/**
 * Binds an event handler to element with id "submit-gif".
 * @param { function } callback Function describing what should be done when the target is clicked.
 * @return { event } An event, binded to the target.
 */
const displaySearchedGifsByClick = (callback) => $(document).on('submit', '#submit-gif', callback);

/**
 * Binds an event handler to element with class "displayed-gif".
 * @param { function } callback Function describing what should be done when the target is clicked.
 * @return { event } An event, binded to the target.
 */
const displaySingleGifByClick = (callback) => $(document).on('click', '.displayed-gif', callback);

/**
 * Binds an event handler to element with class "favourite-button".
 * @param { function } callback Function describing what should be done when the target is clicked.
 * @return { event } An event, binded to the target.
 */
const favouriteGifByClick = (callback) => $(document).on('click', '.favourite-button', callback);

/**
 * Binds an event handler to element with id "my-favourites".
 * @param { function } callback Function describing what should be done when the target is clicked.
 * @return { event } An event, binded to the target.
 */
const displayFavouriteGifsByClick = (callback) => $(document).on('click', '#my-favourites', callback);

/**
 * Binds an event handler to element with id "upload".
 * @param { function } callback Function describing what should be done when the target is clicked.
 * @return { event } An event, binded to the target.
 */
const displayUploadInputByClick = (callback) => $(document).on('click', '#upload', callback);
/**
 * Binds an event handler to element with id "upload-gif-button".
 * @param { function } callback Function describing what should be done when the target is clicked.
 * @return { event } An event, binded to the target.
 */
const uploadGifByClick = (callback) => $(document).on('click', '#upload-gif-button', callback);
/**
 * Binds an event handler to element with id "my-uploads".
 * @param { function } callback Function describing what should be done when the target is clicked.
 * @return { event } An event, binded to the target.
 */
const displayMyUploadsByClick = (callback) => $(document).on('click', '#my-uploads', callback);


export {
  displayTrendingGifsByClick,
  displaySearchedGifsByClick,
  displaySingleGifByClick,
  favouriteGifByClick,
  displayFavouriteGifsByClick,
  displayUploadInputByClick,
  uploadGifByClick,
  displayMyUploadsByClick,
};
