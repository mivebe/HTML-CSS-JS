import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import passport from 'passport';
import { jwtStrategy, refreshJwtStrategy } from './auth/strategy.js';
import {
  authMiddleware,
  errorMiddleware,
}
from './auth/auth-middleware.js';
import categoriesController from './controllers/categories-controller.js';
import usersController from './controllers/users-controllers.js';
import quizzesController from './controllers/quizzes-controllers.js';

const PORT = 5000;
const app = express();
passport.use('jwt', jwtStrategy);
passport.use('refresh', refreshJwtStrategy);

app.use(bodyParser.json());
app.use(cors());
app.use(helmet());
app.use(passport.initialize());

app.use('/users', usersController);
app.use(
  '/categories',
  authMiddleware,
  categoriesController,
  errorMiddleware,
);
app.use('/quizzes', authMiddleware, quizzesController, errorMiddleware);

app.use((err, req, res, next) => {
  res.status(500).send({
    msg:
      'An unexpected error occurred, our developers are working hard to resolve it.',
  });
});

app.all('*', (req, res) =>
  res.status(404).send({ msg: 'Resource not found!' }),
);

app.listen(PORT, () => console.log(`App is listening on port ${PORT}`));
