import bcrypt from 'bcrypt';
import { userErrors } from '../errors/errors.js';

/**
 * @param {any} data dataBase to take data from
 * @returns {Function} creating the user by given usarname pasword and displayName
*/
const createUser = (data) => {
    return async (username, password, firstName, lastName) => {
        const [existingUser] = await data.retrieveUserFullInfo(username);

        if (existingUser) {
            return {
                error: userErrors.DUPLICATE_USERNAME,
                user: null,
            };
        }

        const passwordHash = await bcrypt.hash(password, 10);
        const [user] = await data.createUser(username, passwordHash, firstName, lastName);

        return { error: null, user: user };

    };
};
/**
 * @param {any} data dataBase to take data from
 * @returns {Function} sign in the registered user
*/
const signInUser = (data) => {
    return async (username, password) => {
        const [user] = await data.retrieveUserFullInfo(username);

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return {
                error: userErrors.INVALID_SIGNIN,
                user: null,
            };
        }

        return {
            error: null,
            user: user,
        };
    };
};
const getLeaderboard = (data) => async (search, offset, limit) => {
    const leaderboard = await data.retrieveLeaderboard(search, offset, limit);
    const [{ count }] = await data.retrieveLeaderboardCount(search);

    return { leaderboard, count };
};
const getUserHistory = (data) => async (userId, search, offset, limit) => {
    const history = await data.retrieveUserHistory(userId, search, offset, limit);
    const [{ count }] = await data.retrieveUserHistoryCount(userId, search);

    return { history, count };
};

const getUserQuizzes = (data) => async (userId) => {
    const userQuizzes = await data.retrieveUserQuizzes(userId);

    return userQuizzes;
};
const saveRefreshToken = (data) => async (refreshToken, userId) => {
    await data.insertRefreshToken(refreshToken, userId);
};
const refreshToken = (data) => async (username) => {
   return await data.retrieveUserFullInfo(username);
};
export default {
    createUser,
    signInUser,
    getUserHistory,
    getLeaderboard,
    getUserQuizzes,
    saveRefreshToken,
    refreshToken,
};