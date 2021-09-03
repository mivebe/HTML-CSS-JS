/**
 * @param {any} data dataBase to take data from
 * @returns {Function} get thee reviewes by corect book id
*/
const getReviewsByBookId = (data) => async (id) => {
  const book = await data.getByFrom('id', id, 'books');
  if (!book[0] || book[0].unlisted) {
    return;
  }
  //const reviewsForBook = await data.getByFrom('book_id', id, 'reviews');
  const reviewsForBook = await data.getReviewsWithUsername(id);
  return reviewsForBook;
};
/**
 * @param {any} data dataBase to take data from
 * @returns {Function} create a review for given book
*/
const createBookReview = (data) => async (userId, bookId, text) => {
  const review = await data.getByTwoParams('user_id',
    'book_id',
    userId,
    bookId,
    'reviews');

  if (review.length === 0) {
    const newReview = await data.addRowToReviews(userId, bookId, text);
    const newReviewId = newReview.insertId;
    const final = await data.getByFrom('id', newReviewId, 'reviews');

    return final;
  } else if (review.length > 0) {
    return { msg: 'The review by that person for this book already exist!' };
  } else {
    return { msg: 'Canot create book review' };
  }
};
/**
 * @param {any} data dataBase to take data from
 * @returns {Function} update the books review
*/
const updateBookReview = (data) => async (userId, bookId, text) => {
  const bookReview = await data.getByTwoParams(
    'user_id',
    'book_id',
    userId,
    bookId,
    'reviews',
  );
  if (!bookReview) {
    return { msg: 'Operation cant be acomplished!' };
  } else if (bookReview.length === 0) {
    return { msg: 'The review is not found!' };
  } else {
    const idOfBookReview = bookReview[0].id;
    data.updateRowForText('reviews', 'text', text, idOfBookReview);
    const updatedReview = await data.getByTwoParams(
      'user_id',
      'book_id',
      userId,
      bookId,
      'reviews',
    );

    return updatedReview[0];
  }
};
/**
 * @param {any} data dataBase to take data from
 * @returns {Function} delete books review
*/
const deleteBookReview = (data) => async (userId, bookId) => {
  const reviewToDelete = await data.getByTwoParams(
    'user_id',
    'book_id',
    userId,
    bookId,
    'reviews',
  );
  if (!reviewToDelete) {
    return { msg: 'Operation cant be acomplished!' };
  } else if (reviewToDelete.length === 0) {
    return { msg: 'The review is not found!' };
  } else {
    const idOfBookReview = reviewToDelete[0].id;
    await data.deleteRow('reviews', idOfBookReview);
    return reviewToDelete[0];
  }
};


export default {
  getReviewsByBookId,
  createBookReview,
  updateBookReview,
  deleteBookReview,
};
