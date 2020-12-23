import express from 'express';
import { authMiddleware, authMiddlewareRefresh } from '../auth/auth-middleware.js';
import { createToken,createRefreshToken } from '../auth/create-token.js';
import quizData from '../data/quiz-data.js';
import usersService from '../services/users-services.js';
import { createValidator, createUserSchema, loginUserSchema, queryValidator, limitOffsetSchema } from '../validations/index.js';
import { roleMiddleware } from '../auth/auth-middleware.js';

const returnBothTokens = async (error, user, res) => {

    if (error) {
        return res.status(400).send({ msg: error });
    }
    else {
        const refreshPayload = {
            sub: user.id,
            username: user.username,
        };

        const payload = {
            sub: user.id,
            username: user.username,
            role: user.isTeacher ? 'teacher' : 'student',
            firstName: user.first_name,
            lastName: user.last_name,
        };
        const refreshToken = createRefreshToken(refreshPayload);
        const token = createToken(payload);
        await usersService.saveRefreshToken(quizData)(refreshToken, user.id);
        return res.status(200).send({ refreshToken, token });
    }
};
const usersController = express.Router();

usersController
    .post('/', createValidator(createUserSchema), async (req, res) => {
        const { username, password, firstName, lastName } = req.body;
        const { error, user } = await usersService.createUser(quizData)(
            username,
            password,
            firstName,
            lastName,
        );

        returnBothTokens(error, user, res);
    })
    .post('/login', createValidator(loginUserSchema), async (req, res) => {
        const { username, password } = req.body;
        const { error, user } = await usersService.signInUser(quizData)(
            username,
            password,
        );

        returnBothTokens(error, user, res);
    })
    .post('/refresh', authMiddlewareRefresh, async (req, res) => {

        const username = req.user.username;

        const [user] = await usersService.refreshToken(quizData)(username);

        const payload = {
            sub: user.id,
            username: user.username,
            role: user.isTeacher ? 'teacher' : 'student',
            firstName: user.first_name,
            lastName: user.last_name,
        };

        const token = createToken(payload);
        return res.status(200).send({ token });
        
    })
    .get('/leaderboard', authMiddleware, queryValidator(limitOffsetSchema), async (req, res) => {
        const { search, offset, limit } = req.query;
        const leaderboard = await usersService.getLeaderboard(quizData)(search, offset, limit);

        res.status(200).send(leaderboard);
    })
    .get('/history', authMiddleware, queryValidator(limitOffsetSchema), async (req, res) => {
        const userId = req.user.id;
        const { offset, limit, search } = req.query;
        const history = await usersService.getUserHistory(quizData)(userId, search, offset, limit);

        return res.status(200).send(history);
    })
    .get('/quizzes', authMiddleware, roleMiddleware('teacher'), async (req, res) => {
        const userId = req.user.id;
        const teacherQuizzes = await usersService.getUserQuizzes(quizData)(userId);

        return res.status(200).send(teacherQuizzes);
    });

export default usersController;