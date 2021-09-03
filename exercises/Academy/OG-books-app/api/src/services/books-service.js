/**
 * @param {any} data dataBase to take data from
 * @returns {Function} geting book by its id
*/
const getBookById = (data) => async (id) => await data.getBookFullInfo(id);
// await data.getByFrom('id', id, 'books');
/**
 * @param {any} data dataBase to take data from
 * @returns {Function} get all books
*/
const getAllBooks = (data) => async (filter) => {
  return await data.retrieveAllBooks('books', 'name', filter);
};
/**
 * @param {any} data dataBase to take data from
 * @returns {Function} change the book status to borrowed
*/
const borowABook = (data) => async (userId, bookId) => {
  const registerForBook = await data.getByFrom('book_id',
    bookId,
    'register');
  const log = await data.getByTwoParams('user_id',
    'book_id',
    userId,
    bookId,
    'log');

  if (log.length === 0) {
    await data.addRowToLog(userId, bookId);
  }
  if (registerForBook.length === 0) {
    await data.updateRow('books', 'isBorrowed', 1, bookId);
    await data.addRowToReg(userId, bookId);
    const book = await data.getByFrom('id', bookId, 'books');

    return book;
  }

  return 'This person cant borrow that book';
};
/**
 * @param {any} data dataBase to take data from
 * @returns {Function} change the book status to unborowed
*/
const returnABook = (data) => async (userId, bookId) => {
  const registerForBook = await data.getByTwoParams('user_id',
    'book_id',
    userId,
    bookId,
    'register');

  if (registerForBook[0]) {
    await data.updateRow('books', 'isBorrowed', 0, bookId);
    await data.deleteRow('register', registerForBook[0].id);
    const book = await data.getByFrom('id', bookId, 'books');

    return book;
  }

  return 'This book cant be returned';
};
/**
 * @param {any} data dataBase to take data from
 * @returns {Function} rate a book
*/
const rateABook = (data) => async (userId, bookId, rating) => {
  const log = await data.getByTwoParams('user_id',
    'book_id',
    userId,
    bookId,
    'log');
  const ratings = await data.getByTwoParams('user_id',
    'book_id',
    userId,
    bookId,
    'rates');
  const book = await data.getByFrom('id', bookId, 'books');
  if (!book[0] || book[0].unlisted) {
    return 'Invalid book id!';
  }

  if (log.length === 0) {
    return 'You need to read the book first!';
  }

  if (ratings.length === 0) {
    await data.addRowToRates(userId, bookId, rating);
  } else if (ratings.length > 0) {
    await data.updateRow('rates', 'rating', rating, ratings[0].id);
  }

  return await data.getByFrom('id', bookId, 'books');
};
/**
 * @param {any} data dataBase to take data from
 * @returns {Function} get the books raiting
*/
const getBooksRaiting = (data) => async (bookId) => {
  const raitings = [...await data.avgBookRating(bookId)];
  const book = await data.getByFrom('id', bookId, 'books');

  if (!book[0] || book[0].unlisted) {
    return 'Invalid book id!';
  }
  if (!raitings[0].avgRaiting) {
    return 'This book dosent have any rating!';
  }

  return raitings;
};
const getRateStatus = (data) => async(userId, bookId) => {
  const log = await data.getByTwoParams('user_id',
    'book_id',
    userId,
    bookId,
    'log');

  if (!log.length) {
    return {
      canRate: 0,
    };
  }
  else { 
    const ratings = await data.getByTwoParams('user_id',
      'book_id',
      userId,
      bookId,
      'rates');
    if (ratings[0]) { 
      const { rating } = ratings[0];
      return { canRate: 1, rating };
    }
    return { canRate: 1, rating: 0 };
  }
  
};
const removeRateFromBook = (data) => async (userId, bookId) => {
  const log = await data.getByTwoParams('user_id',
    'book_id',
    userId,
    bookId,
    'log');
  
  const book = await data.getByFrom('id', bookId, 'books');

  if (!book[0] || book[0].unlisted) {
    return 'Invalid book id!';
  }

  if (log.length === 0) {
    return 'You need to read the book first!';
  }

  await data.deleteRate(userId, bookId);
   
  return await data.getByFrom('id', bookId, 'books');
};

const usersBorrowedBooks = (data) => async (userId) => {
  
  const borrowed = await data.borrowedBooksByUser(userId);
  return borrowed;

 };
export default {
  getAllBooks,
  getBookById,
  borowABook,
  returnABook,
  rateABook,
  getBooksRaiting,
  getRateStatus,
  removeRateFromBook,
  usersBorrowedBooks,
};
