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
  console.log(dsa);
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
   * @param { JSON } response JSON object to extract id from.
   * @return { string } The gif's ID.
   */
const getUploadedGifId = (response) => {
  const { data: { id } } = response;
  return id;
}

export {
  getTrendingGifsInfo,
  getSingleGifInfo,
  getFavouriteGifInfo,
  getUploadedGifId
}
