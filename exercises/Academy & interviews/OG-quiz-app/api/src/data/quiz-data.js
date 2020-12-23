import pool from './pool.js';

const retrieveAllCategories = async () => {
  const sql = `
    SELECT *
    FROM categories
    `;
  const result = await pool.query(sql);

  return [...result];
};

const retrieveQuizzesBySpecCategory = async (
  categoryId,
  userId,
  offset = 0,
  limit = 10,
) => {
  const sql = `
        SELECT q.*,sq.score,sq.date_of_solving, u.first_name,u.last_name, u.username
        FROM quizzes q
        LEFT JOIN solved_quizzes sq 
        ON q.id = sq.quizzes_id AND sq.users_id = ?
        JOIN users u 
        ON u.id = q.users_id
        WHERE q.categories_id = ? 
        AND q.listed = 1
        ORDER BY date_of_solving 
        LIMIT ? OFFSET ?
    `;
  const result = await pool.query(sql, [userId, categoryId, +limit, +offset]);

  return [...result];
};

const retrieveCategoryByName = async (name) => {
  const sql = `
        SELECT *
        FROM categories
        WHERE category = ?
    `;
  const result = await pool.query(sql, [name]);

  return [...result];
};

const retrieveCategoryById = async (id) => {
  const sql = `
        SELECT *
        FROM categories
        WHERE id = ?
    `;
  const result = await pool.query(sql, [+id]);

  return [...result];
};
const createCategory = async (name) => {
  const sql = `
    INSERT INTO categories(category)
    VALUE (?)
 `;
  await pool.query(sql, [name]);

  return retrieveCategoryByName(name);
};
const createUser = async (username, password, firstName, lastName) => {
  const sql = `
    INSERT INTO users(username, password, first_name, last_name)
    VALUE (?,?,?,?)
 `;
  await pool.query(sql, [username, password, firstName, lastName]);

  return await retrieveUserFullInfo(username);
};

const retrieveUserFullInfo = async (username) => {
  const sql = `
        SELECT *
        FROM users
        WHERE username = ?
    `;
  const userInfo = await pool.query(sql, [username]);

  return [...userInfo];
};

const retrieveAllQuizzes = async () => {
  const sql = `
    SELECT q.id, q.name, q.time_limit,c.category,c.id category_id,u.username as created_by,u.id user_id
    FROM quizzes as q 
    JOIN users as u on q.users_id = u.id 
    JOIN categories as c on c.id = q.categories_id
    WHERE q.listed = 1
  `;
  const quizzes = await pool.query(sql);

  return [...quizzes];
};

const retrieveQuizById = async (id) => {
  const sql = `
    SELECT q.id, q.name, q.time_limit, c.category,
     u.username AS created_by,
     u.first_name AS author_first_name, 
     u.last_name AS author_last_name  
    FROM quizzes AS q 
    JOIN users AS u ON q.users_id = u.id 
    JOIN categories AS c ON c.id = q.categories_id 
    WHERE q.id = ?
    AND q.listed = 1
  `;
  const quiz = await pool.query(sql, id);

  return [...quiz];
};

const retrieveAllQuiestionsByQuizId = async (id) => {
  const sql = `
    SELECT * FROM questions WHERE quizzes_id = ?
  `;
  const quiestions = await pool.query(sql, id);

  return [...quiestions];
};

const retrieveAllAnswersByQuestionId = async (id) => {
  const sql = `
    SELECT * FROM answers WHERE questions_id = ?
  `;
  const answers = await pool.query(sql, id);

  return [...answers];
};

const retrieveAllUsersSolvedSpecQuiz = async (id) => {
  const sql = `
    SELECT u.first_name, u.last_name, u.username, u.id as user_id, q.name as quiz_name, q.id as quiz_id,sq.score,sq.date_of_solving 
    FROM solved_quizzes as sq 
    JOIN users as u on u.id = sq.users_id 
    JOIN quizzes as q on sq.quizzes_id = q.id 
    WHERE sq.quizzes_id = ?
  `;
  const students = await pool.query(sql, id);

  return [...students];
};

