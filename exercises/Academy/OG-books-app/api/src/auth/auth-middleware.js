import passport from 'passport';

const authMiddleware = passport.authenticate('jwt', { session: false });
/**
 * @param {string} roleName The corect roll to check
 * @returns {Function} callback that check the role
*/
const roleMiddleware = roleName => {
    return (req, res, next) => {
        if (req.user && req.user.role === roleName) {
            next();
        } else {

            next('Resource is forbidden.');

        }
    };
};
/**
 * @param {any} libraryData The dataBase
 * @returns {Function} callback that check if the user is loged
*/
const loggedMiddleware = (libraryData) => {
    return async (req, res, next) => {
        const bearer = req.headers.authorization;
        const token = bearer.split(' ')[1];

        const testing = await libraryData.getOneFrom('token', `${token}`, 'tokens');

        if (testing) {

            next();
        } else {

            next('You are not logged in');
        }
    };
};
/**
 * @param {any} libraryData The dataBase
 * @returns {Function} callback that check if user is banned
*/
const bannedMiddleware = (libraryData) => {
    return async (req, res, next) => {
        const userId = req.user.id;
        const user = await libraryData.getOneFrom('id', userId, 'users');

        if (!user.isBanned) {

            next();
        } else {
            const banReason = await libraryData.getWithBanReason(userId);
            next('User is banned. Reason: ' + banReason.ban_reason);
        }
    };
};
/**
 * Middleware taht catch errors and send corect status code
*/
const loggedErrorMiddleware = (err, req, res, next) => {
    res.status(400).send({ message: err });
};
export {
    authMiddleware,
    roleMiddleware,
    loggedMiddleware,
    loggedErrorMiddleware,
    bannedMiddleware,
};
