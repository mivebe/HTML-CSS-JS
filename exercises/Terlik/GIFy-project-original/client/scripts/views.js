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
            .addClass('displayed-gif')
            .css('display', 'inline-block')
            .append($('<img>')
                .addClass('current-gif')
                .attr('src', url)
                .attr('alt', id)
            ))
        .append($('<div>')
            .attr('id', 'credentials')
            .append($('<text>').text(title))
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
};

export {
    gifView,
    uploadView,
    singleGifView
};
