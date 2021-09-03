import express from 'express';
import createToken from '../auth/create-token.js';
import usersService from '../services/users-service.js';
import libraryData from '../data/library-data.js';
import serviceErrors from '../services/user-error.js';
import { createValidator, createUserSchema, loginUserSchema } from '../validations/index.js';

const usersController = express.Router();

usersController
    .post('/', createValidator(createUserSchema), async (req, res) => {
        const { username, password, displayName } = req.body;
        const { error, user } = await usersService.createUser(libraryData)(
            username,
            password,
            displayName,
        );
        if (error === serviceErrors.DUPLICATE_USERNAME_RECORD) {
            res.status(409).send({ message: 'Username already exists' });
        } else if (error === serviceErrors.DUPLICATE_DISPLAY_NAME_RECORD) {
            res.status(409).send({ message: 'Display name already taken' });
        } else {
            res.status(201).send(user);
        }
    })
    .post('/signin',createValidator(loginUserSchema), async (req, res) => {
        const { username, password } = req.body;
        const { error, user } = await usersService.signInUser(libraryData)(
            username,
            password,
        );

        if (error === serviceErrors.INVALID_SIGNIN) {
            res.status(400).send({
                message: 'Invalid username/password',
            });
        } else {
            const payload = {
                sub: user.id,
                username: user.username,
                role: user.role,
                isBanned: user.isBanned,
                reason: user.reason,
            };
            const token = createToken(payload);
            await usersService.rememberToken(libraryData)(token);
            res.status(200).send({
                token: token,
            });
        }
    })
    .delete('/logout', async (req, res) => {
        const bearer = req.headers.authorization;
        const token = bearer.split(' ')[1];

        await usersService.signOutUser(libraryData)(token);

        res.status(200).send('Successfully logged out');
    });

export default usersController;
