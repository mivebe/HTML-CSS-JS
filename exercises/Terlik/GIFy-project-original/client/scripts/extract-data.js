/* eslint-disable max-len */
/**
 * Returns an array of information of the GIFs.
 * @param { JSON } response JSON object to extract the URLs from.
 * @return { array } Array of URLs of GIFs with fixed height and GIFs' IDs.
 */
const getTrendingGifsInfo = (response) => {
  const { data } = response;
  return data.map((el) => [el.images.fixed_height_downsampled.url, el.id]);
}

/**
 * Returns an array with information about a singe GIF.
 * @param { JSON } response JSON object to extract the information from.
 * @return { array } Array, which contains original URL of the GIF, the usernames,
 * who uploaded the GIF, the title of the GIF and the URL of the GIF.
 */
const getSingleGifInfo = (response) => {
  const { data } = response;

  return [data.images.original.url, data.id, data.username, data.title, data.url]
}

/**
 * Returns an array with information about the favourited GIF.
 * @param { JSON } response JSON object to extract the information from.
 * @return { array } Array, which contains the URL of the GIF with fixed height and the ID of the GIF.
 */
const getFavouriteGifInfo = (response) => {
  const { data } = response;

  return [data.images.fixed_height_downsampled.url, data.id]
}

/**
 * Returns the GIF's ID.
 * @param { JSON } response JSON object to extract ID from.
 * @return { string } The gif's ID.
 */
const getUploadedGifId = (response) => {
  const { data: { id } } = response;
  return id;
}

/**
 * Returns the value of the given container by its attribute.
 * @param { JQuery } container The container, from which to extract the value.
 * @param { string } attr The attribute's name.
 * @return { string } The extracted value.
 */
const getValueByAttr = (container, attr) => {
  const value = container.attr(attr);
  return value;
}

/**
 * Creates FormData from a <input> element with type "file".
 * @param { JQuery } container The jQuery object of <input> element with type "file".
 * @return { FormData } The created FormData.
 */
const createFormData = (container) => {
  const gifFormInput = container[0].files[0];
  const gifFormData = new FormData();
  gifFormData.append('file', gifFormInput);

  return gifFormData;
}

/**
 * Returns the value of the given key, saved in localStorage.
 * @param { string } key The key's name.
 * @return { string } The extracted value.
 */
const getItemFromLocalStorageByKey = (key) => {
  return localStorage.getItem(key);
}

/**
 * Returns the value of the given container.
 * @param { JQuery } container The jQuery container.
 * @return { FormData } The value of the container.
 */
const getContainerValue = (container) => {
  return container.val();
}

export {
  getTrendingGifsInfo,
  getSingleGifInfo,
  getFavouriteGifInfo,
  getUploadedGifId,
  getValueByAttr,
  createFormData,
  getItemFromLocalStorageByKey,
  getContainerValue
}
