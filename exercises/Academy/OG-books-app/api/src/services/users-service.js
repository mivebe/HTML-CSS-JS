import bcrypt from 'bcrypt';
import { DEFAULT_USER_ROLE } from '../config.js';
import userErrors from './user-error.js';
/**
 * @param {any} data dataBase to take data from
 * @returns {Function} creating the user by given usarname pasword and displayName
*/
const createUser = (libraryData) => {
    return async (username, password, displayName) => {
        const existingUser = await libraryData.getOneFrom('username', username, 'users');
        const existingUser2 = await libraryData.getOneFrom('display_name', displayName, 'users');

        if (existingUser) {

            return {
                error: userErrors.DUPLICATE_USERNAME_RECORD,
                user: null,
            };
        }
        if (existingUser2) {

            return {
                error: userErrors.DUPLICATE_DISPLAY_NAME_RECORD,
                user: null,
            };
        }
        const passwordHash = await bcrypt.hash(password, 10);
        const role = await libraryData.getOneFrom('type', DEFAULT_USER_ROLE, 'user_types');
        const user = await libraryData.createUserQuery(username, passwordHash, displayName, role.id);

        return { error: null, user: user };

    };

};
/**
 * @param {any} data dataBase to take data from
 * @returns {Function} sign in the registered user
*/
const signInUser = (libraryData) => {
    return async (username, password) => {
        const user = await libraryData.retrieveUserFullInfo(username);
   
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
/**
 * @param {any} data dataBase to take data from
 * @returns {Function} saves the given token
*/
const rememberToken = (libraryData) => {
    return async (token) => {
        const user = await libraryData.addRowToTokens(token);
        return user;
    };
};
/**
 * @param {any} data dataBase to take data from
 * @returns {Function} delete the saved token and logout the user
*/
const signOutUser = (libraryData) => {
    return async (token) => {
        await libraryData.deleteToken(token);
    };
};
export default {
    createUser,
    signInUser,
    rememberToken,
    signOutUser,
};