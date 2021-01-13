import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import passport from 'passport';
import jwtStrategy from './auth/strategy.js';
import booksController from './controllers/books-controller.js';
import usersController from './controllers/users-controller.js';
import adminController from './controllers/admin-controller.js';
import reviewsController from './controllers/reviews-controller.js';
import { authMiddleware, roleMiddleware, bannedMiddleware } from './auth/auth-middleware.js';
import libraryData from './data/library-data.js';
import {
  loggedMiddleware,
  loggedErrorMiddleware,
} from './auth/auth-middleware.js';

const PORT = 5000;
const app = express();
passport.use(jwtStrategy);
app.use(bodyParser.json());
app.use(cors());
app.use(helmet());
app.use(passport.initialize());
app.use(
  '/books',
  authMiddleware,
  loggedMiddleware(libraryData),
  booksController,
  bannedMiddleware(libraryData),
  reviewsController,
  loggedErrorMiddleware,
);
app.use(
  '/admin',
  authMiddleware,
  roleMiddleware('admin'),
  loggedMiddleware(libraryData),
  bannedMiddleware(libraryData),
  adminController,
  loggedErrorMiddleware,
);
app.use('/auth', usersController);
app.use((err, req, res, next) => {
  // logger.log(err)

  res.status(500).send({
    message: 'An unexpected error occurred, our developers are working hard to resolve it.',
  });
});

app.all('*', (req, res) =>
  res.status(404).send({ message: 'Resource not found!' }),
);


app.listen(PORT, () => console.log(`App is listening on port ${PORT}`));
