/**
 * @param {any} libraryData dataBase to take data from
 * @returns {Function} created selected book
*/
const createBook = (libraryData) => {
    return async (name, description, imageURL, author, genre, isBorrowed = 0, unlisted = 1) => {
        const genreId = await libraryData.getByFrom('genre', genre, 'genres');
       
        const createBook = await libraryData.createBookQuery(name, description, imageURL, author, genreId[0].id, +isBorrowed, +unlisted);
        return {...createBook,genre:genre};
    };
};
/**
 * @param {any} libraryData dataBase to take data from
 * @returns {Function} deleting selected book
*/
const deleteBook = (libraryData) => {
    return async (id) => {
        await libraryData.deleteRow('register', id, 'book_id');
        await libraryData.deleteRow('reviews', id, 'book_id');
        const deleted = await libraryData.deleteRow('books', id);
        if (deleted.affectedRows) { return { message: 'Book deleted' }; }
        return { message: 'Could not find book/ Invalid book id' };
    };
};
/**
 * @param {any} libraryData dataBase to take data from
 * @returns {Function} unlist selected book
*/
const unlistBook = (libraryData) => {
    return async (id) => {
        await libraryData.deleteRow('register', id, 'book_id');
        await libraryData.updateRow('books', 'isBorrowed', 0, id);
        const updated = await libraryData.updateRow('books', 'unlisted', 1, id);

        if (updated.affectedRows) { return { message: 'Book unlisted' }; }
        return { message: 'Could not find book/ Invalid book id' };
    };
};
/**
 * @param {any} libraryData dataBase to take data from
 * @returns {Function} change books name
*/
const changeBookName = (libraryData) => {
    return async (id, name) => {

        const updated = await libraryData.updateRowForText('books', 'name', name, id);

        if (updated.affectedRows) { return await libraryData.getOneFrom('id', id, 'books'); }
        return { message: 'Invalid book id' };
    };
};
/**
 * @param {any} libraryData dataBase to take data from
 * @returns {Function} change the book status to listed
*/
const listBook = (libraryData) => {
    return async (id) => {

        const updated = await libraryData.updateRow('books', 'unlisted', 0, id);

        if (updated.affectedRows) { return await libraryData.getOneFrom('id', id, 'books'); }
        return { message: 'Invalid book id' };
    };
};
/**
 * @param {any} libraryData dataBase to take data from
 * @returns {Function} geting the book by given id
*/
const getBookById = (libraryData) => {
    return async (id) => await libraryData.getBookFullInfo(+id);
};
/**
 * @param {any} libraryData dataBase to take data from
 * @returns {Function} return all books
*/
const getAllBooks = (libraryData) => {
    return async (filter) => {
        return await libraryData.adminRetrieveAllBooks('books','name',filter);
    };
};
/**
 * @param {any} libraryData dataBase to take data from
 * @returns {Function} update review of the book by id
*/
const updateReview = (libraryData) => {
    return async (id, text) => {
        const updated = await libraryData.updateRowForText('reviews', 'text', text, id);

        if (updated.affectedRows) { return await libraryData.getByFrom('id', id, 'reviews'); }
        return { message: 'Invalid review id' };
    };
};
/**
 * @param {any} libraryData dataBase to take data from
 * @returns {Function} delete review of the book by id
*/
const deleteReview = (libraryData) => {
    return async (id) => {
        const updated = await libraryData.deleteRow('reviews', id, 'id');

        if (updated.affectedRows) { return await libraryData.getByFrom('id', id, 'reviews'); }
        return { message: 'Invalid review id' };
    };
};
/**
 * @param {any} libraryData dataBase to take data from
 * @returns {Function} geting all reviews by corect book id
*/
const getReviewsByBookId = (libraryData) => async (id) => {
    const book = await libraryData.getByFrom('id', +id, 'books');
   
    if (!book[0]) {
        return;
    }

    const reviewsForBook = await libraryData.getReviewsWithUsername( +id);
    return reviewsForBook;
};
/**
 * @param {any} libraryData dataBase to take data from
 * @returns {Function} changing status of the user to baned
*/
const banUser = (libraryData) => async (userId, reason) => {

    const reasonId = await libraryData.getOneFrom('reason', reason, 'ban_reasons');

    if (!reasonId) {
        return;
    }
    await libraryData.updateRow('users', 'isBanned', 1, userId);
    await libraryData.updateRow('users', 'ban_reasons_id', reasonId.id, userId);
    return await libraryData.getByFrom('id', userId, 'users');
};
/**
 * @param {any} libraryData dataBase to take data from
 * @returns {Function} changing status of the user to unbaned
*/
const unbanUser = (libraryData) => async (userId) => {

    await libraryData.updateRow('users', 'isBanned', 0, userId);
    await libraryData.updateRow('users', 'ban_reasons_id', 0, userId);
    return await libraryData.getByFrom('id', userId, 'users');
};
const getAllUsers = (libraryData) => async () => {
    return await libraryData.retrieveAllUsers('users');
};
export default {
    createBook,
    deleteBook,
    unlistBook,
    changeBookName,
    listBook,
    getBookById,
    getAllBooks,
    updateReview,
    getReviewsByBookId,
    banUser,
    unbanUser,
    deleteReview,
    getAllUsers,
};