const retrieveLeaderboard = async (search = '', offset = 0, limit = 10) => {
  const sql = `
    SELECT u.id user_id, u.username,
    u.first_name, u.last_name,
    sum(score) points, count(users_id) quizzes_count 
    FROM solved_quizzes sq
    JOIN users u ON sq.users_id = u.id
    AND (u.username LIKE '%${search}%'
    OR u.first_name LIKE '%${search}%'
    OR u.last_name LIKE '%${search}%')
    group by sq.users_id
    Order by points DESC
    LIMIT ? OFFSET ?
  `;
  const leaderBoard = await pool.query(sql, [+limit, +offset]);

  return [...leaderBoard];
};
const retrieveQuizByName = async (name) => {
  const sql = `
        SELECT *
        FROM quizzes
        WHERE name = ?
        AND listed = 1
    `;
  const result = await pool.query(sql, [name]);

  return [...result];
};

const retrieveRawQuizData = async (id) => {
  const sql = `
  SELECT q.*,c.category
  FROM quizzes as q JOIN categories as c
  ON q.categories_id = c.id
  WHERE q.id = ${id}
  `;
  const result = await pool.query(sql);

  return [...result];
};

const insertQuiz = async (name, timeLimit, categoriesId, userId) => {
  const sql = `
    INSERT INTO quizzes (name,time_limit,categories_id,users_id)
    values ('${name}',${timeLimit},${categoriesId},${userId})
  `;
  const insertedQuiz = await pool.query(sql);
  const createdQuiz = await retrieveRawQuizData(insertedQuiz.insertId);

  return [...createdQuiz];
};

const insertQuestionWithAnswers = async (
  question,
  isMultiple,
  points,
  quizzesId,
  correctAnswers,
  answers,
) => {
  const sql = `
    INSERT INTO questions (question,isMultiple,points,quizzes_id,correct_answers)
    values ('${question}',${isMultiple},${points},${quizzesId},${correctAnswers});
`;
  const insertedQestion = await pool.query(sql);
  const convertedAnswers = answers.map(
    (el) => (el = el + `,${insertedQestion.insertId})`),
  );
  const temp = convertedAnswers.toString();
  const sql2 = `
    INSERT INTO answers (answer,correct,questions_id)
    VALUES ${temp}
  `;
  await pool.query(sql2);
  const sql3 = `
    SELECT q.* ,
    JSON_ARRAYAGG(JSON_OBJECT('answer_id',a.id,'answer',a.answer,'correct',a.correct)) answers
    FROM questions q
    RIGHT JOIN answers a ON (a.questions_id = q.id)
    WHERE q.id = ${insertedQestion.insertId}
  `;
  const createdQestion = await pool.query(sql3);

  return [...createdQestion];
};

const listQuiz = async (id) => {
  const sql = `
  UPDATE Quizzes
  SET listed = 1
  WHERE id = ?
  `;
  await pool.query(sql, id);

  return;
};

const deleteUnlistedByName = async (name) => {
  const sql = `
  DELETE FROM quizzes 
  WHERE listed = 0
  AND name = ?
  `;
  await pool.query(sql, name);

  return;
};
const retrieveUserHistory = async (
  userId,
  search = '',
  offset = 0,
  limit = 10,
) => {
  const sql = `
    SELECT  q.id quiz_id,q.name quiz_name,
    c.category ,sq.score, sq.date_of_solving
    FROM solved_quizzes sq
    JOIN quizzes q ON q.id = sq.quizzes_id 
    JOIN categories c ON q.categories_id = c.id
    JOIN users u ON u.id = q.users_id
    WHERE sq.users_id = ?
    AND q.name LIKE '%${search}%'
    ORDER BY sq.date_of_solving DESC
    LIMIT ? OFFSET ?
  `;
  const userHistory = await pool.query(sql, [+userId, +limit, +offset]);

  return [...userHistory];
};
const retrieveQuestionsWithCorrectAnswers = async (quizId) => {
  const sql = `
    SELECT q.* ,
    JSON_ARRAYAGG(JSON_OBJECT('answer_id',a.id,'answer',a.answer,'correct',a.correct)) answers
    FROM questions q
    RIGHT JOIN answers a ON (a.questions_id = q.id and a.correct = 1)
    WHERE q.quizzes_id = ?
    GROUP BY a.questions_id;
  `;
  const questionsWithAnswers = await pool.query(sql, [+quizId]);

  return [...questionsWithAnswers];
};

