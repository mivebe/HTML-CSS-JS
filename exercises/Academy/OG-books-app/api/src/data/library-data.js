import pool from './data.js';
/**
 * @param {string} column where to check
 * @param {string} value what to compare column with
 * @param {string} table in which table to search
 * @returns {Array} with corect data
*/
const getByFrom = async (column, value, table) => {

  const sql = `
        SELECT *
        FROM ${table}
        WHERE ${column} = ?  
      `;

  const result = await pool.query(sql, [value]);

  return [...result];
};
const getReviewsWithUsername = async ( value) => {

  const sql = `
        SELECT r.* , u.display_name
        FROM reviews r
        JOIN users u ON r.user_id = u.id
        WHERE book_id = ?  
      `;

  const result = await pool.query(sql, [value]);

  return [...result];
};
const getBookFullInfo = async ( value) => {

  const sql = `
        SELECT b.* , g.genre as genre
        FROM books b
        JOIN genres g ON b.genres_id = g.id
        WHERE b.id = ? 
      `;

  const result = await pool.query(sql, [value]);

  return [...result];
};
/**
 * @param {string} column where to check
 * @param {string} value what to compare column with
 * @param {string} table in which table to search
 * @returns {any}  just the corect element
*/
const getOneFrom = async (column, value, table) => {

  const sql = `
        SELECT *
        FROM ${table}
        WHERE ${column} = ?
    `;

  const result = await pool.query(sql, [value]);

  return result[0];
};
/**
 * @param {string} table in which table to search
 * @param {string} column where to check
 * @param {string} filter what to compare column with
 * @returns {Array} with corect data
*/
const retrieveAllBooks = async (table, column, filter = '') => {
  const sql = `
        SELECT b.*, g.genre as genre
        FROM ${table} b
        Join genres g ON b.genres_id = g.id
        WHERE b.unlisted = 0
        AND b.${column} LIKE '%${filter}%'
    `;

  return await pool.query(sql);
};
/**
 * @param {string} table in which table to search
 * @returns {Array} with corect data
*/
const retrieveAll = async (table) => {
  const sql = `
        SELECT *
        FROM ${table}
    `;

  return await pool.query(sql);
};
/**
 * @param {string} column where to check
 * @param {string} filter what to filter with
 * @param {string} table in which table to search
 * @returns {Array} with corect data
*/
const searchByFrom = async (column, filter, table) => {
  const sql = `
        SELECT * 
        FROM ${table} WHERE ${column} LIKE '%${filter}%'
    `;

  return await pool.query(sql);
};
/**
 * @param {string} username
 * @param {string} password
 * @param {string} displayName
 * @param {string} role 
 * @returns {object} created user
*/
const createUserQuery = async (username, password, displayName, role) => {
  const sql = `
        INSERT INTO users(username, password,display_name,user_types_id)
        VALUES (?, ?, ?, ?)
    `;

  const result = await pool.query(sql, [username, password, displayName, role]);

  return {
    id: result.insertId,
    username: username,
    displayName: displayName,
  };
};
/**
 * @param {string} name
 * @returns {object} created book
*/
const createBookQuery = async ( name,description,imageURL,author,genre, isBorrowed = 0, unlisted = 1) => {
  const sql = `
        INSERT INTO books(name,description,image_URL,author,genres_id, isBorrowed, unlisted)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

  const result = await pool.query(sql, [name,description,imageURL,author,genre, isBorrowed , unlisted ]);

  return {
    bookId: result.insertId,
    name: name,
    description: description,
    imageURL: imageURL,
    author:author,
    isBrrowed: isBorrowed,
    unlisted: unlisted,
  };
};
/**
 * @param {string} table in which table to search
 * @param {string} row where to update
 * @param {string} value new value
 * @param {number} id id of corect item
 * @returns {Array} with updated data
*/
const updateRow = async (table, row, value, id) => {
  const sql = `
        UPDATE ${table}
        SET ${row} = ${value}
        WHERE id = ${id}
  `;
  return await pool.query(sql);
};
/**
 * @param {string} table in which table to search
 * @param {string} row where to update
 * @param {string} value new value
 * @param {number} id id of corect item
 * @returns {Array} with updated data
*/
const updateRowForText = async (table, row, value, id) => {
  const sql = `
        UPDATE ${table}
        SET ${row} = '${value}'
        WHERE id = ${id}
  `;
  return await pool.query(sql);
};
/**
 * @param {number} userId
 * @param {number} bookId
 * Adds row to register
*/
const addRowToReg = async (userId, bookId) => {
  const sql = `
        INSERT INTO register (user_id,book_id) values (${userId},${bookId})
  `;
  return await pool.query(sql);
};
/**
 * @param {string} token
 * Adds row to tokens
*/
const addRowToTokens = async (token) => {
  const sql = `
        INSERT INTO tokens (token) value ('${token}')
  `;
  return await pool.query(sql);
};
/**
 * @param {string} table the table to search in
 * @param {number} id the items id
 * Delete the given item
*/
const deleteRow = async (table, id, column = 'id') => {
  const sql = `
        DELETE 
        FROM ${table}
        WHERE ${column} = ${id}
  `;

  return await pool.query(sql);
};
/**
 * @param {string} token
 * Delete row from tokens
*/
const deleteToken = async (token) => {
  const sql = `
        DELETE FROM tokens
        WHERE token = '${token}'
  `;

  return await pool.query(sql);
};
/**
 * @param {number} userId
 * @param {number} bookId
 * @param {string} text
 * Ads row to reviews with given data
*/
const addRowToReviews = async (userId, bookId, text = '') => {
  const sql = `
        INSERT INTO reviews (user_id,book_id,text) values (${userId},${bookId},'${text}')
  `;

  return await pool.query(sql);
};
/**
 * @param {string} column1 where to search
 * @param {string} column2 where to search
 * @param {string} param1 first value to search by
 * @param {string} param2 second value to search by
 * @param {string} table the table to search in
*/
const getByTwoParams = async (column1, column2, param1, param2, table) => {
  const sql = `
  SELECT *
  FROM ${table}
  WHERE ${column1} = ?
  AND ${column2} = ?
`;

  const result = await pool.query(sql, [param1, param2]);

  return [...result];
};
/**
 * @param {string} username
 * Returns data for given username
*/
const getWithRole = async (username) => {
  const sql = `
        SELECT u.id, u.username, u.password, u.display_name, t.type as role
        FROM users u
        JOIN user_types t ON u.user_types_id = t.id
        WHERE u.username = ?
    `;

  const result = await pool.query(sql, [username]);

  return result[0];
};
/**
 * @param {number} userId
 * @param {number} bookId
 * Adds row to log with given data
*/
const addRowToLog = async (userId, bookId) => {
  const sql = `
        INSERT INTO log (user_id,book_id) values (${userId},${bookId})
  `;

  return await pool.query(sql);
};
/**
 * @param {number} userId
 * @param {number} bookId
 * @param {number} rating
 * Adds row to rates with given data
*/
const addRowToRates = async (userId, bookId, rating) => {
  const sql = `
  INSERT INTO rates (user_id,book_id,rating) values (${userId},${bookId},${rating})
`;

  return await pool.query(sql);
};
/**
 * @param {number} bookId
 * Return average raiting of the given book
*/
const avgBookRating = async (bookId) => {
  const sql = `
  SELECT AVG(rating) AS avgRaiting
  FROM library.rates
  WHERE book_id = ${bookId}`;

  return await pool.query(sql);
};
/**
 * @param {string} userId
 * Returns the persons data with his reason for ban
*/
const getWithBanReason = async (userId) => {
  const sql = `
        SELECT u.*, b.reason as ban_reason
        FROM users u
        JOIN ban_reasons b ON u.ban_reasons_id = b.id
        WHERE u.id = ?
    `;

  const result = await pool.query(sql, [userId]);

  return result[0];
};
const deleteRate = async(userId, bookId) => {
  const sql = `
        DELETE 
        FROM rates
        WHERE user_id = ${userId}
        AND book_id =${bookId}
  `;

  return await pool.query(sql);
};

const borrowedBooksByUser = async (userId) => {
  const sql = `
        SELECT r.user_id ,b.*
        FROM register r
        JOIN books b ON r.book_id = b.id
        WHERE r.user_id = ?
`;
  const result = await pool.query(sql, [userId]);
  return result;
};
const adminRetrieveAllBooks = async (table, column, filter = '') => {
  const sql = `
        SELECT b.*, g.genre as genre
        FROM ${table} b
        Join genres g ON b.genres_id = g.id
        WHERE b.${column} LIKE '%${filter}%'
    `;

  return await pool.query(sql);
};
const retrieveAllUsers = async () => {
  const sql = `
        SELECT u.id, u.username, u.display_name,u.isBanned, t.type as role,br.reason
        FROM users u
        JOIN user_types t ON u.user_types_id = t.id
        LEFT JOIN ban_reasons br ON u.ban_reasons_id=br.id;
    `;

  return await pool.query(sql);
};
const retrieveUserFullInfo = async (username) => {

  const sql = `
        SELECT u.*, t.type as role,br.reason
        FROM users u
        JOIN user_types t ON u.user_types_id = t.id
        LEFT JOIN ban_reasons br ON u.ban_reasons_id=br.id
        WHERE u.username = ?
    `;
  const userInfo = await pool.query(sql, [username]);

  return userInfo[0];
};
export default {
  retrieveAll,
  getByFrom,
  updateRow,
  addRowToReg,
  searchByFrom,
  retrieveAllBooks,
  deleteRow,
  createUserQuery,
  addRowToReviews,
  getByTwoParams,
  updateRowForText,
  getOneFrom,
  getWithRole,
  addRowToTokens,
  deleteToken,
  createBookQuery,
  addRowToLog,
  addRowToRates,
  avgBookRating,
  getWithBanReason,
  getBookFullInfo,
  getReviewsWithUsername,
  deleteRate,
  borrowedBooksByUser,
  adminRetrieveAllBooks,
  retrieveAllUsers,
  retrieveUserFullInfo,
};