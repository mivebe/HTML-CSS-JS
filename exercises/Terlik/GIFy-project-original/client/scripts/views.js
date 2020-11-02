/* eslint-disable max-len */
/**
 * Creates a new <img> element with the specified URL, appended to a new <div> element,
 * which is appended to the specified container.
 * @param {string} url URL of the GIF.
 * @param {string} id Id of the GIF.
 * @param { JQuery } container Container to append the GIF to.
 * @return { JQuery } The appended container.
 */
const gifView = (url, id, container) => {
  const $div = $(container);
  return $div.append($('<div>')
      .addClass('displayed-gif')
      .css('display', 'inline-block')
      .append($('<img>')
          .attr('src', url)
          .attr('alt', id)
      ));
}

/**
 * Creates a new <div> element, appended to the specified container.
 * @param { string } url URL of the GIF.
 * @param { string } id The GIF's ID.
 * @param { string } username The username of the person, who uploaded the GIF.
 * @param { string } title The GIF's title.
 * @param { string } originalUrl URL of the GIF in https://giphy.com/.
 * @param { string } container Container to append the new <div> to.
 * @return { JQuery } The appended container.
 */
const singleGifView = (url, id, username, title, originalUrl, container) => {
  const $div = $(container);
  return $div.append($('<div>')
      .attr('id', 'single-gif-info')
      .append($('<div>')
          .addClass('displayed-gif-no-click')
          .css('display', 'inline-block')
          .append($('<text>').text(title))
          .append($('<img>')
              .addClass('current-gif')
              .attr('src', url)
              .attr('alt', id)
          ))
      .append($('<div>')
          .attr('id', 'credentials')
          .append($('<text>').text(username)))
      .append($('<div>')
          .attr('id', 'fav-and-link')
          .append($('<button>')
              .addClass('favourite-button')
              .text('❤'))
          .append($('<a>')
              .attr('href', originalUrl)
              .attr('target', '_blank')
              .text('Link to Giphy'))))
}

/**
 * Creates a new <div> element, appended to the specified container.
 * @param { JQuery } container Container to append the <div> to.
 * @return { JQuery } The appended container.
 */
const uploadView = (container) => {
  const $div = $(container);
  $div.empty();
  return $div.append(
      $('<div>')
          .attr('id', 'form-upload')
          .append($('<label>').text('Choose your awesome GIF...'))
          .append($('<input>')
              .attr('id', 'input-upload')
              .attr('type', 'file')
          )
          .append($('<button>')
              .attr('id', 'upload-gif-button')
              .text('Upload')
          )
  )
}

/**
 * Removes the container with the given ID if its ID is not equal to the other two IDs.
 * @param { string } id The ID of the container, which would be removed if
 * the condition is true.
 * @param { string } id2 The first ID to check.
 * @param { string } id3 The second ID to check.
 */
const removingView = (id, id2, id3) => {
  const $toRemove = $(`#${id}`);
  if (id2 !== id && id3 !== id) {
    $toRemove.remove();
  }
}

/**
 * Creates a new <div> element, appended to the specified container.
 * @param { JQuery } container Container to append the <div> to.
 * @return { JQuery } The appended container.
 */
const loadingView = (container) => {
  const $div = $(container);
  return $div.append('<div id=loading-container><div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div>')
}

export {
  gifView,
  uploadView,
  singleGifView,
  removingView,
  loadingView
};