const solveQuiz = async (quizId, userId, score) => {
  const sql = `
    INSERT INTO solved_quizzes (quizzes_id, users_id, score)
    values (?, ?, ?)
  `;
  await pool.query(sql, [+quizId, +userId, +score]);

  return;
};

const quizPermitForUser = async (userId, quizId) => {
  const sql = `
    SELECT q.id, q.name ,sq.*
    FROM quizzes q
    join solved_quizzes sq on (sq.quizzes_id = q.id and sq.users_id = ?)
    where q.id = ? and q.listed = 1
;
  `;
  const permit = await pool.query(sql, [+userId, +quizId]);

  return [...permit];
};
const retrieveUserHistoryCount = async (userId, search = '') => {
  const sql = `
    SELECT COUNT(*) as count 
    FROM solved_quizzes sq
    JOIN quizzes q
    ON sq.quizzes_id = q.id
    WHERE sq.users_id = ?
    AND q.name LIKE '%${search}%'
  `;
  const historyCount = await pool.query(sql, [+userId]);

  return [...historyCount];
};

const retrieveLeaderboardCount = async (search = '') => {
  const sql = `
    SELECT COUNT(*) as count 
    FROM(
    SELECT COUNT(*)
    FROM solved_quizzes sq
    JOIN users u ON sq.users_id = u.id
    AND (u.username LIKE '%${search}%'
        OR u.first_name LIKE '%${search}%'
        OR u.last_name LIKE '%${search}%')
    GROUP BY sq.users_id) leaderboard;
  `;
  const leaderboardCount = await pool.query(sql);

  return [...leaderboardCount];
};

const retrieveUserQuizzes = async (userId) => {
  const sql = `
    SELECT q.*, c.category
    FROM quizzes as q JOIN categories as c
    ON q.categories_id = c.id
    WHERE users_id = ${userId}
    AND listed = 1
    ORDER BY q.id DESC
  `;
  const userQuizzes = await pool.query(sql);

  return [...userQuizzes];
};

const retrieveQuizzesByCategoryCount = async (id) => {
  const sql = `
    SELECT COUNT(*) count
    FROM quizzes q
    WHERE q.listed = 1
    AND q.categories_id = ?

  `;
  const quizzesByCategoryCount = await pool.query(sql,[+id]);

  return [...quizzesByCategoryCount];
};
const insertRefreshToken = async (refreshToken, userId) => {

  const sql = `
    INSERT INTO refresh_tokens (refresh_token, users_id)
    values (?, ?)
  `;
  await pool.query(sql, [refreshToken, +userId]);

  return;

};
export default {
  retrieveAllCategories,
  retrieveQuizzesBySpecCategory,
  retrieveCategoryByName,
  createCategory,
  createUser,
  retrieveUserFullInfo,
  retrieveAllQuizzes,
  retrieveQuizById,
  retrieveAllQuiestionsByQuizId,
  retrieveAllAnswersByQuestionId,
  retrieveAllUsersSolvedSpecQuiz,
  retrieveLeaderboard,
  retrieveQuizByName,
  insertQuiz,
  listQuiz,
  deleteUnlistedByName,
  retrieveUserHistory,
  retrieveQuestionsWithCorrectAnswers,
  solveQuiz,
  quizPermitForUser,
  insertQuestionWithAnswers,
  retrieveUserHistoryCount,
  retrieveLeaderboardCount,
  retrieveUserQuizzes,
  retrieveCategoryById,
  retrieveQuizzesByCategoryCount,
  insertRefreshToken,
};
