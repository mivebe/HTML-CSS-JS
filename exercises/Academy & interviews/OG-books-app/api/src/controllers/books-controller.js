import express from 'express';
import booksService from '../services/books-service.js';
import libraryData from '../data/library-data.js';
import { bannedMiddleware } from '../auth/auth-middleware.js';
import { bookRatingSchema, createValidator } from '../validations/index.js';
const booksController = express.Router();

booksController
  .get('/borrowed', bannedMiddleware(libraryData), async (req, res) => {
    const userId = req.user.id;
    const borrowedBooks = await booksService.usersBorrowedBooks(libraryData)(+userId);

    res.status(200).send(borrowedBooks);
  })
  .get('/:id', async (req, res) => {

    const id = req.params.id;

    console.log(id);

    if (Number.isNaN(+id)) {
      return res.status(400).send({
        msg: 'Parameter id must be of type number!',
      });
    }

    const book = await booksService.getBookById(libraryData)(+id);

    if (!book[0] || book[0].unlisted) {
      return res.status(404).send({
        msg: 'The book is not found!',
      });
    }

    res.status(200).send(book);
  })
  .get('/', async (req, res) => {
    const { search } = req.query;
    const books = await booksService.getAllBooks(libraryData)(search);

    res.status(200).send(books);
  })
  .get('/:id/rate', async (req, res) => {
    const bookId = req.params.id;
    const raiting = await booksService.getBooksRaiting(libraryData)(bookId);
    if (!raiting[0].avgRaiting) {
      res.status(200).send({ massage: raiting });
    } else {
      res.status(200).send(raiting);
    }
  })
  .post('/:id', bannedMiddleware(libraryData), async (req, res) => {
    const bookId = req.params.id;
    const userId = req.user.id;
    const temp = await booksService.borowABook(libraryData)(userId, bookId);

    res.status(202).send({ message: temp });
  })
  .post('/:id/rate', bannedMiddleware(libraryData), createValidator(bookRatingSchema), async (req, res) => {
    const bookId = req.params.id;
    const userId = req.user.id;
    const { rating } = req.body;
    const book = await booksService.rateABook(libraryData)(userId, bookId, +rating);

    res.status(200).send({ message: book });
  })
  .delete('/:id/rate', bannedMiddleware(libraryData), async (req, res) => {
    const bookId = req.params.id;
    const userId = req.user.id;

    const book = await booksService.removeRateFromBook(libraryData)(userId, +bookId);

    res.status(200).send({ message: book });
  })
  .delete('/:id', bannedMiddleware(libraryData), async (req, res) => {
    const bookId = req.params.id;
    const userId = req.user.id;
    const temp = await booksService.returnABook(libraryData)(userId, bookId);

    res.status(202).send({ message: temp });
  })
  .get('/:id/rate/status', bannedMiddleware(libraryData), async (req, res) => {
    const bookId = req.params.id;
    const userId = req.user.id;
    const rateStatus = await booksService.getRateStatus(libraryData)(userId, bookId);

    res.status(200).send(rateStatus);

  });

export default booksController;